import { useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";
import { useFetchOutfits } from "../hooks/useFetchOutfits";
import "./css/Closet.css";
import ClothingItem from "../components/ui/ClothingItem";
/* import { Category, Color } from "../types";
 */
interface ClosetProps {
  onDragStart?: (item: any) => (e: React.DragEvent) => void;
}

const Closet = ({ onDragStart }: ClosetProps) => {
  const user = useCurrentUser();
  const userId = user?.id;

  const items = useFetchItems(userId);
  const outfits = useFetchOutfits(userId);

  const [activeTab, setActiveTab] = useState<"clothing" | "outfit">("clothing");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [clothingTab, setClothingTab] = useState<"all" | "filters">("all");

  /*   const dataToDisplay = activeTab === "clothing" ? items : outfits;
   */

  const filteredItems = items.filter((item) => {
    return (
      (colorFilter === "" ||
        item.colors.some((color) => color.name === colorFilter)) &&
      (materialFilter === "" || item.material === materialFilter) &&
      (seasonFilter === "" || item.season === seasonFilter) &&
      (categoryFilter === "" || item.category.name === categoryFilter) &&
      (brandFilter === "" || item.brand === brandFilter) &&
      (giftFilter === "" ||
        (giftFilter === "yes" ? item.gift === true : item.gift === false))
    );
  });

  const dataToDisplay = activeTab === "clothing" ? filteredItems : outfits;

  const sortedData = [...dataToDisplay].sort((a, b) => a.id - b.id);
  const [colorFilter, setColorFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [giftFilter, setGiftFilter] = useState(""); // "yes", "no", or ""

  return (
    <div className="closet-wrapper">
      <div className="closet-tab-switch">
        <button
          className={
            activeTab === "clothing" ? "closet-tab active" : "closet-tab"
          }
          onClick={() => setActiveTab("clothing")}
        >
          clothing
        </button>
        <button
          className={
            activeTab === "outfit" ? "closet-tab active" : "closet-tab"
          }
          onClick={() => setActiveTab("outfit")}
        >
          outfits
        </button>
        {activeTab === "clothing" && (
          <div className="filters">
            <select
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
            >
              <option value="">All Colors</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              {/* Dodaj još boja */}
            </select>

            <select
              value={materialFilter}
              onChange={(e) => setMaterialFilter(e.target.value)}
            >
              <option value="">All Materials</option>
              <option value="cotton">Cotton</option>
              <option value="wool">Wool</option>
              <option value="leather">Leather</option>
            </select>

            <select
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(e.target.value)}
            >
              <option value="">All Seasons</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
              <option value="autumn">Autumn</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="top">Top</option>
              <option value="pants">Pants</option>
              <option value="shoes">Shoes</option>
              {/* Dodaj još kategorija */}
            </select>

            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <option value="">All Brands</option>
              <option value="Nike">Nike</option>
              <option value="Zara">Zara</option>
              <option value="Adidas">Adidas</option>
            </select>

            <select
              value={giftFilter}
              onChange={(e) => setGiftFilter(e.target.value)}
            >
              <option value="">Gift or Not</option>
              <option value="yes">Gift</option>
              <option value="no">Not a Gift</option>
            </select>
          </div>
        )}
      </div>
      {activeTab === "clothing" && (
        <div className="closet-tab-switch">
          <button
            className={
              clothingTab === "all" ? "closet-tab active" : "closet-tab"
            }
            onClick={() => setClothingTab("all")}
          >
            All items
          </button>
          <button
            className={
              clothingTab === "filters" ? "closet-tab active" : "closet-tab"
            }
            onClick={() => setClothingTab("filters")}
          >
            Filters
          </button>
        </div>
      )}

      <div className="card-container">
        <div className="card-div">
          {sortedData.map((entry) => (
            <div key={entry.id} className="card">
              <div className="image-div">
                <img
                  className="img"
                  src={entry.imageUrl}
                  alt={entry.name || "outfit"}
                  draggable
                  onClick={() => setSelectedItem(entry)}
                  onDragStart={onDragStart ? onDragStart(entry) : undefined}
                />
              </div>
              {activeTab === "clothing" && (
                <div className="card-body">
                  <div className="body-div">{entry.brand}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        {selectedItem && (
          <ClothingItem
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onDelete={(id) => {
              console.log("Delete item with id:", id);
              setSelectedItem(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Closet;
