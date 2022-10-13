import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './main.css'


export const Main = () => {
    const contentWeatherByBlock = [];
    useEffect(() => {
        //Определил геолокацию
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position)
            const thisCity = await getNameByCity(position.coords.latitude, position.coords.longitude)
            getWeather(position.coords.latitude, position.coords.longitude, thisCity)
            
        })
        resultWeatherInCity();
    }, [])

    const getWeather = async (latitude, longitude, cityWeather = 'Minsk') => {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true`)
        const getWeather = await response.json()
        const weatherBlock = document.querySelector('.data-weather')
        weatherBlock.innerHTML="Loading..."
        //Погода сегодня в полдень
        //const timeTodayWeather = 12;
        //Погода завтра в полдень +24 ед
        const timeTomorrowWeather = 36;
        //Погода Послезавтра в полдень +24 ед
        const timeAfterTomorrowWeather = 50;
        const timeAfter2dayWeather = 74;
        const contentWeatherByBlock = [
            {
                weatherCity: cityWeather,
                weatherNow: getWeather.current_weather.temperature,
                weatherTomorrow: getWeather.hourly.temperature_2m[timeTomorrowWeather],
                weatherAfterTomorrow: getWeather.hourly.temperature_2m[timeAfterTomorrowWeather],
                weatherAfter2Day: getWeather.hourly.temperature_2m[timeAfter2dayWeather]
            }
        ]
        weatherBlock.innerHTML=` ${contentWeatherByBlock[0].weatherCity} <br>
        Погода сейчас: ${contentWeatherByBlock[0].weatherNow}°C<br>
        Погода завтра: ${contentWeatherByBlock[0].weatherTomorrow}°C<br>
        Погода послезавтра: ${contentWeatherByBlock[0].weatherAfterTomorrow}°C<br>
        Погода через 2 дня: ${contentWeatherByBlock[0].weatherAfter2Day}°C
        `
    }

    const getCoordsByCity = async (nameCity) => {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${nameCity}`)
        const dataNameByCoords = await response.json()
        //Координаты города
        await getNameByCity(dataNameByCoords.results[0].latitude, dataNameByCoords.results[0].longitude)
        getWeather(dataNameByCoords.results[0].latitude, dataNameByCoords.results[0].longitude, nameCity)
    }

    const getNameByCity = async (laltitude, longitude) => {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${laltitude}&longitude=${longitude}&localityLanguage=en`)
        const dataCity = await response.json();
        //Название города
        return dataCity.city;
    }

    const resultWeatherInCity = () => {
        const getCity = document.querySelectorAll('.getCity')
        const url = window.location.href + '?city'
        
        getCity.forEach((city) => {
            city.addEventListener('click', () => {
                getCoordsByCity(city.value)
                window.location.href = url
            })
        })

    }



    return (
        <div>
            <Link to='/other'>Внутренняя страница</Link>
            <div className="changeCity">
                <button className="getCity" value='Minsk'>Minsk</button>
                <button className="getCity" value='Moscow'>Moscow</button>
                <button className="getCity" value='Bratislava'>Bratislava</button>
            </div>
            <div className="data-weather">

            </div>
        </div>
    )
}
