# Parking Lot Spot Detection

This project is a demonstration of my capstone project for WGU, where I trained an object detection model to detect occupied and open parking spots using overhead images of the parking lot.

The idea for this project was to explore the possibility of providing an alternative to expensive and capital-intensive parking occupancy systems used in some parking structures by utilizing existing parking lot security cameras and modern object detection models to detect parking spot occupancy.  As overhead security cameras are already commonly found in outdoor parking lots, there is an opportunity to deploy a model such as this to detect occupancy and then tie in to on the ground signage to inform drivers of how many spots remain in a given area of the parking lot, or even to tie in lights for each spot to inform drivers where an empty spot is located.  This project can run on a CPU bound docker image and is still able to achieve a 6-second inference time when hot.  It could then handle 10 different parking lot cameras if updating once a minute.  The ongoing costs would then only be the cost of running this small container, maintenance of a handful of security cameras (which is already an existing maintenance cost), and maintenance of signage. This is certainly an attractive solution compared to individual spot sensors.

#### Successes of this project:
  - Achieved 79.5% recall off of only 4 hours of training
  - Was able to manage inference on the three different parking lot camera views without issue
  - Low cost for the application, docker image needs around 2GB to run.

#### Current limitations of this project:
  - Not generalizable.  This project would require having annotated images for a specific camera view to be trained for that specific camera view.
  - Additional training time is needed.  The study that created the PKLot dataset was able to achieve over 99% detection rates, showing that there is more performance to be gained on this limited project.  Additional training time or further exploration into different object detection models should result in much better performance to make this project production-ready.

The deployed website can be found here:  
https://kevintprivett.github.io/ParkingLot/  

The trained model can be found here:  
https://drive.google.com/file/d/1H-LnErIutBlWUuNQNyHvtIMp0K05Vw0n/view?usp=drivesdk

## Technologies Used
The model was developed in TensorFlow by fine-tuning the [TensorFlow implementation](https://github.com/tensorflow/models/blob/v2.15.0/official/vision/configs/maskrcnn.py#L264-L331) of the [Faster-RCNN object detection model](https://arxiv.org/abs/1506.01497) using the [PKLot Dataset](https://www.inf.ufpr.br/lesoliveira/download/ESWA2015.pdf) (associated [Kaggle Dataset](https://www.kaggle.com/datasets/ammarnassanalhajali/pklot-dataset/data)).

The model is hosted as an AWS Lambda function, which runs a containerized TensorFlow environment.  The deployed webapp makes API calls to this Lambda function in order to run inference on the parking lot images.

The front end for the web app was developed using React and Vite.

## Running Locally

The front end can be run locally, assuming a recent version of Node.js and npm.

Clone this repo to your machine and navigate to the FrontEnd folder, then run:

```shell
  npm install
  npm run dev
```

Vite should now be running on http://localhost:5173

To run the TensorFlow model, download the [trained model](https://drive.google.com/file/d/1H-LnErIutBlWUuNQNyHvtIMp0K05Vw0n/view?usp=drivesdk) and extract its contents into the Model/Docker folder like so:

```
  ParkingLot/
    FrontEnd/
    Model/
      Docker/
        exported_model/
          {exported_model contents}
```

The model can be containerized and deployed using docker.

```shell
  # navigate to ParkingLot/Model/Docker

  # Build the docker image
  docker build -t pklot-model
  
  # Deploy with docker compose
  docker compose up
```

This will deploy the docker onto port 8030.  Rename the .env.example file in the FrontEnd to .env and change the VITE_INFER_API_URL to http://localhost:8030/infer

At this point, the front end should be able to connect to the TensorFlow model and start identifying empty and filled parking spots.
