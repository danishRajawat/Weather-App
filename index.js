let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather_temperature");
let w_icon = document.querySelector(".weather_icon")
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_feelsLike = document.querySelector(".weather_feelsLike")
let w_humidity = document.querySelector(".weather_humidity")
let w_wind = document.querySelector(".weather_wind")
let w_pressure = document.querySelector(".weather_pressure")



const getRegionName = (countryCode) => {
    return new Intl.DisplayNames([countryCode], { type: "region" }).of(countryCode)
}
const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000)

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(curDate)
    return formattedDate
}

let w_city = "sikar"

 const getCity = (e) =>{
e.preventDefault()
 w_city = document.querySelector(".city-name").value

 getWeatherData(w_city)
 document.querySelector(".city-name").value = ""
 }


const getWeatherData = async (w_city) => {
    

    document.querySelector(".weather_search").addEventListener("submit" , (e) => { getCity(e) } )

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${w_city}&appid=5f716f398fecc985cd5c85387920550c`;


   

    try {
        const res = await fetch(weatherURL);
        const data = await res.json();

        const { main, name, weather, wind, sys, dt } = data
        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`

        cityName.innerHTML = `${name}, ${getRegionName(sys.country)} `
        dateTime.innerHTML = getDateTime(dt)
        w_temperature.innerHTML = `${main.temp}&#176`
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;
        w_feelsLike.innerHTML = `${main.feels_like.toFixed()}&#176`
        w_humidity.innerHTML = `${main.humidity}%`
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`
    } catch (error) {
        console.log("ERROR", error);

    }

}


document.body.addEventListener("load", getWeatherData(w_city))
// document.querySelector(".weather_search").addEventListener("submit" , (e) => { 
//  getCity(e)
//  })