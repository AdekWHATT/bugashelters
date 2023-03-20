import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async () => {
      const apiURL = '/api?apikey=pub_19156eba1ad03c7ccf2e0e6e626d4c8658553&language=ru&country=ru';
      const news = await axios.get(apiURL);
      return news.data; // Added .data to access the body of the response
    
    }
  );
  
const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.news = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.news = action.payload;
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    });
  },
});

export const { setNews } = newsSlice.actions;

export default newsSlice.reducer;