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
  const [wears, setWears] = useState(item.noOfWears || 0);
  const [isUpdating, setIsUpdating] = useState(false);

  const isOutfit = Array.isArray(item.items) && item.items.length > 0;

  const handleWornToday = async () => {
    try {
      setIsUpdating(true);

      if (isOutfit) {
        const updatePromises = item.items.map((clothing: any) =>
          axios.put(`http://localhost:8080/item/${clothing.id}/wear`)
        );

        const responses = await Promise.all(updatePromises);

        // Ručno povećaj brojače u lokalnom item objektu
        responses.forEach((res, i) => {
          item.items[i].noOfWears = res.data.noOfWears;
        });

        // Nema setWears ovdje – koristi calculateWears() dolje
      } else {
        const response = await axios.put(
          `http://localhost:8080/item/${item.id}/wear`
        );
        setWears(response.data.noOfWears);
      }
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

  const formattedDate = item.dateAcquired
    ? new Date(item.dateAcquired).toLocaleDateString("hr-HR")
    : "n/a";

  const calculateWears = () => {
    if (isOutfit) {
      return item.items.reduce(
        (sum: number, item: any) => sum + (item.noOfWears || 0),
        0
      );
    } else {
      return wears;
    }
  };

  const calculateCostPerWear = () => {
    const totalWears = calculateWears();
    return totalWears > 0
      ? (parseFloat(item.price) / totalWears).toFixed(2)
      : "∞";
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
            {!isOutfit && (
              <>
                <div className="data-div" id="item-name">
                  {item.name}
                </div>
                <div className="data-div" id="cost-per-wear">
                  cost per wear: {calculateCostPerWear()}
                </div>
                <div className="data-div">brand: {item.brand}</div>
                <div className="data-div">material: {item.material}</div>
                <div className="data-div">price: {item.price}€</div>
                <div className="data-div">size: {item.size}</div>
                <div className="data-div">times worn: {calculateWears()}</div>

                <div className="data-div">date acquired: {formattedDate}</div>
                <div className="data-div">gift: {item.gift ? "yes" : "no"}</div>
              </>
            )}
            {isOutfit && (
              <>
                <div className="outfit-card-grid">
                  {item.items.map((clothing: any) => (
                    <div key={clothing.id} className="card">
                      <div className="image-div">
                        <img
                          className="img"
                          src={clothing.imageUrl}
                          alt={clothing.name}
                        />
                      </div>
                      <div className="card-body">
                        <div className="body-div">{clothing.brand}</div>
                      </div>
                    </div>
                  ))}
                </div>
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
