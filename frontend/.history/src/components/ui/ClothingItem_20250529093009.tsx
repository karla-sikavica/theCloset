import "../css/ClothingItem.css";
import axios from "axios";
import { useState } from "react";

const ClothingItem = ({
  item,
  onClose,
  onDelete,
}: {
  item: any;
  onClose: () => void;
  onDelete: (id: number) => void;
}) => {
  const [wears, setWears] = useState(item.no_of_wears || 0);
  const [isUpdating, setIsUpdating] = useState(false);

  const isOutfit = Array.isArray(item.items) && item.items.length > 0;

  const handleWornToday = async () => {
    try {
      setIsUpdating(true);
      const response = await axios.put(
        `http://localhost:8080/item/${item.id}/wear`
      );
      setWears(response.data.no_of_wears);
    } catch (error) {
      console.error("Failed to update wear count", error);
    } finally {
      setIsUpdating(false);
    }
  };
  console.log("Item data:", item);

  const handleDelete = async () => {
    console.log("Delete clicked");

    try {
      const endpoint = isOutfit
        ? `http://localhost:8080/outfits/${item.id}`
        : `http://localhost:8080/item/${item.id}`;

      await axios.delete(endpoint);
      onDelete(item.id); // callback za brisanje iz liste
      onClose(); // zatvori prikaz
    } catch (error) {
      console.error("Error deleting item or outfit", error);
    }
  };

  const costPerWear =
    wears > 0 ? (parseFloat(item.price) / wears).toFixed(2) : "∞";

  return (
    <div className="clothing-detail-overlay">
      <div className="clothing-detail-modal">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <div className="clothing-detail-content">
          <div className="detail-image">
            <img src={item.imageUrl} alt={item.name} />
          </div>
          <div className="detail-form">
            {!isOutfit && (
              <>
                <div>{item.name}</div>
                <div>
                  <strong>Brand:</strong> {item.brand}
                </div>
                <div>
                  <strong>Material:</strong> {item.material}
                </div>
                <div>
                  <strong>Price:</strong> ${item.price}
                </div>
                <div>
                  <strong>Size:</strong> {item.size}
                </div>
                <div>
                  <strong>Times worn:</strong> {wears}
                </div>
                <div>
                  <strong>Cost per wear:</strong> {costPerWear}
                </div>
                <div>
                  <strong>Date acquired:</strong> {item.date_acquired}
                </div>
                <div>
                  <strong>Gift:</strong> {item.gift ? "Yes" : "No"}
                </div>
              </>
            )}
            <div className="button-group">
              {!isOutfit && (
                <button
                  className="worn-btn"
                  onClick={handleWornToday}
                  disabled={isUpdating}
                >
                  Worn today
                </button>
              )}
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothingItem;
