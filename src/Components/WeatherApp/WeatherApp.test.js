/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import WeatherApp from './index';
import { fetchCurrentLocation, fetchFiveDaysForecast } from '../../Services/api';
import '@testing-library/jest-dom'

jest.mock('../../Services/api', () => ({
    ...jest.requireActual('../../Services/api'),
    fetchCurrentLocation: jest.fn(),
    fetchFiveDaysForecast: jest.fn(),
}));

const mockStore = configureStore([]);

describe('WeatherApp', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetches weather data when geolocation is available', async () => {
        fetchCurrentLocation.mockResolvedValueOnce({ latitude: 40.7143, longitude: -74.006 });
        const store = mockStore({ forecastDays: [], isEuropeanMetric: false, weatherData: null });

        render(
            <Provider store={store}>
                <WeatherApp />
            </Provider>
        );

        await act(async () => { });

        expect(fetchCurrentLocation).toHaveBeenCalled();
    });

    test('renders weather cards when weather data is available', async () => {
        const mockWeatherData = {
            list: [{}, {}, {}, {}],
        };

        const store = mockStore({
            forecastDays: [],
            isEuropeanMetric: false,
            weatherData: mockWeatherData,
        });
        fetchCurrentLocation.mockResolvedValue({ latitude: 40.7143, longitude: -74.006 });
        fetchFiveDaysForecast.mockResolvedValue(mockWeatherData);
        render(
            <Provider store={store}>
                <WeatherApp />
            </Provider>
        );
        await act(async () => { });
        expect(screen.getByTestId('weather-days-container')).toBeInTheDocument();
    });

    test('switches between European and US metrics when button is clicked', () => {
        const store = mockStore({ forecastDays: [], isEuropeanMetric: false, weatherData: null });

        render(
            <Provider store={store}>
                <WeatherApp />
            </Provider>
        );

        const button = screen.getByText('US Metrics');
        fireEvent.click(button);
        expect(store.getActions()).toContainEqual({ type: 'setIsEuropeanMetric' });
    });
});
