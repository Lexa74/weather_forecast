export const getWeather = async (paramCoord) => {

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${paramCoord}&hourly=temperature_2m&current_weather=true`)
    const getDataWeather = await response.json()

    return [
        {
            weatherCity: await getNameByCity(paramCoord),
            weatherNow: Math.round(getDataWeather.current_weather.temperature),
            weatherTomorrow: Math.round(getDataWeather.hourly.temperature_2m[36]),
            weatherAfterTomorrow: Math.round(getDataWeather.hourly.temperature_2m[50]),
            weatherAfter2Day: Math.round(getDataWeather.hourly.temperature_2m[74])
        }
    ]
}

//Получить координаты по названию города
export const getCoordsByCity = async (nameCity) => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${nameCity}`)
    const dataNameByCoords = await response.json()
    //Координаты города 
    return [`latitude=${await dataNameByCoords.results[0].latitude}&longitude=${await dataNameByCoords.results[0].longitude}`]
}

//Получить название города по координатам
export const getNameByCity = async (paramCoord) => {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${paramCoord}&localityLanguage=en`)
    const dataCity = await response.json();
    return await dataCity.city
}