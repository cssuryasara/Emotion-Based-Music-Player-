
import base64
import numpy as np
import io
from deepface import DeepFace
import json
import time
#from tensorflow.keras.models import Sequential, load_model
#from tensorflow.keras.preprocessing.image import ImageDataGenerator, img_to_array
from flask import request, jsonify, Flask
#import cv2
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})


# def get_model():
#     global model
#     model = load_model(
#         r'C:\Users\ASUS\Desktop\EmotionBasedMusicPlayer\Fer2013.hdf5')
#     print("loaded")


# def preprocess(image, target_size):
#     image = np.float32(image)
#     image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     image = cv2.resize(image, (48, 48), interpolation=cv2.INTER_AREA)
#     image = img_to_array(image)
#     image = np.expand_dims(image, axis=0)
#     return image


print("loading model")
#get_model()


@app.errorhandler(500)
def handle_another_exception(error):
    '''Return a custom message and 500 status code'''
    # print(error.specific)
    message = {'predictedValue': "Face Not Found In Image",
               'status': 500, 'cssClass': ''}
    return message


@app.route('/predict', methods=["POST"])
def predict():
    emojiDict = {'angry': "\U0001F620",
                 'disgust': "\U0001F922",
                 'fear': "\U0001F628",
                 'happy': "\U0001F603",
                 'sad': "\U0001F614",
                 'surprise': "\U0001F632 ",
                 'neutral': "\U0001F610 ", }
    classes = np.array(("Angry", "Disgust", "Fear", "Happy",
                       "Sad", "Surprise", "Neutral"))
    start = time.time()
    message = request.get_json(force=True)
    encoded = message['image']

    # first method
    # decoded=base64.b64decode(encoded)
    # image=Image.open(io.BytesIO(decoded))
    # preprocessImage=preprocess(image, target_size=(48,48))
    # prediction= model.predict(preprocessImage)
    # label=classes[prediction.argmax()]
    # #second method
    imgdata = base64.b64decode(encoded)
    filename = r'C:\Users\vahin\Desktop\predict.jpg'
    f = open(filename, 'wb')
    f.write(imgdata)
    f.close()
    print('started')
    result = DeepFace.analyze(filename, actions=['emotion'])
    print(result)

    result = result['dominant_emotion']
    end = time.time()
    print(end-start)
    print(emojiDict[result] + str(result).capitalize())
    message = {'predictedValue': emojiDict[result] + str(
        result).capitalize(), 'status': 200, 'cssClass': result}
    return message
