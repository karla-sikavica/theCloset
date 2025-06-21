import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchColors = () => {
  const [colors, setColors] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/colors`
        );
        setColors(response.data);
      } catch (error) {
        console.error("Error fetching colors", error);
      }
    };

    fetchColors();
  }, []);

  return colors;
};
