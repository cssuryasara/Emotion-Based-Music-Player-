import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import cameraReducer from '../features/CameraSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    camera:cameraReducer
  },
});
