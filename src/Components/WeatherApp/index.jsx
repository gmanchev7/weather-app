import React, { useState, useEffect } from "react";
import { fetchDataFromAPI, fetchCurrentLocation, fetchFiveDaysForecast } from "../../Services/api";
import WeatherCard from "../WeatherCard";
import './styles.scss';
import SearchInput from "../SearchInput";
import { useSelector, useDispatch } from 'react-redux';

export default function WeatherApp() {
    const [fiveDaysForecast, setFiveDaysForecast] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const dispatch = useDispatch()
    const metric = useSelector(state => state.isEuropeanMetric);
    const weatherData = useSelector(state => state.weatherData)
    const [width, setWidth] = useState(window.innerWidth);


    useEffect(() => {
        fetchCurrentLocation()
            .then(({ latitude, longitude }) => {
                setLatitude(latitude)
                setLongitude(longitude)
            })
            .catch((error) => {
                console.error('Error fetching location:', error);
            });
    }, []);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const data = await fetchFiveDaysForecast(latitude, longitude);
                let mappedData = { ...data };

                mappedData?.list.forEach((d, index) => {
                    const date = d.dt_txt.slice(0, 10);
                    const id = new Date(date).getDate();
                    mappedData.list[index].id = id;
                });
                dispatch({ 'type': "setForecastDays", payload: { mappedData } });
                setFiveDaysForecast(mappedData);
            } catch (error) {
                console.error('Error fetching forecast data:', error);
            }
        };
        fetchForecast();
    }, [longitude, latitude, dispatch])

    const fetchData = async (searchQuery) => {
        try {
            const data = await fetchDataFromAPI(searchQuery);
            dispatch({ type: 'setWeatherData', payload: data })
        } catch (error) {
            dispatch({ type: 'setWeatherData', payload: null })
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClick = () => {
        dispatch({ type: 'setIsEuropeanMetric' });
    }
    return (
        <>
            <div className="weather">
                <SearchInput fetchData={fetchData} />

            </div>
            <button onClick={handleClick}>{metric ? "European Metrics" : "US Metrics"}</button>
            {width <= 980 && weatherData &&
                <div className="weather-days-container" data-testid="weather-days-container">
                    {fiveDaysForecast.list && fiveDaysForecast.list.map((data, index) => {
                        if (index % 8 === 0) {
                            if (index === 0) {
                                return <WeatherCard containerType='todayWeather' place={weatherData?.name} weatherData={data} key={index} />;
                            }
                        }

                        return null;
                    })}
                </div>
            }

            {width <= 980 && weatherData && <div className="other-days-container">
                {fiveDaysForecast.list && fiveDaysForecast.list.map((data, index) => {
                    if (index % 8 === 0) {
                        if (index === 0) {
                            return null;
                        } else {
                            return <WeatherCard containerType='otherDays' place={weatherData?.name} weatherData={data} key={index} />;
                        }
                    }
                    return null;
                })}
            </div>}


            {width > 980 && weatherData && <div className="weather-days-container" data-testid="weather-days-container">
                {fiveDaysForecast.list && fiveDaysForecast.list.map((data, index) => {
                    if (index % 8 === 0) {
                        if (index === 0) {
                            return <WeatherCard containerType='todayWeather' place={weatherData?.name} weatherData={data} key={index} />;
                        } else {
                            return <WeatherCard containerType='otherDays' place={weatherData?.name} weatherData={data} key={index} />;
                        }
                    }
                    return null;
                })}
            </div>}
        </>
    )
}
