/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Day from './index';
import '@testing-library/jest-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Day', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders day component with correct data', async () => {
    useParams.mockReturnValue({ day: '2022-04-05' });

    const mockForecastDayById = [
      { dt_txt: '2022-04-05 12:00:00', main: { temp: 20 }, weather: [{ main: 'Clouds' }] },
      { dt_txt: '2022-04-05 15:00:00', main: { temp: 22 }, weather: [{ main: 'Clear' }] },
    ];

    const store = mockStore({
      forecastDayById: mockForecastDayById,
    });

    const { getByText } = render(
      <Provider store={store}>
        <Day />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText('2022-04-05 12:00:00')).toBeInTheDocument();
      expect(getByText('20 °C')).toBeInTheDocument();
      expect(getByText('2022-04-05 15:00:00')).toBeInTheDocument();
      expect(getByText('22 °C')).toBeInTheDocument();
    });
  });
});