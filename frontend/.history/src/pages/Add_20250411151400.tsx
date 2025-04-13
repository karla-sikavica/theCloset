import React, { useState } from "react";
import axios from "axios"; // Koristićemo axios za slanje podataka na backend

const Add = () => {
  // State za formu
  const [outfit, setOutfit] = useState<{
    name: string;
    season: string;
    category: string;
    subcategory: string;
    colors: string[]; // Explicitly define colors as an array of strings
    imageUrl: string;
    price: number;
  }>({
    name: "",
    season: "",
    category: "",
    subcategory: "",
    colors: [],
    imageUrl: "",
    price: 0,
  });

  const [image, setImage] = useState<File | null>(null); // Updated state to hold File | null

  // Funkcija koja ažurira state kada korisnik unese podatke
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOutfit((prevOutfit) => ({
      ...prevOutfit,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Safely get the file
    if (file) {
      setImage(file); // Update the image state
    }
  };

  // Funkcija koja šalje formu na backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Pretpostavljam da postoji API endpoint za slanje podataka
    const formData = new FormData();
    formData.append("name", outfit.name);
    formData.append("season", outfit.season);
    formData.append("category", outfit.category);
    formData.append("subcategory", outfit.subcategory);
    formData.append("price", outfit.price.toString());
    formData.append("imageUrl", image ? image : ""); // Upload slike
    formData.append("colors", JSON.stringify(outfit.colors));

    try {
      const response = await axios.post("YOUR_BACKEND_API_URL_HERE", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Outfit added!", response.data);
    } catch (error) {
      console.error("Error adding outfit", error);
    }
  };

  return (
    <div className="AddContainer">
      <div className="titleContainer">
        <h1 className="title">Add a new item</h1>
      </div>

      <div className="formTypeContainer">
        <p>Clothing item or outfit</p>
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

        {/* Category and Subcategory */}
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

        <label htmlFor="subcategory">Subcategory</label>
        <select
          id="subcategory"
          name="subcategory"
          value={outfit.subcategory}
          onChange={handleInputChange}
        >
          <option value="">Select a subcategory</option>
          {/* Add more subcategories based on the category */}
        </select>

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

        {/* Colors input (example, could be multiple) */}
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
        <button type="submit">Add Outfit</button>
      </form>
    </div>
  );
};

export default Add;
