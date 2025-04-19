import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Add.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, storage } from "../firebase";
import { getAuth, getIdToken } from "firebase/auth";

const Add = () => {
  const [user, setUser] = useState();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

  /* const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Safely get the file
    if (file) {
      setImage(file);
    }
  }; */
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const auth = getAuth(app);
        const currentUser = auth.currentUser;

        if (currentUser) {
          const idToken = await getIdToken(currentUser);
          if (idToken) {
            const response = await fetch(
              "http://localhost:8080/users/current",
              {
                method: "GET",
                headers: { Authorization: `Bearer ${idToken}` },
              }
            );
            if (response.ok) {
              const data = await response.json();
              setUser(data);
            } else {
              console.error("Failed to fetch current user");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

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
    console.log(colors);
  }, [colors]);

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColorIds = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );

    const selectedColors = selectedColorIds
      .map((id) => colors.find((color) => color.id === id))
      .filter((c): c is { id: number; name: string } => Boolean(c));

    setOutfit((prevOutfit) => ({
      ...prevOutfit,
      colors: selectedColors,
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
        colors: outfit.colors.map((color) => ({ name: color.name.trim() })),
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const selectedCategory = categories.find((cat) => cat.id === outfit.category);

  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  return (
    <div className="AddContainer">
      <div className="titleContainer">
        <h1 className="title">add a new clothing item</h1>
      </div>

      <div className="formTypeContainer"></div>

      <form className="formContainer" onSubmit={handleSubmit}>
        <div className="image-input-div">
          <div className="file-upload-wrapper">
            <label htmlFor="imageUrl" className="file-upload-label">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="preview-img" />
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

          {/*  <div className="file-upload-wrapper">
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" className="preview-img" />
              </div>
            )}

            <label htmlFor="imageUrl" className="file-upload-label">
              📸 Choose an Image
            </label>
            <input
              type="file"
              id="imageUrl"
              onChange={handleImageChange}
              required
              className="hidden-file-input"
            />
          </div> */}
        </div>
        <div className="form-div">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="item name"
            value={outfit.name}
            onChange={handleInputChange}
            required
          />
          <select
            id="season"
            name="season"
            value={outfit.season}
            onChange={handleInputChange}
          >
            <option value="">season</option>
            <option>spring</option>
            <option>summer</option>
            <option>autumn</option>
            <option>winter</option>
          </select>
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
          <select
            id="category"
            name="category"
            value={outfit.category}
            onChange={(e) => {
              const selectedId = parseInt(e.target.value);
              setOutfit({
                ...outfit,
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
            value={outfit.subcategory}
            onChange={(e) => {
              setOutfit((prev) => ({
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
            value={outfit.colors[0]?.id.toString() || ""} // assumes single selection
            onChange={handleColorChange}
          >
            <option value="">color</option>
            {colors.map((color) => (
              <option key={color.id} value={color.id.toString()}>
                {color.name}
              </option>
            ))}
          </select>
          <button type="submit" className="submitButton">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
