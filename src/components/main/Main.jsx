import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getWeather, getCoordsByCity } from "../../weatherService";
import './main.css'

const enumAllowedCityes = ['Minsk', 'Moscow', 'Bratislava']

export const Main = () => {

    const [thisCityWeather, setThisCityWeather] = useState([])
    const [urlInside, setUrlInside] = useState('/Minsk')
    const location = useLocation();

    useEffect(() => {

        const cityByUrl = window.location.pathname.replace('/', '');
        if (!enumAllowedCityes.includes(cityByUrl)) {
            //Определил геолокацию 
            navigator.geolocation.getCurrentPosition(async (position) => {
                setThisCityWeather(await getWeather(`latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`))
            }, async () => {

                setThisCityWeather(await getWeather(await getCoordsByCity('Minsk')))
            })

        } else {
            //Определил геолокацию из города в URL
            const awaitForCity = async () => {
                setThisCityWeather(await getWeather(await getCoordsByCity(cityByUrl)))
            }
            awaitForCity();
        }
    }, [])

    
    useEffect(() => {
        setUrlInside(location.pathname === '/' ? '/Minsk' : location.pathname )
    }, [location])



    const clickCityButton = async (city) => {
        setThisCityWeather(await getWeather(await getCoordsByCity(city)))
    }

    return (
        <div className="weather-main">
            <Link to={'/in' + urlInside}>Внутренняя страница</Link>
            <div className="change-city">
                <p>Выбирете город:</p>
                <Link to='/Minsk'><button onClick={() => { clickCityButton('Minsk') }} className="getCity">Minsk</button></Link>
                <Link to='/Moscow'><button onClick={() => { clickCityButton('Moscow') }} className="getCity">Moscow</button></Link>
                <Link to='/Bratislava'><button onClick={() => { clickCityButton('Bratislava') }} className="getCity">Bratislava</button></Link>
            </div>
            {thisCityWeather.length > 0 ?
                (
                    <div className="data-weather">
                        <div>Город: <span className="weatherCity">{thisCityWeather[0].weatherCity}</span></div>
                        <div className="weater-days">
                            <div>Температура сейчас: <span className="weatherNow">{thisCityWeather[0].weatherNow}°C</span></div>
                            <div>Температура завтра: <span className="weatherTomorrow">{thisCityWeather[0].weatherTomorrow}°C</span></div>
                            <div>Температура послезавтра: <span className="weatherAfterTomorrow">{thisCityWeather[0].weatherAfterTomorrow}°C</span></div>
                            <div>Температура через 2 дня: <span className="weatherAfter2Day">{thisCityWeather[0].weatherAfter2Day}°C</span></div>
                        </div>
                    </div>
                ) : ('loading...')
            }
        </div>
    )
}
