import { reducer } from './reducers';

describe('Redux Reducer Tests', () => {
  it('should handle setForecastDays action', () => {
    const action = { type: 'setForecastDays', payload: {} };
    const initialState = { forecastDays: {}, forecastDayById: [], isEuropeanMetric: true, weatherData: null };
    const nextState = reducer(initialState, action);
    expect(nextState.forecastDays).toEqual(action.payload);
  });

  it('should handle getDayById action', () => {
    const action = { type: 'getDayById', payload: '1' };
    const initialState = { forecastDays: { mappedData: { list: [{ id: 1 }, { id: 2 }, { id: 3 }] } }, forecastDayById: [], isEuropeanMetric: true, weatherData: null };
    const nextState = reducer(initialState, action);
    expect(nextState.forecastDayById).toEqual([{ id: 1 }]);
  });

  it('should handle setIsEuropeanMetric action', () => {
    const action = { type: 'setIsEuropeanMetric' };
    const initialState = { forecastDays: {}, forecastDayById: [], isEuropeanMetric: true, weatherData: null };
    const nextState = reducer(initialState, action);
    expect(nextState.isEuropeanMetric).toEqual(false);
  });

  it('should handle setWeatherData action', () => {
    const action = { type: 'setWeatherData', payload: { /* weather data */ } };
    const initialState = { forecastDays: {}, forecastDayById: [], isEuropeanMetric: true, weatherData: null };
    const nextState = reducer(initialState, action);
    expect(nextState.weatherData).toEqual(action.payload);
  });

  it('should return current state for unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const initialState = { forecastDays: {}, forecastDayById: [], isEuropeanMetric: true, weatherData: null };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });
});
