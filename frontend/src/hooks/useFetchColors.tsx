import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchColors = () => {
  const [colors, setColors] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/colors");
        setColors(response.data);
      } catch (error) {
        console.error("Error fetching colors", error);
      }
    };

    fetchColors();
  }, []);

  return colors;
};
