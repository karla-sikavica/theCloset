import React, { useEffect, useState } from "react";
import axios from "axios";
import * as WiIcons from "react-icons/wi";

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
    <div className="weather-container">
      <div className="temperature-div">{weather?.temperature} °C</div>
      <div className="wind-div">💨 Vjetar: {weather?.windspeed} km/h</div>{" "}
      {/* ako je windspeed veci od nekog broja onda nek pise windy ako ne onda nek ne pise */}
      <div className="weather-icon-div">
        ako je suncano nek bude ikona <WiIcons.WiDaySunny />
        ako je kisa nek bude ikona <WiShowers />
        ....
      </div>
    </div>
  );
};

export default WeatherWidget;
