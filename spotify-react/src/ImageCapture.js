import React, {useCallback, useRef} from 'react';
import Webcam from 'react-webcam';
import CameraIcon from '@material-ui/icons/Camera';
import {setCameraImage, setPictureTaken} from './features/CameraSlice';
import {useDispatch} from 'react-redux';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import './ImageCapture.css';
import {useHistory} from 'react-router';

function ImageCapture () {
  const dispatch = useDispatch ();
  const history = useHistory ();

  const hiddenFileInput = useRef (null);

  const nextPage = image => {
    dispatch (setCameraImage (image));
    dispatch (setPictureTaken (true));
    history.push ('/predict');
  };

  const webCamRef = useRef (null);
  const videoConstraints = {
    facingMode: 'user',
  };

  const capture = useCallback (
    () => {
      const imageSource = webCamRef.current.getScreenshot ();
      dispatch (setCameraImage (imageSource));
      dispatch (setPictureTaken (true));
      history.push ('/predict');
    },
    [webCamRef]
  );
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

  const handleClick = event => {
    hiddenFileInput.current.click ();
  };

  const handleFileRead = async event => {
    const file = event.target.files[0];
    const base64 = await convertBase64 (file);
    nextPage (base64);
  };

  
  return (
    <div className="imageCapture">
      <div className="imageCapture__webCam">
        <Webcam
          audio={false}
          ref={webCamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
       
      </div>
      <div className="imageCapture__buttons">
        <div onClick={capture} className="imageCapture__captureButton">
          <CameraIcon className="webCamCapture__button" fontSize="large" />
          <h4>CAPTURE</h4>
        </div>

        <div onClick={handleClick} className="imageCapture__inputfile-input">

          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleFileRead}
            encType="multipart/form-data"
            className="imageCapture__inputfile"
          />
          <AttachFileIcon />
          <h4 for="file">Select file</h4>
        </div>
      </div>
    </div>
  );
}

export default ImageCapture;
