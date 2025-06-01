import React, { useEffect, useState } from "react";
import WeatherWidget from "./WatherWidget";

type Coords = {
  latitude: number;
  longitude: number;
};

const AutoLocationWeather: React.FC = () => {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCoords = localStorage.getItem("userCoords");

    if (savedCoords) {
      setCoords(JSON.parse(savedCoords));
      setLoading(false);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoords: Coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setCoords(newCoords);
          localStorage.setItem("userCoords", JSON.stringify(newCoords));
          setLoading(false);
        },
        (error) => {
          console.error("error getting your location", error);
          setLocationError("we couldn't get your location");
          setLoading(false);
        }
      );
    } else {
      setLocationError("your browser doesn't support geolocation");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>looking for your location</p>;
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
