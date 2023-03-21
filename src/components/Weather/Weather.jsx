import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure, selectWeatherData, selectWeatherLoading, selectWeatherError } from '../../store/weatherSlice';

function Weather() {
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherData);
  const weatherLoading = useSelector(selectWeatherLoading);
  const weatherError = useSelector(selectWeatherError);
  const [city, setCity] = useState('Бугульма');

  const API = 'd683360339220a6f99f853df5f452fc0';

  useEffect(() => {
    // if (city.trim() !== '') { // check if city is not an empty string after trimming whitespace
    dispatch(fetchWeatherStart());
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${API}`)
      .then(response => response.json())
      .then(data => dispatch(fetchWeatherSuccess(data)))
      .catch(error => dispatch(fetchWeatherFailure(error)));
    // }
  }, [city, dispatch]);


  // const handleCityChange = event => {
  //   setCity(event.target.value);
  // };

  if (weatherLoading) {
    return <p>Загрузка...</p>;
  }

  if (weatherError) {
    return <p>Ошибка: {weatherError.message}</p>;
  }

  if (!weatherData) {
    return null;
  }

  const celsius = (weatherData.main.temp - 273.15).toFixed(1);

  return (
    <div className='row p-3'>
      <div className='col-12'>
        <div className='card_weather'>
          {/* <h2 className='text-center'>Введите название города:</h2> */}
          {/* <input type='text' value={city} onChange={handleCityChange} /> */}
          <h2 className='text-center'>{weatherData.name}</h2>
          <h1 className='text-center'>Температура: {celsius} °C</h1>
          <h2 className='text-center'>{weatherData.weather[0].description}</h2>
        </div>
      </div>
    </div>
  );
}

export default Weather;
