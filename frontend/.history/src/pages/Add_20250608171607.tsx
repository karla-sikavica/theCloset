import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Add2.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { useCurrentUser } from "../hooks/useCurrentUser";
import AddOutfit from "../components/ui/AddOutfit";
import TabSwitcher from "../components/ui/add/TabSwitcher";
import AddImageUpload from "../components/ui/add/NewImageUpload";
import AddFormInputs from "../components/ui/add/AddFormInputs";
import { v4 as uuidv4 } from "uuid";

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
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [colors, setColors] = useState<
    { id: number; name: string; bgColor: string }[]
  >([]);
  const [activeTab, setActiveTab] = useState<"clothing" | "outfit">("clothing");
  const [itemAdded, setItemAdded] = useState(false);

  const categories = useFetchCategories();
  const user = useCurrentUser();

  const [clothingItem, setclothingItem] = useState<{
    name: string;
    season: string;
    category: number | "";
    subcategory: number | "";
    size: string;
    brand: string;
    material: string;
    colors: { id: number; name: string }[];
    imageUrl: string;
    price: string;
    gift: boolean;
    no_of_wears: number;
    date_acquired: string;
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setclothingItem((prev) => ({
      ...prev,
      [name]: name === "gift" ? value === "true" : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const uploadImageAndRemoveBg = async (imageFile: File): Promise<Blob> => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await axios.post(
      "http://localhost:8080/api/image/remove-background",
      formData,
      { responseType: "blob" }
    );
    return response.data;
  };

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
      const noBgBlob = await uploadImageAndRemoveBg(image);
      const objectUrl = URL.createObjectURL(noBgBlob);
      setPreviewUrl(objectUrl);

      const uniqueFileName = `no-bg-${uuidv4()}-${image.name}`;
      const processedFile = new File([noBgBlob], uniqueFileName, {
        type: "image/png",
      });

      const storageRef = ref(storage, `images/${uniqueFileName}`);

      await uploadBytes(storageRef, processedFile);
      const downloadURL = await getDownloadURL(storageRef);

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

      await axios.post("http://localhost:8080/item", formData);

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

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/colors");
        const fetchedColors = response.data;
        const enrichedColors = fetchedColors.map((color: any) => {
          const localColor = predefinedColors.find(
            (local) => local.name.toLowerCase() === color.name.toLowerCase()
          );
          return {
            ...color,
            bgColor: localColor?.bgColor || "#ccc",
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

  return (
    <div className="AddContainer">
      <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "clothing" && (
        <>
          {itemAdded ? (
            <div className="confirmation-message">
              your clothing item is added
            </div>
          ) : (
            <form className="formContainer" onSubmit={handleSubmit}>
              <div className="formContent">
                <AddImageUpload
                  previewUrl={previewUrl}
                  handleImageChange={handleImageChange}
                  errors={errors}
                />
                <div className="scrollable-form-wrapper">
                  <div className="form-div">
                    <AddFormInputs
                      clothingItem={clothingItem}
                      setclothingItem={setclothingItem}
                      categories={categories}
                      subcategories={subcategories}
                      handleInputChange={handleInputChange}
                      errors={errors}
                    />

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
                            return (
                              <label
                                key={color.id}
                                className={`color-option ${
                                  isSelected ? "selected" : ""
                                }`}
                                style={{ backgroundColor: color.bgColor }}
                              >
                                <input
                                  type="checkbox"
                                  value={color.id}
                                  checked={isSelected}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setclothingItem((prev) => {
                                      const updatedColors = isChecked
                                        ? [...prev.colors, color]
                                        : prev.colors.filter(
                                            (c) => c.id !== color.id
                                          );
                                      return { ...prev, colors: updatedColors };
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
                      <button type="submit" className="submitButton">
                        add item
                      </button>
                    </div>
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
  );
};

export default Add;
