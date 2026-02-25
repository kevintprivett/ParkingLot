import os
import json
import tensorflow as tf
import base64
from PIL import Image, ImageDraw
from io import BytesIO

# Suppress TensorFlow warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' # Suppresses all TensorFlow C++ logs (including warnings)
tf.get_logger().setLevel('ERROR') # Suppresses Python-level TensorFlow warnings and info messages

imported_model = tf.saved_model.load('./exported_model/')
model_fn = imported_model.signatures['serving_default']


def lambda_handler(event, context):
    ''' Runs inference on encoded image supplied by AWS Lambda.

    args:
        event: the json object received by AWS lambda.  The 'image_data'
            attribute should contain an utf-8 -> base64 encoded .jpg byte
            stream.
        context: an aws defined context object

    returns:
        A json response with an 'image_data' attribute containing the inferred
        image encoded through base64 and utf-8
    '''


    if not event:
        return {
            "statusCode": 400
        }
    
    body_json = json.loads(event['body'].encode('utf-8'))

    image_bytes = base64.b64decode(body_json['image_data'])

    image_stream = BytesIO(image_bytes)

    image = Image.open(image_stream)

    inferred_image = infer_on_user_image(image)

    inferred_image_buffer = BytesIO()

    inferred_image.save(inferred_image_buffer, format="JPEG")

    inferred_image_string = base64.b64encode(inferred_image_buffer.getvalue()).decode('utf-8')

    return inferred_image_string


def infer_on_user_image(image):
    '''Takes an incoming PIL Image and returns a PIL image with annotations from PKLot model

    args: image, a PIL image of the unannoted parking lot

    returns: a PIL image of the annotated parking lot
    '''
    input_image_size = (640, 640)
    min_score_thresh = 0.30

    image_array = tf.keras.utils.img_to_array(image, dtype='uint8')
    image_array = tf.expand_dims(image_array, axis=0)
    image_array_np = image_array[0].numpy()
    result = model_fn(image_array)

    bboxes = result['detection_boxes'][0]
    classes = result['detection_classes'][0]
    score = result['detection_scores'][0]

    image_draw = ImageDraw.Draw(image)

    for index in range(len(bboxes)):
        if score[index] < 0.3:
            continue

        color = (0, 0, 255)

        if classes[index] == 1:
            color = (0, 255, 0)
        elif classes[index] == 2:
            color = (255, 0, 0)
        else:
            print("error. classes[index] is ", classes[index])

        y0, x0, y1, x1 = bboxes[index]

        image_draw.rectangle([x0, y0, x1, y1], outline=color, width=2)

    return image
