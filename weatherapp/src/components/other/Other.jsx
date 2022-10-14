import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCoordsByCity, getHourlyWeather, getWeatherDay } from "../../weatherService";
import './other.css'

export const Other = () => {
    const [weatherHourly, setWeatherHourly] = useState([])
    const [weatherDays, setWeatherDays] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const history = useNavigate()
    const historyLocation = useLocation()
    const [settedCity, updateSettedCity] = useState('')

    useEffect(() => {
        (async () => {
            if (settedCity === '') return
            setIsLoading(true)
            setWeatherHourly(await getHourlyWeather(await getCoordsByCity(settedCity)))
            setWeatherDays(await getWeatherDay(await getCoordsByCity(settedCity)))
            history('/in/' + settedCity)
            setIsLoading(false)
        })()
    }, [settedCity])

    useEffect(() => {
        updateSettedCity(historyLocation.pathname.replace('/in/', ''))
    }, [historyLocation])

    const getCityByInput = async () => {
        const inputVal = document.querySelector('.city-val').value
        updateSettedCity(inputVal.toLowerCase())
    }


    return (
        <div className="weather-in-city">
            <div className="change-this-city">
                <label htmlFor="">Введите город: </label>
                <input type="text" className="city-val" /> 
                <button onClick={(e) => { e.preventDefault(); getCityByInput() }}>Сменить город</button>
            </div>
            <div className="weather-day">
                <p>Прогноз на неделю</p>
                <div className="weather-day-content">
                    {!isLoading ? (
                        weatherDays.map((weatherDay) => {
                            return (
                                <div key={weatherDay.key}>
                                    <p>День {weatherDay.key + 1}</p>
                                    <p>{Math.round(weatherDay.weather) + '°C'}</p>
                                </div>
                            )
                        })
                    ) : 'Loading...'}
                </div>
            </div>
            <div className="hourly-weather">
                <p>Почасовой прогноз в городе <span className="name-city-weather">{settedCity}</span>:</p>
                <div className="container-hourly-weather">
                    {weatherHourly.map((weatherHour) => {
                        return (
                            <div key={weatherHour.hour}>
                                <p className="hour-time">{weatherHour.hour}</p>
                                <p className="hour-weather">{Math.round(weatherHour.weather) + '°C'}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}