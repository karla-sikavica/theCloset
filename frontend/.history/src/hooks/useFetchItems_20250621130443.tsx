import { useEffect, useState } from "react";
import { ClothingItem } from "../types";

export const useFetchItems = (userId?: number) => {
  const [items, setItems] = useState<ClothingItem[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchItems = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}/items`
        );
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setItems(data);
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchItems();
  }, [userId]);

  return items;
};
