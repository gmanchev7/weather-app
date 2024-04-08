/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Provider } from 'react-redux';
import WeatherCard from './index';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { createStore } from 'redux';

const initialState = {
  isEuropeanMetric: true 
};

const reducer = (state = initialState, action) => {
  return state;
};

const store = createStore(reducer);

describe('WeatherCard Component', () => {
  test('renders weather card with weather data', () => {
    const weatherData = {
        clouds: { all: 17 },
        dt: 1712534400,
        dt_txt: "2024-04-08 00:00:00",
        id: 8,
        main: {
          temp: 285,
          feels_like: 284,
          temp_min: 284,
          temp_max: 285,
          pressure: 1024
        },
        pop: 0,
        sys: { pod: 'n' },
        visibility: 10000,
        weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03n' }],
        wind: { speed: 0.68, deg: 83, gust: 0.69 }
      };

      render(
        <Provider store={store}>
          <BrowserRouter>
            <WeatherCard place="New York" weatherData={weatherData} containerType="todayWeather" />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText('285 °C')).toBeInTheDocument();
      expect(screen.getByText('Wind Speed: 0.68 km/h')).toBeInTheDocument();
      expect(screen.getByText(/Humidity:/)).toBeInTheDocument();
      expect(screen.getByText('Clouds')).toBeInTheDocument();
  });

});
