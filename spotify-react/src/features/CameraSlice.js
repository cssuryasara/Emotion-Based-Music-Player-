import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  cameraImage: null,
  pictureTaken: false,
  predictedValue: null,
  emotionCSSClass: '',
};
export const cameraSlice = createSlice ({
  name: 'camera',
  initialState,
  reducers: {
    setCameraImage: (state, action) => {
      state.cameraImage = action.payload;
    },

    setPictureTaken: state => {
      state.pictureTaken = true;
    },
    resetEverything: state => {
      state.pictureTaken = false;
      state.cameraImage = null;
      state.predictedValue = null;
      state.emotionCSSClass = '';
    },
    resetpredictedValue: state => {
      state.predictedValue = null;
    },
    setPredictedValue: (state, action) => {
      state.predictedValue = action.payload;
    },
    setEmotionCSSClass: (state, action) => {
      state.emotionCSSClass = action.payload;
    },
  },
});
export const {
  setCameraImage,
  resetEverything,
  setPictureTaken,
  setEmotionCSSClass,
  setPredictedValue,
  resetpredictedValue,
} = cameraSlice.actions;

export const SelectemotionCSSClass = state => state.camera.emotionCSSClass;

export const selectCameraImage = state => state.camera.cameraImage;
export const selectpictureTaken = state => state.camera.pictureTaken;
export const SelectPredictedValue = state => state.camera.predictedValue;

export default cameraSlice.reducer;
