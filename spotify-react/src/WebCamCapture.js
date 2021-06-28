// import React, {useCallback, useRef, useState} from 'react';
// import Webcam from 'react-webcam';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// import {
//   selectCameraImage,
//   selectpictureTaken,
//   setCameraImage,
//   setPictureTaken,
// } from './features/CameraSlice';
// import {useDispatch, useSelector} from 'react-redux';
// import {Button} from '@material-ui/core';
// import axios from 'axios';

// function WebCamCapture() {
//   const videoConstraints = {
//     // width: 250,
//     // height: 400,
//     facingMode: 'user',
//   };
//   const webCamRef = useRef(null);

//   const dispatch = useDispatch();
//   const pictureTaken = useSelector(selectpictureTaken);
//   const CameraImage = useSelector(selectCameraImage);
//   const capture = useCallback(() => {
//     const imageSource = webCamRef.current.getScreenshot();
//     dispatch(setCameraImage(imageSource));

//     dispatch(setPictureTaken(true));
//   }, [webCamRef]);
//   const Predict = () => {
//     const image = CameraImage.replace('data:image/jpeg;base64,', '');
//     let message = {
//       image: image,
//     };
//     axios
//       .post('http://192.168.43.244:5000/predict', JSON.stringify(message))
//       .then((data) => {
//         console.log(data);
//         console.log(data.data);
//       })
//       .catch((error) => console.log(error));
//   };
  
//   const convertBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   };
//   const handleFileRead = async (event) => {
//     const file = event.target.files[0];
//     const base64 = await convertBase64(file);
//     console.log(base64);
//   };
//   return (
//     <div className="webCamCapture">
//       <input
//         id="image-selector"
//         type="file"
//         onChange={handleFileRead}
//         encType="multipart/form-data"
//       />

//       {pictureTaken ? (
//         <div className="predictImage">
//           <img src={CameraImage} alt="" />
//           <Button onClick={Predict}>Predict</Button>
//         </div>
//       ) : (
//         <div>
//           <Webcam
//             audio={false}
//             height={videoConstraints.height}
//             width={videoConstraints.width}
//             ref={webCamRef}
//             screenshotFormat="image/jpeg"
//             videoConstraints={videoConstraints}
//           />
//           <RadioButtonUncheckedIcon
//             className="webCamCapture__button"
//             fontSize="large"
//             onClick={capture}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default WebCamCapture;
