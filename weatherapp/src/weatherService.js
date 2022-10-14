export const getWeather = async (paramCoord) => {

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${paramCoord}&hourly=temperature_2m&current_weather=true`)
        const getDataWeather = await response.json()
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const day = 24
        const today = 12
        const tomorrow = today + day
        const afterTomorrow = tomorrow + day
        const after2day = afterTomorrow + day
        return [
            {
                weatherCity: await getNameByCity(paramCoord),
                weatherNow: Math.round(getDataWeather.current_weather.temperature),
                weatherTomorrow: Math.round(getDataWeather.hourly.temperature_2m[tomorrow]),
                weatherAfterTomorrow: Math.round(getDataWeather.hourly.temperature_2m[afterTomorrow]),
                weatherAfter2Day: Math.round(getDataWeather.hourly.temperature_2m[after2day])
            }
        ]

    } catch (error) {
        alert(error)
    }

}

//Получить координаты по названию города
export const getCoordsByCity = async (nameCity) => {
    if (nameCity === '') return
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${nameCity}`)
        const dataNameByCoords = await response.json()
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        //Координаты города 
        return `latitude=${await dataNameByCoords.results[0].latitude}&longitude=${await dataNameByCoords.results[0].longitude}`
    } catch (error) {
        alert(error)
    }


}

//Получить название города по координатам
export const getNameByCity = async (paramCoord) => {
    if (!paramCoord) return ''
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${paramCoord}&localityLanguage=en`)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const dataCity = await response.json();
        return dataCity.city
    } catch (error) {
        alert(error)
    }

}

//Почасовой прогноз
export const getHourlyWeather = async (coordCity) => {
    if (!coordCity) return []
    try {

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${coordCity}&hourly=temperature_2m&current_weather=true`)
        const getDataHourlyWeather = await response.json()
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        let dataHourlyWeather = []

            for (let i = 0; i < 24; i++) {
                dataHourlyWeather.push({
                    hour: i < 10 ? '0' + i + ':00' : i + ':00',
                    weather: getDataHourlyWeather.hourly.temperature_2m[i]
                })
            }

            return dataHourlyWeather;
    } catch (error) {
        alert(error)
    }

}

//Прогноз на 10 дней
export const getWeatherDay = async (coordCity) => {
    if (!coordCity) return []
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${coordCity}&hourly=temperature_2m&current_weather=true`)
        const getDataWeather = await response.json()

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
    
        let dataDayWeather = []
        const stepDay = 24
        let stateDay = 12
    
        for (let i = 0; i < 7; i++) {
            stateDay === 12 ? dataDayWeather.push({ key: i, weather: getDataWeather.hourly.temperature_2m[stateDay] }) :
                dataDayWeather.push({
                    key: i,
                    weather: getDataWeather.hourly.temperature_2m[stateDay]
                })
            stateDay += stepDay
    
        }
        return dataDayWeather
    } catch(error) {
        alert(error)
    }
}