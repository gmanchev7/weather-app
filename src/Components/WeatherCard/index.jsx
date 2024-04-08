/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import sun from '../Assets/sun.png';
import clouds from '../Assets/cloud.png';
import mist from '../Assets/fog.png';
import rain from '../Assets/rain.png';
import snow from '../Assets/snow.png';
import wind from '../Assets/windy.png';
import './styles.scss';
import './styles2.scss';

import { useSelector } from 'react-redux'

import {  Link } from "react-router-dom";
import { celsiusToFahrenheit, kmphToMph } from '../../Services/utils';


export default function WeatherCard ({place, weatherData, containerType}){
  const [icon, setIcon] = useState(sun);
  const date = weatherData.dt_txt.slice(0, 10);
  const iconString = weatherData?.weather[0].main;
  let day = new Date(date).getDate();
  const metric = useSelector(state => state.isEuropeanMetric);

  useEffect(() => {

    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(clouds);
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(mist);
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind);
      }
    }
  }, [iconString]);
  
  return (
    <Link to={`days/${day}`} className='card-link'>
      <div>
        {containerType === "todayWeather" ? <div className='weather-card'>
          <div className='icon-and-temperature'>
            <img src={icon} alt="weather_icon" /> 
            {metric && <p className='temperature'>{Math.trunc(weatherData?.main?.temp)} &deg;C</p>}
            {!metric && <p className='temperature'>{celsiusToFahrenheit(Math.trunc(weatherData?.main?.temp))} °F</p>}
          </div>
          <div className='place'>{place}</div>
          <div className='date-time'>
            <p>{new Date(date).toDateString()}</p>
          </div>
          <div className='weather-info'>
            {metric && <p className='wind-speed'>Wind Speed: {weatherData?.wind?.speed} km/h</p>}
            {!metric && <p className='wind-speed'>Wind Speed: {kmphToMph(weatherData?.wind?.speed)} mp/h</p>}
            <p className='humidity'>Humidity: {weatherData?.main?.humidity} gm/m&#179;</p>
          </div>
          <hr className='separator' />
          <div className='conditions'>{weatherData?.weather[0].main}</div>
        </div>
          :
          <div className='weather-card-small'>
            <div className='icon-and-temperature-small'>
              <img src={icon} alt="weather_icon-small" />
              {metric && <p className='temperature-small'>{Math.trunc(weatherData?.main?.temp)} &deg;C</p>}
              {!metric && <p className='temperature-small'>{celsiusToFahrenheit(Math.trunc(weatherData?.main?.temp))} °F</p>}
            </div>
            <div className='place-small'>{weatherData?.name}</div>
            <div className='date-time-small'>
              <p>{new Date(date).toDateString()}</p>
            </div>
            <div className='weather-info-small'>
              <p className='humidity-small'>Humidity: {weatherData?.main?.humidity} gm/m&#179;</p>
            </div>
            <div className='weather-info-small'>
              {metric && <p className='wind-speed-small'>Wind Speed: {weatherData?.wind?.speed} km/h</p>}
              {!metric && <p className='wind-speed-small'>Wind Speed: {kmphToMph(weatherData?.wind?.speed)} mp/h</p>}
            </div>
            <hr className='separator-small' />
            <div className='conditions-small'>{weatherData?.weather[0].main}</div>
          </div>}
      </div>
    </Link >
  );
};
