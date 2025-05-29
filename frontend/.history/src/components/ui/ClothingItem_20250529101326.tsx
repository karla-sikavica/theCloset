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
                <div className="data-div" id="item-name">
                  {item.name}
                </div>
                <div className="data-div" id="cost-per-wear">
                  cost per wear: {costPerWear}
                </div>
                <div className="data-div">brand: {item.brand}</div>
                <div className="data-div">material: {item.material}</div>
                <div className="data-div">price: {item.price}€</div>
                <div className="data-div">size: {item.size}</div>
                <div className="data-div">times worn: {wears}</div>

                <div className="data-div">
                  date acquired: {item.date_acquired}
                </div>
                <div className="data-div">gift: {item.gift ? "Yes" : "No"}</div>
              </>
            )}
            <div className="button-group">
              <button
                className="worn-btn"
                onClick={handleWornToday}
                disabled={isUpdating}
              >
                worn today
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothingItem;
