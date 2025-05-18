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
import "../css/WeatherWidget.css";

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
  if ([0].includes(code)) return <WiIcons.WiDaySunny color="#f0ebd8" />;
  if ([1, 2, 3].includes(code)) return <WiIcons.WiDayCloudy color="#f0ebd8" />;
  if ([45, 48].includes(code)) return <WiIcons.WiFog color="#f0ebd8" />;
  if ([51, 53, 55, 61, 63, 65].includes(code))
    return <WiIcons.WiRain color="#f0ebd8" />;
  if ([66, 67, 71, 73, 75, 77].includes(code))
    return <WiIcons.WiSnow color="#f0ebd8" />;
  if ([80, 81, 82].includes(code)) return <WiIcons.WiShowers color="#f0ebd8" />;
  if ([95, 96, 99].includes(code))
    return <WiIcons.WiThunderstorm color="#f0ebd8" />;

  return <WiIcons.WiNa color="#f0ebd8" />;
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
    <div className="weather-container">
      <div className="weather-icon-div">
        {weather && getWeatherIcon(weather.weathercode)}
      </div>
      <div className="temperature-div"> {weather?.temperature}°C</div>

      {/* <div className="wind-div text-md">
        {weather?.windspeed} km/h{" "}
        {weather?.windspeed && weather.windspeed > 30 && (
          <span className="text-blue-600 font-medium ml-2">windy</span>
        )}
      </div> */}
    </div>
  );
};

export default WeatherWidget;
