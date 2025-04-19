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
    const savedCoords = localStorage.getItem("userCoords");

    if (savedCoords) {
      // 💾 Ako postoji spremljena lokacija, koristi je odmah
      setCoords(JSON.parse(savedCoords));
      setLoading(false);
    } else if ("geolocation" in navigator) {
      // 📍 Ako nema, pokušaj dohvatiti novu
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoords: Coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setCoords(newCoords);
          localStorage.setItem("userCoords", JSON.stringify(newCoords)); // ✅ spremi u localStorage
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
