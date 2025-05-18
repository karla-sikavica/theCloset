import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Add.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import ColorPicker from "../components/ui/ColorPicker";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEraseBg } from "../hooks/useEraseBg";

const Add = () => {
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewBgRemoved, setPreviewBgRemoved] = useState<string | null>(null);

  const [clothingItem, setclothingItem] = useState<{
    name: string;
    season: string;
    category: number | "";
    subcategory: number | "";
    size: string;
    brand: string;
    material: string;
    colors: { id: number; name: string }[]; // Explicitly define colors as an array of strings { id: number; name: string }
    imageUrl: string;
    price: string;
    gift: boolean;
    no_of_wears: number;
    date_acquired: string; // Use ISO 8601 format for date (e.g., "2025-04-12")
  }>({
    name: "",
    season: "",
    category: "",
    subcategory: "",
    size: "",
    brand: "",
    material: "",
    colors: [],
    imageUrl: "",
    price: "0",
    gift: false,
    no_of_wears: 0,
    date_acquired: "",
  });

  const [image, setImage] = useState<File | null>(null); // Updated state to hold File | null
  const categories = useFetchCategories();
  const user = useCurrentUser();
  const [colors, setColors] = useState<{ id: number; name: string }[]>([]);
  /*   const { removeBackground, isProcessing } = useEraseBg();
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setclothingItem((prevclothingItem) => ({
      ...prevclothingItem,
      [name]: value,
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
        ...clothingItem,
        imageUrl: downloadURL,
        category: { id: Number(clothingItem.category) },
        subcategory: { id: Number(clothingItem.subcategory) },
        colors: clothingItem.colors.map((color) => ({
          name: color.name.trim(),
        })),
        user,
      };

      console.log("formdata: ", formData);

      // 4. Send to backend (normal JSON POST, jer nema više fajlova)
      const response = await axios.post("http://localhost:8080/item", formData);
      console.log("Clothing item added!", response.data);
    } catch (error) {
      console.error("Error uploading image or sending data", error);
    }
  };

  /* const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image!");
      return;
    }

    try {
      // 🧼 1. Remove background using Erase.bg
      const bgRemovedBlob = await removeBackground(image);

      if (!bgRemovedBlob) {
        alert("Background removal failed!");
        return;
      }
      const objectURL = URL.createObjectURL(bgRemovedBlob);
      setPreviewBgRemoved(objectURL);

      // 📦 2. Convert blob to Firebase-compatible File
      const fileWithoutBg = new File([bgRemovedBlob], image.name, {
        type: "image/png",
      });

      // 🔥 3. Upload to Firebase Storage
      const storageRef = ref(storage, `images/${fileWithoutBg.name}`);
      await uploadBytes(storageRef, fileWithoutBg);

      // 🔗 4. Get Firebase image URL
      const downloadURL = await getDownloadURL(storageRef);

      // 📬 5. Prepare and send form data
      const formData = {
        ...clothingItem,
        imageUrl: downloadURL,
        category: { id: Number(clothingItem.category) },
        subcategory: { id: Number(clothingItem.subcategory) },
        colors: clothingItem.colors.map((color) => ({
          name: color.name.trim(),
        })),
        user,
      };

      const response = await axios.post("http://localhost:8080/item", formData);
      console.log("Clothing item added!", response.data);
    } catch (error) {
      console.error("Error uploading image or sending data", error);
    }
  }; */

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };
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

  const selectedCategory = categories.find(
    (cat) => cat.id === clothingItem.category
  );

  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  return (
    <div className="AddContainer" onSubmit={handleSubmit}>
      <form className="formContainer">
        <div className="image-input-div">
          <div className="file-upload-wrapper">
            <label htmlFor="imageUrl" className="file-upload-label">
              {previewUrl ? (
                <img
                  src={previewBgRemoved || previewUrl}
                  alt="Preview"
                  className="preview-img"
                />
              ) : (
                <>📸 Click to add an image</>
              )}
            </label>
            <input
              type="file"
              id="imageUrl"
              onChange={handleImageChange}
              required
              className="hidden-file-input"
            />
          </div>
        </div>
        <div className="form-div">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="item name"
            value={clothingItem.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            id="brand"
            name="brand"
            placeholder="brand"
            value={clothingItem.brand}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            id="material"
            name="material"
            placeholder="material"
            value={clothingItem.material}
            onChange={handleInputChange}
            required
          />
          <div className="price-input-wrapper">
            <input
              type="text"
              id="price"
              name="price"
              placeholder="price"
              value={clothingItem.price}
              onChange={handleInputChange}
              required
            />
            <span className="euro-symbol">€</span>
          </div>
          <input
            type="number"
            id="no_of_wears"
            name="no_of_wears"
            placeholder="times worn"
            value={clothingItem.no_of_wears}
            onChange={(e) =>
              setclothingItem((prev) => ({
                ...prev,
                no_of_wears: parseInt(e.target.value, 10),
              }))
            }
            min="0"
            className="number-input"
          />
          <input
            type="date"
            id="date_acquired"
            name="date_acquired"
            value={clothingItem.date_acquired}
            onChange={handleInputChange}
            className="date-input"
          />
          <select
            id="category"
            name="category"
            value={clothingItem.category}
            onChange={(e) => {
              const selectedId = parseInt(e.target.value);
              setclothingItem({
                ...clothingItem,
                category: selectedId,
                subcategory: "",
              });
            }}
            required
          >
            <option value="">category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            id="subcategory"
            name="subcategory"
            value={clothingItem.subcategory}
            onChange={(e) => {
              setclothingItem((prev) => ({
                ...prev,
                subcategory: parseInt(e.target.value),
              }));
            }}
            required
          >
            <option value="">subcategory</option>
            {subcategories.map((subcat) => (
              <option key={subcat.id} value={subcat.id}>
                {subcat.name}
              </option>
            ))}
          </select>
          <select
            id="season"
            name="season"
            value={clothingItem.season}
            onChange={handleInputChange}
          >
            <option value="">season</option>
            <option>spring</option>
            <option>summer</option>
            <option>autumn</option>
            <option>winter</option>
          </select>
          <select
            id="size"
            name="size"
            onChange={handleInputChange}
            value={clothingItem.size}
          >
            <option value="">size</option>

            {/* Clothing sizes */}
            <option value="xxs">xxs</option>
            <option value="xs">xs</option>
            <option value="s">s</option>
            <option value="m">m</option>
            <option value="l">l</option>
            <option value="xl">xl</option>
            <option value="xxl">xxl</option>
            <option value="xxxl">xxxl</option>
            <option value="one size">one size</option>
            <option value="tall">tall</option>
            <option value="petite">petite</option>
            <option value="plus">plus</option>
            <option value="slim fit">slim fit</option>
            <option value="regular fit">regular fit</option>
            <option value="oversized">oversized</option>

            {/* EU Shoe Sizes */}
            <option value="34">34</option>
            <option value="35">35</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="45">45</option>
            <option value="46">46</option>

            {/* US Sizes */}
            <option value="us 4">us 4</option>
            <option value="us 5">us 5</option>
            <option value="us 6">us 6</option>
            <option value="us 7">us 7</option>
            <option value="us 8">us 8</option>
            <option value="us 9">us 9</option>
            <option value="us 10">us 10</option>
            <option value="us 11">us 11</option>
            <option value="us 12">us 12</option>

            {/* UK Sizes */}
            <option value="uk 4">uk 4</option>
            <option value="uk 5">uk 5</option>
            <option value="uk 6">uk 6</option>
            <option value="uk 7">uk 7</option>
            <option value="uk 8">uk 8</option>
            <option value="uk 9">uk 9</option>
            <option value="uk 10">uk 10</option>

            {/* Numeric Clothing Sizes */}
            <option value="32">32</option>
            <option value="34">34</option>
            <option value="36">36</option>
            <option value="38">38</option>
            <option value="40">40</option>
            <option value="42">42</option>
            <option value="44">44</option>
            <option value="46">46</option>
          </select>
          <label className="checkbox-label">
            <input
              type="checkbox"
              id="gift"
              name="gift"
              checked={clothingItem.gift}
              onChange={(e) =>
                setclothingItem((prev) => ({
                  ...prev,
                  gift: e.target.checked,
                }))
              }
            />
            was this a gift? 🎁
          </label>
          <button
            type="button"
            className="toggleColorsButton"
            onClick={() => setShowColorOptions((prev) => !prev)}
          >
            colors
          </button>
          {/*           {showColorOptions && <ColorPicker />}
           */}
          {showColorOptions && (
            <div className="color-options-container">
              {colors.map((color) => {
                const isSelected = clothingItem.colors.some(
                  (c) => c.id === color.id
                );
                return (
                  <label
                    key={color.id}
                    className={`color-option ${isSelected ? "selected" : ""}`}
                  >
                    <input
                      type="checkbox"
                      value={color.id}
                      checked={isSelected}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setclothingItem((prev: any) => {
                          let updatedColors;
                          if (isChecked) {
                            updatedColors = [...prev.colors, color];
                          } else {
                            updatedColors = prev.colors.filter(
                              (c: any) => c.id !== color.id
                            );
                          }
                          return {
                            ...prev,
                            colors: updatedColors,
                          };
                        });
                      }}
                    />
                    <span
                      className="color-square"
                      style={{ backgroundColor: color.name.toLowerCase() }}
                    ></span>
                    {color.name}
                  </label>
                );
              })}
            </div>
          )}{" "}
          <button type="submit" className="submitButton" onClick={handleSubmit}>
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
