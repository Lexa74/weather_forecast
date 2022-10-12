import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './main.css'


export const Main = () => {
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position)
            const thisLatitude = position.coords.latitude;
            const thisLongitude = position.coords.longitude;
            //Определить координаты местонахождения
            //Ввести координаты в Апи который находит город по координатам
            //Определяем город
            //Выводим погоду в городе
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${thisLatitude}&longitude=${thisLongitude}&hourly=temperature_2m&current_weather=true`)
            const getWeather = await response.json();
            //const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`)
            //Погода сегодня в полдень
            const timeTodayWeather = 12;
            //Погода завтра в полдень +24 ед
            const timeTomorrowWeather = 36;
            //Погода завтра в полдень +24 ед
            const timeAfterTomorrowWeather = 36;
            console.log(getWeather)
            console.log(getWeather.current_weather.temperature)
            console.log('Погода время: '+getWeather.hourly.time[timeTodayWeather])
            console.log('Температура какая: '+getWeather.hourly.temperature_2m[timeTodayWeather])
            console.log('Погода время: '+getWeather.hourly.time[timeTomorrowWeather])
            console.log('Температура завтра: '+getWeather.hourly.temperature_2m[timeTomorrowWeather])
        })
    }, [])


    return (
        <div>
            <Link to='/other'>Внутренняя страница</Link>
        </div>
    )
}
