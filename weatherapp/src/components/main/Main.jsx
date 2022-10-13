import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getWeather, useWeather } from "../../weatherService";
import './main.css'


export const Main = () => {

    useWeather()
    // let contentWeatherByBlock = [];
    // useEffect(() => {
    //     const cityByUrl = window.location.pathname.replace('/in/', '');
    //     if (!enumAllowedCityes.includes(cityByUrl)) {
    //         //Определил геолокацию
    //         navigator.geolocation.getCurrentPosition(async (position) => {
    //             console.log(position)
    //             const thisCity = await getNameByCity(position.coords.latitude, position.coords.longitude)
    //             getWeather(position.coords.latitude, position.coords.longitude, thisCity)
    //         }, () => {
    //             setWeatherByCity('Minsk')
    //         })

    //     } else {
    //         setWeatherByCity(cityByUrl)
    //     }
    //     resultWeatherInCity();
    // }, [])

    // const getWeather = async (latitude, longitude, cityWeather = 'Minsk') => {
    //     const weatherBlock = document.querySelector('.data-weather')
    //     const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true`)
    //     const getWeather = await response.json()
    //     //Погода сегодня в полдень
    //     //const timeTodayWeather = 12;
    //     //Погода завтра в полдень +24 ед
    //     const timeTomorrowWeather = 36;
    //     //Погода Послезавтра в полдень +24 ед
    //     const timeAfterTomorrowWeather = 50;
    //     const timeAfter2dayWeather = 74;
    //     contentWeatherByBlock = [
    //         {
    //             weatherCity: cityWeather,
    //             weatherNow: getWeather.current_weather.temperature,
    //             weatherTomorrow: getWeather.hourly.temperature_2m[timeTomorrowWeather],
    //             weatherAfterTomorrow: getWeather.hourly.temperature_2m[timeAfterTomorrowWeather],
    //             weatherAfter2Day: getWeather.hourly.temperature_2m[timeAfter2dayWeather]
    //         }
    //     ]
    //     weatherBlock.innerHTML = ` ${contentWeatherByBlock[0].weatherCity} <br>
    //     Погода сейчас: ${contentWeatherByBlock[0].weatherNow}°C<br>
    //     Погода завтра: ${contentWeatherByBlock[0].weatherTomorrow}°C<br>
    //     Погода послезавтра: ${contentWeatherByBlock[0].weatherAfterTomorrow}°C<br>
    //     Погода через 2 дня: ${contentWeatherByBlock[0].weatherAfter2Day}°C
    //     `
    //     console.log(latitude, longitude)
    // }

    // const setWeatherByCity = async (nameCity) => {
    //     const weatherBlock = document.querySelector('.data-weather')
    //     weatherBlock.innerHTML = "Loading..."
    //     const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${nameCity}`)
    //     const dataNameByCoords = await response.json()
    //     //Координаты города
    //     await getNameByCity(dataNameByCoords.results[0].latitude, dataNameByCoords.results[0].longitude)
    //     await getWeather(dataNameByCoords.results[0].latitude, dataNameByCoords.results[0].longitude, nameCity)
    // }

    // const getNameByCity = async (laltitude, longitude) => {
    //     const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${laltitude}&longitude=${longitude}&localityLanguage=en`)
    //     const dataCity = await response.json();
    //     //Название города
    //     return dataCity.city;
    // }

    // const resultWeatherInCity = () => {
    //     const getCity = document.querySelectorAll('.getCity')
    //     getCity.forEach((city) => {
    //         city.addEventListener('click', () => {
    //             setWeatherByCity(city.value)
    //         })
    //     })

    //}
    // const setInsideCity = 'Minsk'

    // useEffect(() => {
    //     const setInsideCity = () => {
    //         const getCity = document.querySelectorAll('.getCity')
    //         getCity.forEach((city) => {
    //             city.addEventListener('click', () => {
    //                 return city.value
    //             })
    //         })
    //     }
    // }, [setInsideCity()])

    let urlInside = ''
    if(window.location.pathname === '/') {
        urlInside  = '/Minsk'
    } else {
        urlInside = window.location.pathname
    }

    return (
        <div className="weather-main">
            <Link to={'/in' + urlInside}>Внутренняя страница</Link>
            <div className="change-city">
                <p>Выбирете город:</p>
                <Link to='/Minsk'><button className="getCity" value='Minsk'>Minsk</button></Link>
                <Link to='/Moscow'><button className="getCity" value='Moscow'>Moscow</button></Link>
                <Link to='/Bratislava'><button className="getCity" value='Bratislava'>Bratislava</button></Link>
            </div>
            <div className="data-weather">
                <div>Город: <span className="weatherCity"></span></div>
                <div className="weater-days">
                    <div>Температура сейчас: <span className="weatherNow"></span></div>
                    <div>Температура завтра: <span className="weatherTomorrow"></span></div>
                    <div>Температура послезавтра: <span className="weatherAfterTomorrow"></span></div>
                    <div>Температура через 2 дня: <span className="weatherAfter2Day"></span></div>
                </div>
            </div>
        </div>
    )
}
