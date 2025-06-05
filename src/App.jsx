import React, { useEffect, useState } from "react"; 
import axios from "axios";

export default function WeatherApp() {
     const [weather, setWeather] = useState(null);
      const [forecast, setForecast] = useState([]);

useEffect(() => {
     const fetchWeather = async () => { 
        const key = "878e185941494036a48165547250406"; 
        const city = "Tashkent"; 
        const currentUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`; 
        const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3&aqi=no&alerts=no`;

try {
    const [currentRes, forecastRes] = await Promise.all([
      axios.get(currentUrl),
      axios.get(forecastUrl),
    ]);
    setWeather(currentRes.data);
    setForecast(forecastRes.data.forecast.forecastday);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};

fetchWeather();

}, []);

if (!weather) return <div className="text-white">Loading...</div>;

const current = weather.current; 
const location = weather.location;

return (
     <div className="min-h-screen bg-slate-900 text-white p-6">
         <div className="max-w-xl mx-auto bg-slate-800 p-6 rounded-2xl shadow-md">
             <div className="flex justify-between items-center"> 
                <div> 
                    <h1 className="text-2xl font-bold">{location.name}</h1> 
                    <p>{location.region}, {location.country}</p> 
                    <p className="text-4xl mt-2">{current.temp_c}°C</p> 
                    <p className="text-sm text-gray-400">Feels like {current.feelslike_c}°C</p> 
                    <p className="text-sm mt-1">{current.condition.text}</p> 
                    <p className="text-xs text-gray-400">{location.localtime}</p> 
                    </div> 
                    <img src={`https:${current.condition.icon}`} alt="weather icon" className="w-24 h-24" /> 
                    </div> 
                    <div className="grid grid-cols-2 gap-4 mt-6 text-sm"> 
                        <div><strong>Wind:</strong> {current.wind_kph} km/h</div> 
                        <div><strong>Humidity:</strong> {current.humidity}%</div> 
                        <div><strong>Pressure:</strong> {current.pressure_mb} mb</div> 
                        <div><strong>Visibility:</strong> {current.vis_km} km</div> 
                        </div>

<div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">3 kunlik prognoz</h2>
      <div className="grid grid-cols-1 gap-4">
        {forecast.map((day) => (
          <div
            key={day.date}
            className="flex items-center justify-between bg-slate-700 p-4 rounded-xl shadow"
          >
            <div>
              <p className="font-bold">{day.date}</p>
              <p className="text-sm">{day.day.condition.text}</p>
              <p className="text-sm text-gray-400">
                Max: {day.day.maxtemp_c}&deg;C / Min: {day.day.mintemp_c}&deg;C
              </p>
              <p className="text-sm text-blue-300">
                Rain chance: {day.day.daily_chance_of_rain}%
              </p>
            </div>
            <img
              src={`https:${day.day.condition.icon}`}
              alt="icon"
              className="w-16 h-16"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

); }
