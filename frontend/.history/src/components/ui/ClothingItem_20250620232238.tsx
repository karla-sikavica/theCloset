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
  const todayKey = `worn-${item.id}`;
  const today = new Date().toISOString().split("T")[0]; // samo "YYYY-MM-DD"

  const [alreadyWornToday, setAlreadyWornToday] = useState(
    localStorage.getItem(todayKey) === today
  );

  const isOutfit = Array.isArray(item.items) && item.items.length > 0;

  /* const handleWornToday = async () => {
    try {
      setIsUpdating(true);

      if (isOutfit) {
        const updatePromises = item.items.map((clothing: any) =>
          axios.put(`http://localhost:8080/item/${clothing.id}/wear`)
        );

        const responses = await Promise.all(updatePromises);
        localStorage.setItem(todayKey, today);
        setAlreadyWornToday(true);

        // Ručno povećaj brojače u lokalnom item objektu
        responses.forEach((res, i) => {
          item.items[i].noOfWears = res.data.noOfWears;
        });

        // Nema setWears ovdje – koristi calculateWears() dolje
      } else {
        const response = await axios.put(
          `http://localhost:8080/item/${item.id}/wear`
        );
        localStorage.setItem(todayKey, today);
        setAlreadyWornToday(true);

        setWears(response.data.noOfWears);
      }
    } catch (error) {
      console.error("Failed to update wear count", error);
    } finally {
      setIsUpdating(false);
    }
  }; */
  const handleWornToday = async () => {
    setIsUpdating(true);

    try {
      if (alreadyWornToday) {
        // Ponovno kliknuto: poništi "worn today"
        localStorage.removeItem(todayKey);
        setAlreadyWornToday(false);

        if (isOutfit) {
          // Lokalne izmjene bez slanja na backend
          item.items.forEach((clothing: any) => {
            clothing.noOfWears = Math.max((clothing.noOfWears || 1) - 1, 0);
          });
        } else {
          setWears((prev: number) => Math.max(prev - 1, 0));
        }
      } else {
        // Prvi klik: označi kao "worn today"
        if (isOutfit) {
          const updatePromises = item.items.map((clothing: any) =>
            axios.put(`http://localhost:8080/item/${clothing.id}/wear`)
          );

          const responses = await Promise.all(updatePromises);
          responses.forEach((res, i) => {
            item.items[i].noOfWears = res.data.noOfWears;
          });
        } else {
          const response = await axios.put(
            `http://localhost:8080/item/${item.id}/wear`
          );
          setWears(response.data.noOfWears);
        }

        localStorage.setItem(todayKey, today);
        setAlreadyWornToday(true);
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
  /* 
  const costPerWear =
    wears > 0 ? (parseFloat(item.price) / wears).toFixed(2) : "∞"; */

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
                {/* 
                <div className="data-div" id="cost-per-wear">
                  cost per wear: {calculateCostPerWear()}
                </div>
                <div className="data-div">brand: {item.brand}</div>
                <div className="data-div">material: {item.material}</div>
                <div className="data-div">price: {item.price}€</div>
                <div className="data-div">size: {item.size}</div>
                <div className="data-div">times worn: {calculateWears()}</div>

                <div className="data-div">date acquired: {formattedDate}</div>
                <div className="data-div">gift: {item.gift ? "yes" : "no"}</div> */}
                <div className="data-grid">
                  <div className="data-card">
                    <div className="card-value">{calculateCostPerWear()}€</div>
                    <div className="card-name">cost per wear</div>
                  </div>
                  <div className="data-card">
                    <div className="card-value">{item.brand}</div>
                    <div className="card-name">brand</div>
                  </div>
                  <div className="data-card">
                    <div className="card-value">{item.material}</div>
                    <div className="card-name">material</div>
                  </div>
                  <div className="data-card">
                    <div className="card-value">{item.price}€</div>
                    <div className="card-name">price</div>
                  </div>
                  <div className="data-card">
                    <div className="card-value">{item.size}</div>
                    <div className="card-name">size</div>
                  </div>
                  <div className="data-card">
                    <div className="card-value">{calculateWears()}</div>
                    <div className="card-name">times worn</div>
                  </div>
                  <div className="data-card">
                    <div className="card-value">{formattedDate}</div>
                    <div className="card-name">date acquired</div>
                  </div>
                  <div className="data-card">
                    <div className="card-value">{item.gift ? "yes" : "no"}</div>
                    <div className="card-name">gift</div>
                  </div>
                </div>
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
              {/* <button
                className="worn-btn"
                onClick={handleWornToday}
                disabled={isUpdating || alreadyWornToday}
              >
                worn today
              </button> */}
              <button
                className="worn-btn"
                onClick={handleWornToday}
                disabled={isUpdating}
              >
                {alreadyWornToday ? "undo worn today" : "worn today"}
              </button>

              <button className="delete-btn" onClick={handleDelete}>
                delete
              </button>
            </div>
            {/* {alreadyWornToday && (
              <div className="info-text">already marked as worn today</div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothingItem;
