import base64
import json
import requests
from PIL import Image

POST_URL = 'http://localhost:8030/infer'

for i in range(3):
    with open('./images/2012-09-11_15_53_00_jpg.rf.8282544a640a23df05bd245a9210e663.jpg', 'rb') as image_file:
        image_data = image_file.read()

        image_string = base64 \
            .b64encode(image_data) \
            .decode('utf-8')

        response = requests.post(
            POST_URL,
            json={
                'image_data': image_string
            }
        )

        print(response)
        
        response_object = response.json()

        response_data = base64.b64decode(response_object)

        with open('./images/response.jpg', 'wb') as f:
            f.write(response_data)

