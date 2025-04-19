import React, { useEffect, useState } from "react";
import axios from "axios";

type WeatherData = {
  temperature: number;
  windspeed: number;
  time: string;
};

type Props = {
  latitude: number;
  longitude: number;
};

const WeatherWidget: React.FC<Props> = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast`,
          {
            params: {
              latitude,
              longitude,
              current_weather: true,
            },
          }
        );

        const current = response.data.current_weather;
        const weatherData: WeatherData = {
          temperature: current.temperature,
          windspeed: current.windspeed,
          time: current.time,
        };

        setWeather(weatherData);
      } catch (err) {
        setError("Nešto je pošlo po zlu 😢");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  if (loading) return <p>Učitavanje vremenske prognoze... 🌤️</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 bg-blue-100 rounded-2xl shadow-md max-w-xs text-blue-900 font-medium">
      <h2 className="text-lg mb-2">🌍 Trenutno vrijeme</h2>
      <p>🌡️ Temperatura: {weather?.temperature}°C</p>
      <p>💨 Vjetar: {weather?.windspeed} km/h</p>
      <p>🕒 Vrijeme mjerenja: {new Date(weather!.time).toLocaleTimeString()}</p>
    </div>
  );
};

export default WeatherWidget;
