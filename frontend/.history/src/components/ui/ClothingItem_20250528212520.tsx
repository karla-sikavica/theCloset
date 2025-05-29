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

  const handleWornToday = async () => {
    try {
      setIsUpdating(true);
      const response = await axios.put(
        `http://localhost:8080/item/${item.id}/wear`, // prilagodi prema tvom backendu
        {}
      );
      setWears(response.data.no_of_wears); // očekujemo novi broj iz backend odgovora
    } catch (error) {
      console.error("Failed to update wear count", error);
    } finally {
      setIsUpdating(false);
    }
  };

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
            <h2>{item.name}</h2>
            <p>
              <strong>Brand:</strong> {item.brand}
            </p>
            <p>
              <strong>Material:</strong> {item.material}
            </p>
            <p>
              <strong>Price:</strong> ${item.price}
            </p>
            <p>
              <strong>Size:</strong> {item.size}
            </p>
            <p>
              <strong>Worn:</strong> {wears}x
            </p>
            <div className="button-group">
              <button
                className="worn-btn"
                onClick={handleWornToday}
                disabled={isUpdating}
              >
                👕 Worn today
              </button>
              <button className="delete-btn" onClick={() => onDelete(item.id)}>
                🗑 Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothingItem;
