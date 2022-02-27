# Vindler

### Note: THIS IS AN ONGOING PROJECT.

## Aim:
To use face or voice recognition and authentication as a verification method when accessing an auth based platform, in this use case a basic social platform - vindler.

## Basic Features:
1) POST, GET, and DELETE requests.
2) Private message section **Under construction**
3) Profile picture upload.


## Tech Stack:
React-Redux.
Django REST framework.
ReactNative.
Machine learning and Deep learning frameworks.
Postgres.
Redis.

## Repo Breakdown:
1) vindler_authentication: This folder contains the backend that houses the machine learning and deep learning model.
2) vindler_backend: This folder contains the backend for post, get, delete, user registeration, user authentication, and picture upload requests(The images are saved on AWS s3 bucket). 
3) Vindler_frontend: This folder contains the frontend interface for vindler.
4) Check: Testing the models on single and multiple pictures.


# How to view this project on your desktop.
Make sure you have pip installed on your system. If you have python 3.6 upwards, you would most likely have pip pre-installed. Have a virtual enviroment, if you do not have
virtual enviroment installed on your system you can install it using -> pip install virtualenv on your CLI. Once that is installed, proceed with the following steps:

- Clone the repo
- Create a different folder for any of the backend services.
- Copy the desired backend service to newly created folder.
- On your CLI, cd to the folder.
- Create your own virtualenv -> virtualenv name_of_your_env
- Activate your env(windows) -> name_of_your_env\Scripts\activate 
   ''         ''   ''(ios)   -> source name_of_your_env/bin/activate
- Change directory to the applications root directory-> cd vindler_authentication
- Install the requirements-> pip install -r requirements.txt
- When this is done, activate the application -> python manage.py runserver
- Go to your web browser(I use Google chrome), create a new incognito page and type in http://127.0.0.1:8000

## Issues:
1) Frontend: Media responsiveness.
2) Deep learning: Accepting new targets during online learning.

#### Best viewed with a system.

Link to current version of [vindler](https://vindler.netlify.app/#/Login).
