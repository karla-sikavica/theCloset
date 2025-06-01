import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Add2.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { useCurrentUser } from "../hooks/useCurrentUser";
import AddOutfit from "../components/ui/AddOutfit";

const predefinedColors = [
  { id: 1, name: "Red", bgColor: "#E60548" },
  { id: 2, name: "Blue", bgColor: "#3498db" },
  { id: 3, name: "Black", bgColor: "#110b11" },
  { id: 4, name: "White", bgColor: "#ecf0f1" },
  { id: 5, name: "Green", bgColor: "#27ae60" },
  { id: 6, name: "Pink", bgColor: "#ff69b4" },
  { id: 7, name: "Purple", bgColor: "#9b59b6" },
  { id: 8, name: "Beige", bgColor: "#d5c5a3" },
  { id: 9, name: "Cream", bgColor: "#fffdd0" },
  { id: 10, name: "Yellow", bgColor: "#f1c40f" },
  { id: 11, name: "Teal", bgColor: "#1abc9c" },
  { id: 12, name: "Orange", bgColor: "#e67e22" },
  { id: 13, name: "Brown", bgColor: "#8b4513" },
  { id: 14, name: "Grey", bgColor: "#95a5a6" },
  { id: 15, name: "Gold", bgColor: "#ffd700" },
  { id: 16, name: "Silver", bgColor: "#c0c0c0" },
];

const Add = () => {
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
  const [filters, setFilters] = useState({
    colorIds: [] as number[],
    categoryId: "",
    season: "",
    material: "",
    brand: "",
    gift: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const categories = useFetchCategories();
  const user = useCurrentUser();
  const [colors, setColors] = useState<
    { id: number; name: string; bgColor: string }[]
  >([]);
  const [activeTab, setActiveTab] = useState<"clothing" | "outfit">("clothing");
  const [itemAdded, setItemAdded] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setclothingItem((prevclothingItem) => ({
      ...prevclothingItem,
      [name]: value,
    }));
  };

  const uploadImageAndRemoveBg = async (imageFile: File): Promise<Blob> => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post(
      "http://localhost:8080/api/image/remove-background",
      formData,
      {
        responseType: "blob",
      }
    );

    return response.data;
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  /* const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image!");
      return;
    }

    try {
      // 1. Pošalji sliku backendu za uklanjanje pozadine
      const noBgBlob = await uploadImageAndRemoveBg(image);

      const objectUrl = URL.createObjectURL(noBgBlob);
      setPreviewUrl(objectUrl);

      // 2. Pretvori Blob u File za Firebase upload
      const processedFile = new File([noBgBlob], `no-bg-${image.name}`, {
        type: "image/png",
      });

      // 3. Upload na Firebase
      const storageRef = ref(storage, `images/${processedFile.name}`);
      await uploadBytes(storageRef, processedFile);
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

      setItemAdded(true);
      setTimeout(() => {
        setItemAdded(false);
        setclothingItem({
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
        setImage(null);
        setPreviewUrl(null);
      }, 3000);
    } catch (error) {
      console.error("Error uploading image or sending data", error);
    }
  }; */
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!clothingItem.name.trim()) newErrors.name = "Name is required";
    if (!clothingItem.brand.trim()) newErrors.brand = "Brand is required";
    if (!clothingItem.material.trim())
      newErrors.material = "Material is required";
    if (!clothingItem.price || isNaN(Number(clothingItem.price)))
      newErrors.price = "Valid price is required";
    if (!clothingItem.category) newErrors.category = "Select a category";
    if (!clothingItem.subcategory)
      newErrors.subcategory = "Select a subcategory";
    if (!clothingItem.size) newErrors.size = "Select a size";
    if (!image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!image) {
      alert("Please upload an image!");
      return;
    }

    try {
      // 1. Pošalji sliku backendu za uklanjanje pozadine
      const noBgBlob = await uploadImageAndRemoveBg(image);

      const objectUrl = URL.createObjectURL(noBgBlob);
      setPreviewUrl(objectUrl);

      // 2. Pretvori Blob u File za Firebase upload
      const processedFile = new File([noBgBlob], `no-bg-${image.name}`, {
        type: "image/png",
      });

      // 3. Upload na Firebase
      const storageRef = ref(storage, `images/${processedFile.name}`);
      await uploadBytes(storageRef, processedFile);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("download url: ", downloadURL);
      // 3. Prepare data to send to backend (imageUrl is now Firebase link)
      const { no_of_wears, date_acquired, ...rest } = clothingItem;

      const formData = {
        ...clothingItem,
        imageUrl: downloadURL,
        category: { id: Number(clothingItem.category) },
        subcategory: { id: Number(clothingItem.subcategory) },
        colors: clothingItem.colors.map((color) => ({
          name: color.name.trim(),
        })),
        user,
        noOfWears: clothingItem.no_of_wears,
        dateAcquired: clothingItem.date_acquired,
      };

      console.log("formdata: ", formData);

      // 4. Send to backend (normal JSON POST, jer nema više fajlova)
      const response = await axios.post("http://localhost:8080/item", formData);
      console.log("Clothing item added!", response.data);

      setItemAdded(true);
      setTimeout(() => {
        setItemAdded(false);
        setclothingItem({
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
        setImage(null);
        setPreviewUrl(null);
      }, 2000);
    } catch (error) {
      console.error("Error uploading image or sending data", error);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };
  /* useEffect(() => {
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
  }, []); */

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/colors");
        const fetchedColors = response.data;

        // Merge bgColor into each color object from backend
        const enrichedColors = fetchedColors.map((color: any) => {
          const localColor = predefinedColors.find(
            (local) => local.name.toLowerCase() === color.name.toLowerCase()
          );
          return {
            ...color,
            bgColor: localColor?.bgColor || "#ccc", // fallback boja
          };
        });

        setColors(enrichedColors);
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

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      !filters.categoryId || item.category?.id == filters.categoryId;
    const matchesSeason =
      !filters.season || item.season?.toLowerCase() === filters.season;
    const matchesMaterial =
      !filters.material ||
      item.material?.toLowerCase().includes(filters.material.toLowerCase());
    const matchesBrand =
      !filters.brand ||
      item.brand?.toLowerCase().includes(filters.brand.toLowerCase());
    const matchesGift =
      filters.gift === "" ? true : item.gift === (filters.gift === "true");
    const matchesColors =
      filters.colorIds.length === 0 ||
      filters.colorIds.every((id) =>
        item.colors?.some((c: any) => c.id === id)
      );

    return (
      matchesCategory &&
      matchesSeason &&
      matchesMaterial &&
      matchesBrand &&
      matchesGift &&
      matchesColors
    );
  });

  return (
    <div className="AddContainer">
      <div className="tab-switch">
        <button
          className={activeTab === "clothing" ? "tab active" : "tab"}
          onClick={() => setActiveTab("clothing")}
          type="button"
        >
          clothing item
        </button>
        <button
          className={activeTab === "outfit" ? "tab active" : "tab"}
          onClick={() => setActiveTab("outfit")}
          type="button"
        >
          outfit
        </button>
        {activeTab === "outfit" && (
          <div className="filter-bar">
            <select
              value={filters.categoryId}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, categoryId: e.target.value }))
              }
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={filters.season}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, season: e.target.value }))
              }
            >
              <option value="">All Seasons</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="autumn">Autumn</option>
              <option value="winter">Winter</option>
            </select>

            <input
              type="text"
              placeholder="Material"
              value={filters.material}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, material: e.target.value }))
              }
            />

            <input
              type="text"
              placeholder="Brand"
              value={filters.brand}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, brand: e.target.value }))
              }
            />

            <select
              value={filters.gift}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, gift: e.target.value }))
              }
            >
              <option value="">Gift?</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            {/* Color checkboxes */}
            <div className="color-filter">
              {colors.map((color) => (
                <label
                  key={color.id}
                  style={{ backgroundColor: color.bgColor }}
                >
                  <input
                    type="checkbox"
                    value={color.id}
                    checked={filters.colorIds.includes(color.id)}
                    onChange={(e) => {
                      const id = parseInt(e.target.value);
                      setFilters((prev) => ({
                        ...prev,
                        colorIds: e.target.checked
                          ? [...prev.colorIds, id]
                          : prev.colorIds.filter((c) => c !== id),
                      }));
                    }}
                  />
                  {color.name}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        {activeTab === "clothing" && (
          <>
            {itemAdded ? (
              <div className="confirmation-message">
                your clothing item is added
              </div>
            ) : (
              <form className="formContainer" onSubmit={handleSubmit}>
                <div className="formContent">
                  <div className="image-input-div">
                    <div className="file-upload-wrapper">
                      <label htmlFor="imageUrl" className="file-upload-label">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="preview-img"
                          />
                        ) : (
                          <>
                            📸 Click to add an image
                            <br />
                            <br />
                            Lay your item on a flat surface and take a picture
                            of it from above
                          </>
                        )}
                      </label>
                      <input
                        type="file"
                        id="imageUrl"
                        onChange={handleImageChange}
                        className={`hidden-file-input ${
                          errors.image ? "input-error" : ""
                        }`}
                      />
                      {/*  {errors.image && (
                        <p className="error-text">{errors.image}</p>
                      )} */}
                    </div>
                  </div>

                  <div className="form-div">
                    <div className="input-label-div">
                      <label htmlFor="name">name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="item name"
                        value={clothingItem.name}
                        onChange={handleInputChange}
                        className={errors.name ? "input-error" : ""}
                      />
                      {/* {errors.name && (
                        <p className="error-text">{errors.name}</p>
                      )} */}
                    </div>

                    <div className="input-label-div">
                      <label htmlFor="brand">brand</label>
                      <input
                        type="text"
                        id="brand"
                        name="brand"
                        placeholder="brand"
                        value={clothingItem.brand}
                        onChange={handleInputChange}
                        className={errors.brand ? "input-error" : ""}
                      />
                      {/* {errors.brand && (
                        <p className="error-text">{errors.brand}</p>
                      )} */}
                    </div>

                    <div className="input-label-div">
                      <label htmlFor="material">material</label>
                      <input
                        type="text"
                        id="material"
                        name="material"
                        placeholder="material"
                        value={clothingItem.material}
                        onChange={handleInputChange}
                        className={errors.material ? "input-error" : ""}
                      />
                      {/* {errors.material && (
                        <p className="error-text">{errors.material}</p>
                      )} */}
                    </div>

                    <div className="input-label-div">
                      <label htmlFor="price">price</label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        placeholder="price"
                        value={
                          clothingItem.price === "0" ? "" : clothingItem.price
                        }
                        onChange={handleInputChange}
                        className={errors.price ? "input-error" : ""}
                      />
                      {/* {errors.price && (
                        <p className="error-text">{errors.price}</p>
                      )} */}
                    </div>

                    <div className="input-label-div">
                      <label htmlFor="no_of_wears">times worn</label>
                      <input
                        type="number"
                        id="no_of_wears"
                        name="no_of_wears"
                        placeholder="times worn"
                        value={
                          clothingItem.no_of_wears === 0
                            ? ""
                            : clothingItem.no_of_wears
                        }
                        onChange={(e) =>
                          setclothingItem((prev) => ({
                            ...prev,
                            no_of_wears: parseInt(e.target.value, 10),
                          }))
                        }
                        className="number-input"
                      />
                    </div>

                    <div className="input-label-div">
                      <label htmlFor="date_acquired">date acquired</label>
                      <input
                        type="date"
                        id="date_acquired"
                        name="date_acquired"
                        value={clothingItem.date_acquired}
                        onChange={handleInputChange}
                        className="date-input"
                      />
                    </div>

                    <div className="input-label-div">
                      <label htmlFor="category">category</label>
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
                        className={errors.category ? "input-error" : ""}
                      >
                        <option value="">category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {/* {errors.category && (
                        <p className="error-text">{errors.category}</p>
                      )} */}
                    </div>

                    <div className="input-label-div">
                      <label htmlFor="subcategory">subcategory</label>
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
                        className={errors.subcategory ? "input-error" : ""}
                      >
                        <option value="">subcategory</option>
                        {subcategories.map((subcat) => (
                          <option key={subcat.id} value={subcat.id}>
                            {subcat.name}
                          </option>
                        ))}
                      </select>
                      {/* {errors.subcategory && (
                        <p className="error-text">{errors.subcategory}</p>
                      )} */}
                    </div>

                    <div className="input-label-div">
                      <label htmlFor="season">season</label>
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
                    </div>

                    <div className="input-label-div">
                      <label htmlFor="size">size</label>
                      <select
                        id="size"
                        name="size"
                        onChange={handleInputChange}
                        value={clothingItem.size}
                        className={errors.size ? "input-error" : ""}
                      >
                        <option value="">size</option>
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

                        <option value="us 4">us 4</option>
                        <option value="us 5">us 5</option>
                        <option value="us 6">us 6</option>
                        <option value="us 7">us 7</option>
                        <option value="us 8">us 8</option>
                        <option value="us 9">us 9</option>
                        <option value="us 10">us 10</option>
                        <option value="us 11">us 11</option>
                        <option value="us 12">us 12</option>

                        <option value="uk 4">uk 4</option>
                        <option value="uk 5">uk 5</option>
                        <option value="uk 6">uk 6</option>
                        <option value="uk 7">uk 7</option>
                        <option value="uk 8">uk 8</option>
                        <option value="uk 9">uk 9</option>
                        <option value="uk 10">uk 10</option>

                        <option value="32">32</option>
                        <option value="34">34</option>
                        <option value="36">36</option>
                        <option value="38">38</option>
                        <option value="40">40</option>
                        <option value="42">42</option>
                        <option value="44">44</option>
                        <option value="46">46</option>
                      </select>
                      {/* {errors.size && (
                        <p className="error-text">{errors.size}</p>
                      )} */}
                    </div>

                    <div className="input-label-div">
                      <label htmlFor="gift">gift</label>
                      <select name="gift" id="gift">
                        <option value="no">no</option>
                        <option value="yes">yes</option>
                      </select>
                    </div>

                    <div className="colors-div">
                      <button
                        type="button"
                        className="toggleColorsButton"
                        onClick={() => setShowColorOptions((prev) => !prev)}
                      >
                        colors
                      </button>

                      {showColorOptions && (
                        <div className="color-options-container">
                          {colors.map((color) => {
                            const isSelected = clothingItem.colors.some(
                              (c) => c.id === color.id
                            );

                            /* const isLightBackground = [
                              "white",
                              "beige",
                              "cream",
                            ].includes(color.name.toLowerCase()); */

                            return (
                              <label
                                key={color.id}
                                className={`color-option ${
                                  isSelected ? "selected" : ""
                                }`}
                                style={{
                                  backgroundColor: color.bgColor,
                                  /*                                   color: isLightBackground ? "#000" : "#fff",
                                   */
                                }}
                              >
                                <input
                                  type="checkbox"
                                  value={color.id}
                                  checked={isSelected}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setclothingItem((prev) => {
                                      let updatedColors;
                                      if (isChecked) {
                                        updatedColors = [...prev.colors, color];
                                      } else {
                                        updatedColors = prev.colors.filter(
                                          (c) => c.id !== color.id
                                        );
                                      }
                                      return {
                                        ...prev,
                                        colors: updatedColors,
                                      };
                                    });
                                  }}
                                />
                                {color.name}
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="submit-div">
                      <button
                        type="submit"
                        className="submitButton"
                        onClick={handleSubmit}
                      >
                        add item
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </>
        )}

        {activeTab === "outfit" && (
          <div className="formContainer">
            <AddOutfit />
          </div>
        )}
      </div>
    </div>
  );
};

export default Add;
