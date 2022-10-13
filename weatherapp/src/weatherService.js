import { useEffect } from "react";

const enumAllowedCityes = ['Minsk', 'Moscow', 'Bratislava']

export const getWeather = async (latitude, longitude, cityWeather = 'Minsk') => {
    //const weatherBlock = document.querySelector('.data-weather')
    const weatherCityBlock = document.querySelector('.weatherCity')
    const weatherNowBlock = document.querySelector('.weatherNow')
    const weatherTomorrowBlock = document.querySelector('.weatherTomorrow')
    const weatherAfterTomorrowBlock = document.querySelector('.weatherAfterTomorrow')
    const weatherAfter2DayBlock = document.querySelector('.weatherAfter2Day')

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true`)
    const getWeather = await response.json()
    //Погода завтра в полдень 12 + 24 ед
    const timeTomorrowWeather = 36;
    //Погода Послезавтра в полдень 36 + 24 ед
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
    weatherCityBlock.innerHTML = contentWeatherByBlock[0].weatherCity
    weatherNowBlock.innerHTML = `${Math.ceil(contentWeatherByBlock[0].weatherNow)}°C`
    weatherTomorrowBlock.innerHTML = `${Math.ceil(contentWeatherByBlock[0].weatherTomorrow)}°C`
    weatherAfterTomorrowBlock.innerHTML = `${Math.ceil(contentWeatherByBlock[0].weatherAfterTomorrow)}°C`
    weatherAfter2DayBlock.innerHTML = `${Math.ceil(contentWeatherByBlock[0].weatherAfter2Day)}°C`


    // weatherBlock.innerHTML = ` ${contentWeatherByBlock[0].weatherCity} <br>
    // Погода сейчас: ${contentWeatherByBlock[0].weatherNow}°C<br>
    // Погода завтра: ${contentWeatherByBlock[0].weatherTomorrow}°C<br>
    // Погода послезавтра: ${contentWeatherByBlock[0].weatherAfterTomorrow}°C<br>
    // Погода через 2 дня: ${contentWeatherByBlock[0].weatherAfter2Day}°C
    // `
    console.log(contentWeatherByBlock)
    return contentWeatherByBlock
}

//Получить координаты по названию города и установить погоду
export const setWeatherByCity = async (nameCity) => {
    // const weatherBlock = document.querySelector('.data-weather')
    // weatherBlock.innerHTML = "Loading..."
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${nameCity}`)
    const dataNameByCoords = await response.json()
    //Координаты города 
    //await getNameByCity(`latitude=${dataNameByCoords.results[0].latitude}&longitude${dataNameByCoords.results[0].longitude}`)
    await getWeather(dataNameByCoords.results[0].latitude, dataNameByCoords.results[0].longitude, nameCity)
}

//Получить название города по координатам
export const getNameByCity = async (paramCoord) => {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${paramCoord}&localityLanguage=en`)
    const dataCity = await response.json();
    return dataCity.city;
}

export const resultWeatherInCity = () => {
    const getCity = document.querySelectorAll('.getCity')
    getCity.forEach((city) => {
        city.addEventListener('click', () => {
            setWeatherByCity(city.value)
            //return city.value
        })
    })

}

export const useWeather = () => {
    useEffect(() => {
        const cityByUrl = window.location.pathname.replace('/', '');
        if (!enumAllowedCityes.includes(cityByUrl)) {
            //Определил геолокацию
            navigator.geolocation.getCurrentPosition(async (position) => {
                const thisCity = await getNameByCity(`latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`)
                getWeather(position.coords.latitude, position.coords.longitude, thisCity)
            }, () => {
                setWeatherByCity('Minsk')
            })
            
        } else {
            setWeatherByCity(cityByUrl)
        }
        resultWeatherInCity();
    }, [])
}


