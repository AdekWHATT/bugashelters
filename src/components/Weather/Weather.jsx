import { useDispatch, useSelector } from 'react-redux';
import React, {useEffect } from 'react';
import { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure , selectWeatherData, selectWeatherLoading, selectWeatherError } from '../../store/weatherSlice';

function Weather() {
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherData);
  const weatherLoading = useSelector(selectWeatherLoading);
  const weatherError = useSelector(selectWeatherError);

  useEffect(() => {
    dispatch(fetchWeatherStart());

    fetch('http://api.openweathermap.org/data/2.5/onecall?id=524901&appid=d683360339220a6f99f853df5f452fc0')
      .then(response => response.json())
      .then(data => dispatch(fetchWeatherSuccess(data)))
      .catch(error => dispatch(fetchWeatherFailure(error)));
  }, [dispatch]);
  return (
    <div>
      {weatherLoading ? (
        <p>Loading weather data...</p>
      ) : weatherError ? (
        <p>Error loading weather data: {weatherError.message}</p>
      ) : (
        <>
          <p>Temperature: {weatherData.list.main.temp}</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </>
      )}
    </div>
  );
}

export default Weather;
