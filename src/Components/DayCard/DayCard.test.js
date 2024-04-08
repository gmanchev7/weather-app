/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import DayCard from './index';
import '@testing-library/jest-dom'

describe('DayCard', () => {
  const weatherData = {
    dt_txt: '2022-04-05 12:00:00',
    main: {
      temp: 20,
    },
    weather: [
      {
        main: 'Clouds',
      },
    ],
    name: 'City Name',
  };

  test('renders weather card with correct data', () => {
    const { getByAltText, getByText } = render(<DayCard weatherData={weatherData} />);

    expect(getByAltText('weather_icon-small')).toBeInTheDocument();
    expect(getByText('20 °C')).toBeInTheDocument();
    expect(getByText('City Name')).toBeInTheDocument();
    expect(getByText('2022-04-05 12:00:00')).toBeInTheDocument();
  });
});