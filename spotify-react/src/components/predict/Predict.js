import {Button} from '@material-ui/core';
import axios from 'axios';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import predictlogo from '../../img/predict.svg';
import {
  resetEverything,
  resetpredictedValue,
  selectCameraImage,
  SelectemotionCSSClass,
  SelectPredictedValue,
  setCameraImage,
  setEmotionCSSClass,
  setPictureTaken,
  setPredictedValue,
} from '../../features/CameraSlice';
import './Predict.css';
import RefreshIcon from '@material-ui/icons/Refresh';
function Predict () {
  const cameraImage = useSelector (selectCameraImage);
  const prediction = useSelector (SelectPredictedValue);
  const emotionCSSClass = useSelector (SelectemotionCSSClass);
  const dispatch = useDispatch ();
  const history = useHistory ();
  const resetPrediction = () => {
    dispatch (resetEverything ());

    history.replace ('/capture');
  };
  useEffect (
    () => {
      if (!cameraImage) {
        history.replace ('/capture');
      }
    },
    [cameraImage, history]
  );
  const predict = () => {
    const image = cameraImage.replace ('data:image/jpeg;base64,', '');
    let message = {
      image: image,
    };
    axios
      .post ('http://192.168.43.133:5000/predict', JSON.stringify (message))
      .then (data => {
        console.log (data.data);
        if (data.data.status === 500) {
          alert (data.data.predictedValue);
        }
        dispatch (setPredictedValue (data.data.predictedValue));
        dispatch (setEmotionCSSClass (data.data.cssClass));
      })
      .catch (error => {
        alert (error);
        console.log (error);
      });
  };
  const convertBase64 = file => {
    return new Promise ((resolve, reject) => {
      const fileReader = new FileReader ();
      fileReader.readAsDataURL (file);
      fileReader.onload = () => {
        resolve (fileReader.result);
      };
      fileReader.onerror = error => {
        reject (error);
      };
    });
  };
  const hiddenFileInput = useRef (null);

  const handleClick = event => {
    hiddenFileInput.current.click ();
  };

  const handleFileRead = async event => {
    const file = event.target.files[0];
    const base64 = await convertBase64 (file);
    dispatch (setCameraImage (base64));
    dispatch (setPictureTaken (true));
    dispatch (resetpredictedValue ());
  };

  return (
    <div className={`predict ${emotionCSSClass}`}>
      <div className="predict__imageContainer">
        <img
          height="480"
          width="640"
          src={cameraImage}
          className="predict__image"
          alt=""
        />
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleFileRead}
          encType="multipart/form-data"
          className="imageCapture__inputfile"
        />
        <RefreshIcon onClick={handleClick} className="RefershIcon" />

        <h3>{prediction}</h3>
      </div>
      <div className="predict__buttons">
        <Button
          onClick={!prediction ? predict : resetPrediction}
          className="predict__button"
        >
          {!prediction
            ? <img src={predictlogo} className="predictlogo" alt="logo" />
            : ''}

          {!prediction ? 'predict Image' : 'Go Back'}
        </Button>
      </div>
    </div>
  );
}

export default Predict;
