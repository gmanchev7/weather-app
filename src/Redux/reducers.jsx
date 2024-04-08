const initialState = {
    forecastDays: {},
    forecastDayById: [],
    isEuropeanMetric: true,
    weatherData : null
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setForecastDays':
            return {
                ...state,
                forecastDays: action.payload
            };
        case 'getDayById':
            let forecastDay = state.forecastDays.mappedData.list.filter(day => day.id === Number(action.payload))
            return {
                ...state,
                forecastDayById: forecastDay
            };
        case 'setIsEuropeanMetric':
            return {
                ...state,
                isEuropeanMetric: !state.isEuropeanMetric
            };
            case 'setWeatherData':
                return {
                    ...state,
                    weatherData: action.payload
                };
        default:
            return state;
    }
};

