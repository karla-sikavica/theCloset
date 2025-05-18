/* import React, { useEffect, useState } from "react";
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

  if (loading) return <p>Loading weather forecast</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="weather-container">
      <div className="temperature-div">{weather?.temperature} °C</div>
      <div className="wind-div">{weather?.windspeed} km/h</div>{" "}
       ako je windspeed veci od nekog broja onda nek pise windy ako ne onda nek ne pise 
      <div className="weather-icon-div">
        ako je suncano nek bude ikona <WiIcons.WiDaySunny />
        ako je kisa nek bude ikona <WiIcons.WiShowers />
        ....
      </div>
    </div>
  );
};

export default WeatherWidget;
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import * as WiIcons from "react-icons/wi";

type WeatherData = {
  temperature: number;
  windspeed: number;
  time: string;
  weathercode: number;
};

type Props = {
  latitude: number;
  longitude: number;
};

// Funkcija koja mapira weathercode u ikonicu
const getWeatherIcon = (code: number): React.ReactElement => {
  if ([0].includes(code)) return <WiIcons.WiDaySunny size={48} color="gold" />;
  if ([1, 2, 3].includes(code))
    return <WiIcons.WiDayCloudy size={48} color="gray" />;
  if ([45, 48].includes(code))
    return <WiIcons.WiFog size={48} color="lightgray" />;
  if ([51, 53, 55, 61, 63, 65].includes(code))
    return <WiIcons.WiRain size={48} color="blue" />;
  if ([66, 67, 71, 73, 75, 77].includes(code))
    return <WiIcons.WiSnow size={48} color="lightblue" />;
  if ([80, 81, 82].includes(code))
    return <WiIcons.WiShowers size={48} color="teal" />;
  if ([95, 96, 99].includes(code))
    return <WiIcons.WiThunderstorm size={48} color="purple" />;

  return <WiIcons.WiNa size={48} color="gray" />;
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
          weathercode: current.weathercode,
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

  if (loading) return <p>Loading weather forecast...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="weather-container p-4 rounded-xl shadow-xl bg-white text-center space-y-2">
      <div className="temperature-div text-2xl font-semibold">
        {weather?.temperature} °C
      </div>

      <div className="wind-div text-md">
        {weather?.windspeed} km/h{" "}
        {weather?.windspeed && weather.windspeed > 30 && (
          <span className="text-blue-600 font-medium ml-2">Windy 💨</span>
        )}
      </div>

      <div className="weather-icon-div flex justify-center mt-2">
        {weather && getWeatherIcon(weather.weathercode)}
      </div>
    </div>
  );
};

export default WeatherWidget;
