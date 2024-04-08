import React, { useEffect } from 'react';
import './styles.scss';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DayCard from '../DayCard';

export default function Day() {
    let { day } = useParams();
    const forecastDayById = useSelector((state) => state.forecastDayById);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'getDayById', payload: day });
    }, [day, dispatch]);

    return (
        <>
            {forecastDayById && (
                <div className="days-container">
                    {forecastDayById?.map((hour, index) => (
                        <DayCard weatherData={hour} key={index} />
                    ))}
                </div>
            )}
        </>
    );
};

