import { useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";
import { useFetchOutfits } from "../hooks/useFetchOutfits";
import "./css/Closet.css";
import ClothingItem from "../components/ui/ClothingItem";

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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [colorFilter, setColorFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [giftFilter, setGiftFilter] = useState("");

  const uniqueMaterials = Array.from(
    new Set(items.map((item) => item.material).filter(Boolean))
  );

  const uniqueBrands = Array.from(
    new Set(items.map((item) => item.brand).filter(Boolean))
  );

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const filteredItems = items.filter((item) => {
    return (
      (colorFilter === "" ||
        item.colors.some((color) => color === colorFilter)) &&
      (materialFilter === "" || item.material === materialFilter) &&
      (seasonFilter === "" || item.season === seasonFilter) &&
      (categoryFilter === "" || item.category === categoryFilter) &&
      (brandFilter === "" || item.brand === brandFilter) &&
      (giftFilter === "" ||
        (giftFilter === "yes" ? item.gift === true : item.gift === false))
    );
  });

  const dataToDisplay = activeTab === "clothing" ? filteredItems : outfits;

  const sortedData = [...dataToDisplay].sort((a, b) => b.id - a.id);

  return (
    <div className="closet-wrapper">
      <div className="closet-tab-wrapper">
        <div className="closet-tab-switch">
          <div className="tab-buttons">
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
          </div>

          {activeTab === "clothing" && (
            <div className="filters-floating-wrapper">
              <button
                className="filters-button"
                onClick={() => setIsFilterModalOpen((prev) => !prev)}
              >
                filters
              </button>

              {isFilterModalOpen && (
                <div className="filters-floating-modal">
                  <select
                    value={colorFilter}
                    onChange={(e) => setColorFilter(e.target.value)}
                  >
                    <option value="">all colors</option>
                    <option value="Red">red</option>
                    <option value="Blue">blue</option>
                    <option value="Black">black</option>
                    <option value="White">white</option>
                    <option value="Green">green</option>
                    <option value="Pink">pink</option>
                    <option value="Purple">purple</option>
                    <option value="Beige">beige</option>
                    <option value="Cream">cream</option>
                    <option value="Yellow">yellow</option>
                    <option value="Teal">teal</option>
                    <option value="Orange">orange</option>
                    <option value="Brown">brown</option>
                    <option value="Grey">grey</option>
                    <option value="Gold">gold</option>
                    <option value="Silver">silver</option>
                  </select>

                  {/* <select
                    value={materialFilter}
                    onChange={(e) => setMaterialFilter(e.target.value)}
                  >
                    <option value="">All Materials</option>
                    <option value="cotton">Cotton</option>
                    <option value="wool">Wool</option>
                    <option value="leather">Leather</option>
                    <option value="metal">metal</option>
                    <option value="silk">silk</option>
                    <option value="polyamide">polyamide</option>
                  </select> */}

                  <select
                    value={materialFilter}
                    onChange={(e) => setMaterialFilter(e.target.value)}
                  >
                    <option value="">All Materials</option>
                    {uniqueMaterials.map((mat) => (
                      <option key={mat} value={mat}>
                        {capitalize(mat)}
                      </option>
                    ))}
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
                    <option value="Top">Top</option>
                    <option value="Bottom">Bottom</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="One piece">One piece</option>
                    <option value="Accessory">accessory</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Bag">Bag</option>
                    <option value="Swimwear">Swimwear</option>
                  </select>

                  {/* <select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                  >
                    <option value="">All Brands</option>
                    <option value="hm">hm</option>
                    <option value="stradivarius">Stradivarius</option>
                    <option value="gucci">gucci</option>
                  </select> */}

                  <select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                  >
                    <option value="">All Brands</option>
                    {uniqueBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {capitalize(brand)}
                      </option>
                    ))}
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
          )}
        </div>
      </div>

      {sortedData.length === 0 ? (
        <div className="center-closet">
          <div className="no-items-message">
            {activeTab === "clothing"
              ? "you haven't logged any clothing items yet"
              : "you haven't created any outfits yet"}
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Closet;
