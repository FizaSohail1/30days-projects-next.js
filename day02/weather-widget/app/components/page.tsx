'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import { FaThermometerHalf, FaCloud } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface WeatherData {
    temperature: number;
    description: string;
    location: string;
    unit: string;
}

function WeatherWidget(){

    const[location,setlocation] = useState<string>("");
    const[weather,setWeather] = useState<WeatherData | null>(null);
    const[isLoading,setIsLoading] = useState<boolean>(false);
    const[error,setError] = useState<string |null>(null)

   const handleSearch = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedLocation = location.trim()
        if(trimmedLocation === ""){
          setError('Please enter a valid location')
          setWeather(null)
        } 
        setIsLoading(true)
        setError(null);
    try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedLocation}`)
        if(!response){
           throw new Error('City not found')
        }
        const data = await response.json();
        const weatherData:WeatherData = {
           temperature: data.current.temp_c,
           description:data.current.condition.text,
           location:data.location.name,
           unit:'C'
        }
        setWeather(weatherData);    
    }
    catch{
        setError('City not found! Please try again.')
        setWeather(null)
    }
    finally{
        setIsLoading(false)
    }
};
function getTemperatureMessage(temperature: number, unit: string): string {
    if (unit === "C") {
        if (temperature < 0) {
            return `Brr! It's below freezing at ${temperature}°C. Stay indoors if possible.`;
        } 
        else if (temperature < 10) {
            return `Chilly at ${temperature}°C. A heavy coat might be needed.`;
        } 
        else if (temperature < 20) {
            return `Moderate weather at ${temperature}°C. A sweater should suffice.`;
        } 
        else if (temperature < 30) {
            return `Comfortable at ${temperature}°C. Perfect weather for outdoor activities!`;
        } 
        else {
            return `It's a hot ${temperature}°C. Stay cool and drink lots of water!`;
        }
    } else {
        return `${temperature}°${unit} - Stay aware of the weather!`;
    }
};
function getWeatherMessage(description: string): string {
    const lowerCaseDescription = description.toLowerCase();

    if (lowerCaseDescription === "sunny") {
        return "It's a bright and sunny day! Perfect for outdoor plans.";
    } 
    else if (lowerCaseDescription === "partly cloudy") {
        return "There are some clouds, but you'll still see the sun.";
    } 
    else if (lowerCaseDescription === "cloudy") {
        return "It's a cloudy day. You might not see much sun.";
    } 
    else if (lowerCaseDescription === "overcast") {
        return "The sky is fully overcast, no sunshine today.";
    } 
    else if (lowerCaseDescription === "rain") {
        return "It's raining. Don't forget your umbrella!";
    } 
    else if (lowerCaseDescription === "thunderstorm") {
        return "Thunderstorms are in the forecast. Stay safe indoors.";
    } 
    else if (lowerCaseDescription === "snow") {
        return "It's snowing. Time to enjoy the snow or stay warm!";
    } 
    else if (lowerCaseDescription === "mist") {
        return "Misty conditions ahead. Visibility might be low.";
    } 
    else if (lowerCaseDescription === "fog") {
        return "It's foggy out there. Drive carefully.";
    } 
    else {
        return description;
    }
};
function getLocationMessage(location: string): string {
    const currentHour = new Date().getHours();
    const isNight = currentHour >= 18 || currentHour < 6;
    return `${location} ${isNight ? "at Night" : "During the Day"}`;
}
return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-700">
    <div className="w-full max-w-lg mx-auto text-center bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Weather Widget</h1>
        <h3 className="text-gray-600 mb-4">Find out the latest weather updates for your location.</h3>
        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
            <input type="text" placeholder="Enter a city name" value={location} onChange={(e: ChangeEvent<HTMLInputElement>) => setlocation(e.target.value)} 
            className="flex-1 p-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button type="submit" disabled={isLoading} className={`px-4 py-2 rounded-lg text-white ${isLoading ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'}`}>{isLoading ? "Loading..." : "Search"}</button>
        </form>
        {error && <div className="mt-4 text-red-500">{error}</div>}
        {weather && (
            <div className="mt-4 grid gap-4">
                <div className="flex items-center gap-2 text-gray-800 text-lg">
                    <FaThermometerHalf  className="text-2xl text-orange-600" />
                    {getTemperatureMessage(weather.temperature, weather.unit)}
                </div>
                <div className="flex items-center gap-2 text-gray-800 text-lg">
                    <FaCloud className="text-2xl text-blue-600" />
                    <div>{getWeatherMessage(weather.description)}</div>
                </div>
                <div className="flex items-center gap-2 text-gray-800 text-lg">
                    <FaLocationDot className="text-2xl text-red-600" />
                    <div>{getLocationMessage(weather.location)}</div>
                </div>
            </div>
        )}
    </div>
</div>

);

}
export default WeatherWidget;
