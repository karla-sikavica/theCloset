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

  const dataToDisplay = activeTab === "clothing" ? items : outfits;

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
      </div>

      <div className="card-container">
        <div className="card-div">
          {dataToDisplay.map((entry) => (
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
