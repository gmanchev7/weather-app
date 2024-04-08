import React, { useEffect, useState } from 'react';
import sun from '../Assets/sun.png';
import clouds from '../Assets/cloud.png';
import mist from '../Assets/fog.png';
import rain from '../Assets/rain.png';
import snow from '../Assets/snow.png';
import wind from '../Assets/windy.png';
import styles from './styles.module.scss';

export default function DayCard({weatherData}) {
    const [icon, setIcon] = useState(sun);
    const iconString = weatherData?.weather[0].main;

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
        <div className={styles['weather-card-small']}>
            <div className={styles['icon-and-temperature-small']}>
                <img src={icon} alt="weather_icon-small" />
            </div>
            <div className={styles["place-small"]}>
                <p className={styles["temperature-small"]}>{Math.trunc(weatherData?.main?.temp)} &deg;C</p>
            </div>
            <div className={styles["place-small"]}>{weatherData?.name}</div>
            <div className={styles["date-time-small"]}>
                <p>{weatherData.dt_txt}</p>
            </div>
        </div>
    );
};
