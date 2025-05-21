// hooks/useFetchOutfits.ts
import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchOutfits = (userId?: number) => {
  const [outfits, setOutfits] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/outfits/users/${userId}`
        );
        setOutfits(response.data);
      } catch (error) {
        console.error("Error fetching outfits", error);
      }
    };

    fetch();
  }, [userId]);

  return outfits;
};
