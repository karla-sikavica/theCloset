import React, { useState } from "react";
import axios from "axios"; // Koristićemo axios za slanje podataka na backend

const Add = () => {
  const [outfit, setOutfit] = useState<{
    name: string;
    season: string;
    category: string;
    subcategory: string;
    brand: string;
    material: string;
    colors: string[]; // Explicitly define colors as an array of strings
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

  // Handle subcategory dynamically based on the selected category
  const getSubcategories = () => {
    switch (outfit.category) {
      case "tops":
        return ["T-Shirt", "Shirt", "Blouse"];
      case "bottoms":
        return ["Jeans", "Shorts", "Skirt"];
      case "outerwear":
        return ["Jacket", "Coat", "Blazer"];
      case "accessories":
        return ["Hat", "Scarf", "Gloves"];
      default:
        return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      const response = await axios.post("YOUR_BACKEND_API_URL_HERE", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Clothing item added!", response.data);
    } catch (error) {
      console.error("Error adding clothing item", error);
    }
  };

  return (
    <div className="AddContainer">
      <div className="titleContainer">
        <h1 className="title">Add a new clothing item</h1>
      </div>

      <div className="formTypeContainer">
        <p>Clothing item details</p>
      </div>

      <form className="formContainer" onSubmit={handleSubmit}>
        {/* Name input */}
        <label htmlFor="name">Item Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={outfit.name}
          onChange={handleInputChange}
          required
        />

        {/* Season input */}
        <label htmlFor="season">Season</label>
        <input
          type="text"
          id="season"
          name="season"
          value={outfit.season}
          onChange={handleInputChange}
          required
        />

        {/* Category input */}
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={outfit.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a category</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="outerwear">Outerwear</option>
          <option value="accessories">Accessories</option>
        </select>

        {/* Subcategory input */}
        <label htmlFor="subcategory">Subcategory</label>
        <select
          id="subcategory"
          name="subcategory"
          value={outfit.subcategory}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a subcategory</option>
          {getSubcategories().map((sub, index) => (
            <option key={index} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        {/* Brand input */}
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={outfit.brand}
          onChange={handleInputChange}
          required
        />

        {/* Material input */}
        <label htmlFor="material">Material</label>
        <input
          type="text"
          id="material"
          name="material"
          value={outfit.material}
          onChange={handleInputChange}
          required
        />

        {/* Price input */}
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={outfit.price}
          onChange={handleInputChange}
          required
        />

        {/* Colors input */}
        <label htmlFor="colors">Colors</label>
        <input
          type="text"
          id="colors"
          name="colors"
          value={outfit.colors.join(", ")}
          onChange={(e) => {
            const colors = e.target.value
              .split(",")
              .map((color) => color.trim());
            setOutfit((prevOutfit) => ({
              ...prevOutfit,
              colors,
            }));
          }}
        />

        {/* Image Upload */}
        <label htmlFor="imageUrl">Image</label>
        <input
          type="file"
          id="imageUrl"
          onChange={handleImageChange}
          required
        />

        {/* Submit Button */}
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default Add;
