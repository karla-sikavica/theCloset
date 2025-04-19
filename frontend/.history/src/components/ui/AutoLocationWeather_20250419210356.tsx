import React, { useEffect, useState } from "react";
import WeatherWidget from "./WeatherWidget";

type Coords = {
  latitude: number;
  longitude: number;
};

const AutoLocationWeather: React.FC = () => {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Greška pri dohvaćanju lokacije:", error);
          setLocationError("Nismo mogli dohvatiti tvoju lokaciju 😢");
          setLoading(false);
        }
      );
    } else {
      setLocationError("Tvoj browser ne podržava geolokaciju 😕");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>📍 Tražimo tvoju lokaciju...</p>;
  }

  if (locationError) {
    return <p className="text-red-500">{locationError}</p>;
  }

  if (coords) {
    return (
      <WeatherWidget latitude={coords.latitude} longitude={coords.longitude} />
    );
  }

  return null;
};

export default AutoLocationWeather;
