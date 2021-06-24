
import base64
import numpy as np
import io
from PIL import Image
from deepface import DeepFace
import json
import time
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator,img_to_array
from flask import request, jsonify, Flask
import cv2
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})


def get_model():
    global model
    model = load_model('Fer2013.hdf5')
    print("loaded")

def preprocess(image,target_size):
    image = np.float32(image)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    image = cv2.resize(image,(48,48),interpolation=cv2.INTER_AREA)
    image=img_to_array(image)
    image=np.expand_dims(image,axis=0)
    return image



print("loading model")
get_model()


@app.route('/predict', methods=["POST"])
def predict():
    classes=np.array(("Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise", "Neutral"))
    start = time.time()
    message = request.get_json(force=True)
    encoded = message['image']

    #first method
    decoded=base64.b64decode(encoded)
    image=Image.open(io.BytesIO(decoded))
    preprocessImage=preprocess(image, target_size=(48,48))
    prediction= model.predict(preprocessImage)
    label=classes[prediction.argmax()]
    # #second method
    imgdata = base64.b64decode(encoded)
    filename = r'C:\Users\ASUS\Desktop\predict.jpg'
    f=open(filename, 'wb')
    f.write(imgdata)
    f.close()
    print('started') 
    result=DeepFace.analyze(filename,actions=['emotion'])
    result=result['dominant_emotion']
    end = time.time()
    print(end-start)
    return str(label) + str(result)
