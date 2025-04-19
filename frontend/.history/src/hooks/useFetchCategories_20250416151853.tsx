import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<
    {
      id: number;
      name: string;
      subcategories: { id: number; name: string }[];
    }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  return categories;
};
