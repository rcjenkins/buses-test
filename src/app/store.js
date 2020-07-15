import { configureStore } from '@reduxjs/toolkit';
import busStopReducer from '../features/busstop/busStopSlice';

export default configureStore({
  reducer: {
    busstop: busStopReducer,
  },
});
