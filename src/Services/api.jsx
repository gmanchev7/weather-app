import axios from 'axios';
const API_KEY = 'f084905e470983363fee6b15245236dc';
const API_URL = `https://api.openweathermap.org/data/2.5/`;

const api = {
  key: API_KEY,
  base: API_URL
}

export const fetchDataFromAPI = async (city) => {
  try {
    const response = await axios.get(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
};

export const getGeoLocationFromIP = async (locationName, stateCode) => {
    const locationQuery = `${locationName}${stateCode ? ',' + stateCode : ''}`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationQuery}&appid=${API_KEY}`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Weather data not found for the given location.');
      }
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };
  export const fetchFiveDaysForecast = async (lat, lon) => {
    try {
      const response = await axios.get(`${api.base}forecast?lat=${lat}&lon=${lon}&appid=${api.key}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  };

  export const fetchCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  };