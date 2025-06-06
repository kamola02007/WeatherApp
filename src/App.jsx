import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("Tashkent");
  const [inputCity, setInputCity] = useState("");
  const [theme, setTheme] = useState("dark");

  const Themes = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const Weather = async () => {
      const key = "878e185941494036a48165547250406";
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
        console.error("Xato:", error);
        setWeather(null);
        setForecast([]);
      }
    };

    if (city) Weather();
  }, [city]);

  if (!weather)
    return (
      <div
        className={` p-6 ${
          theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"
        }`}
      > 
      </div>
    );

  const current = weather.current;
  const location = weather.location;

  return (
    <div className={`${theme} `}>
      <div
        className={`p-6 ${theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
        
        <div className="flex justify-end mb-4">
          <button
            onClick={Themes} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded">{theme === "dark" ? "Light Mode" : "Dark Mode"}</button>
        </div>

        <div className="flex justify-center items-center gap-2 mb-6">
          <input
            className={`px-4 py-2 rounded border ${
              theme === "dark"
                ? "bg-slate-800 text-white border-slate-700"
                : "bg-gray-100 text-black border-gray-300"
            }`}
            type="text"
            placeholder="Shahar nomini yozing..."
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
            onClick={() => setCity(inputCity)}>Qidirish </button>
        </div>

      
        <div
          className={`max-w-xl mx-auto p-6 rounded-2xl shadow-md ${
            theme === "dark" ? "bg-slate-800" : "bg-gray-200 text-black"
          }`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{location.name}</h1>
              <p>{location.region}, {location.country}</p>
              <p className="text-4xl mt-2">{current.temp_c}°C</p>
              <p className={`text-sm ${ theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>  His qilinadi: {current.feelslike_c}°C</p>
              <p className="text-sm mt-1">{current.condition.text}</p>
              <p className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`} >{location.localtime} </p>
            </div>
            <img src={`https:${current.condition.icon}`} alt="weather icon"className="w-24 h-24" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
            <div>
              <strong>Shamol:</strong> {current.wind_kph} km/h
            </div>
            <div>
              <strong>Namlik:</strong> {current.humidity}%
            </div>
            <div>
              <strong>Bosim:</strong> {current.pressure_mb} mb
            </div>
            <div>
              <strong>Ko‘rinish:</strong> {current.vis_km} km
            </div>
          </div>

          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">3 kunlik ob-havo</h2>
            <div className="grid grid-cols-1 gap-4">
              {forecast.map((day) => (
                <div
                  key={day.date}
                  className={`flex items-center justify-between p-4 rounded-xl shadow ${
                    theme === "dark" ? "bg-slate-700" : "bg-white"
                  }`}
                >
                  <div>
                    <p className="font-bold">{day.date}</p>
                    <p className="text-sm">{day.day.condition.text}</p>
                    <p className="text-sm text-gray-400">
                      Max: {day.day.maxtemp_c}°C / Min: {day.day.mintemp_c}°C</p>
                    <p className="text-sm text-blue-500">
                      Yomgir ehtimoli: {day.day.daily_chance_of_rain}%</p>
                  </div>
                  <img src={`https:${day.day.condition.icon}`} alt="icon" className="w-16 h-16"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
