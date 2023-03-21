import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import weatherReducer from './weatherSlice';

const store = configureStore({
  reducer: {
    news: newsReducer,
    weather: weatherReducer,
  },
});

export default store;
