import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Add.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const Add = () => {
  const [categories, setCategories] = useState<
    {
      id: number;
      name: string;
      subcategories: { id: number; name: string }[];
    }[]
  >([]);

  const [colors, setColors] = useState<{ id: number; name: string }[]>([]);

  const [outfit, setOutfit] = useState<{
    name: string;
    season: string;
    category: number | "";
    subcategory: number | "";
    brand: string;
    material: string;
    colors: { id: number; name: string }[]; // Explicitly define colors as an array of strings
    imageUrl: string;
    price: number;
  }>({
    name: "",
    season: "",
    category: "",
    subcategory: "",
    brand: "",
    material: "",
    colors: [],
    imageUrl: "",
    price: 0,
  });

  const [image, setImage] = useState<File | null>(null); // Updated state to hold File | null

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOutfit((prevOutfit) => ({
      ...prevOutfit,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Safely get the file
    if (file) {
      setImage(file); // Update the image state
    }
  };

  /*   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Pretpostavljam da postoji API endpoint za slanje podataka
    const formData = new FormData();
    formData.append("name", outfit.name);
    formData.append("season", outfit.season);
    formData.append("category", outfit.category);
    formData.append("subcategory", outfit.subcategory);
    formData.append("brand", outfit.brand);
    formData.append("material", outfit.material);
    formData.append("price", outfit.price.toString());
    formData.append("imageUrl", image ? image : ""); // Upload slike
    formData.append("colors", JSON.stringify(outfit.colors));

    try {
      const response = await axios.post(
        "http://localhost:8080/item",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Clothing item added!", response.data);
    } catch (error) {
      console.error("Error adding clothing item", error);
    }
  }; */

  useEffect(() => {
    // Dohvati boje sa backend-a
    const fetchColors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/colors"); // Endpoint za boje
        setColors(response.data); // Spremi boje u state
      } catch (error) {
        console.error("Error fetching colors", error);
      }
    };

    fetchColors();
  }, []);
  useEffect(() => {
    console.log(colors); // Ovo će logovati ažurirani state
  }, [colors]); // Zavisi od `colors`, pa se poziva svaki put kad se `colors` ažurira

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColorIds = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );

    // Pretpostavljamo da boje imaju id i name
    const selectedColors = selectedColorIds
      .map((id) => {
        const color = colors.find((color) => color.id === id); // Pretraga boje po id-u
        return color ? { id: color.id, name: color.name } : null; // Uveri se da je pronađena
      })
      .filter(Boolean); // Filter da ukloniš null vrednosti ako boja nije pronađena

    setOutfit((prevOutfit) => ({
      ...prevOutfit,
      colors: selectedColors as { id: number; name: string }[], // Ažuriranje boja
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image!");
      return;
    }

    try {
      // 1. Upload image to Firebase Storage
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      // 2. Get the image URL from Firebase
      const downloadURL = await getDownloadURL(storageRef);
      console.log("download url: ", downloadURL);
      // 3. Prepare data to send to backend (imageUrl is now Firebase link)
      const formData = {
        ...outfit,
        imageUrl: downloadURL,
        category: { id: Number(outfit.category) },
        subcategory: { id: Number(outfit.subcategory) },
        colors: outfit.colors.map((color) => ({ name: color.trim() })),
      };

      console.log("formdata: ", formData);

      // 4. Send to backend (normal JSON POST, jer nema više fajlova)
      const response = await axios.post("http://localhost:8080/item", formData);
      console.log("Clothing item added!", response.data);
    } catch (error) {
      console.error("Error uploading image or sending data", error);
    }
  };

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

  const selectedCategory = categories.find((cat) => cat.id === outfit.category);

  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  return (
    <div className="AddContainer">
      <div className="titleContainer">
        <h1 className="title">add a new clothing item</h1>
      </div>

      <div className="formTypeContainer">
        <p>clothing item details</p>
      </div>

      <form className="formContainer" onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="item name"
          value={outfit.name}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          id="season"
          placeholder="season"
          name="season"
          value={outfit.season}
          onChange={handleInputChange}
          required
        />

        {/* <select
          id="category"
          name="category"
          value={outfit.category}
          onChange={(e) => {
            setOutfit({
              ...outfit,
              category: e.target.value,
              subcategory: "",
            });
          }}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select> */}
        <select
          id="category"
          name="category"
          value={outfit.category}
          onChange={(e) => {
            const selectedId = parseInt(e.target.value); // convert string to number
            setOutfit({
              ...outfit,
              category: selectedId,
              subcategory: "",
            });
          }}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          id="subcategory"
          name="subcategory"
          value={outfit.subcategory}
          onChange={(e) => {
            setOutfit((prev) => ({
              ...prev,
              subcategory: parseInt(e.target.value),
            }));
          }}
          required
        >
          <option value="">Select a subcategory</option>
          {subcategories.map((subcat) => (
            <option key={subcat.id} value={subcat.id}>
              {subcat.name}
            </option>
          ))}
        </select>

        {/* <select
          id="subcategory"
          name="subcategory"
          value={outfit.subcategory}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a subcategory</option>
          {subcategories.map((subcat) => (
            <option key={subcat.id} value={subcat.name}>
              {subcat.name}
            </option>
          ))}
        </select> */}

        <input
          type="text"
          id="brand"
          name="brand"
          placeholder="brand"
          value={outfit.brand}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          id="material"
          name="material"
          placeholder="material"
          value={outfit.material}
          onChange={handleInputChange}
          required
        />

        <input
          type="number"
          id="price"
          name="price"
          placeholder="price"
          value={outfit.price}
          onChange={handleInputChange}
          required
        />
        <select
          id="colors"
          name="colors"
          value={outfit.colors}
          onChange={handleColorChange}
          multiple
        >
          <option value="">Select colors</option>
          {colors.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          id="imageUrl"
          placeholder="choose an image"
          onChange={handleImageChange}
          required
        />

        {/* Submit Button */}
        <button type="submit" className="submitButton">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Add;
