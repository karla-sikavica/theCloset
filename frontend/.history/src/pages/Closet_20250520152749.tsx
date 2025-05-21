/* import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";
import "./css/Closet.css";

const Closet = () => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);

  return (
    <div className="card-container">
      <div className="card-div">
        {items.map((item) => (
          <div key={item.id} className="card">
            <div className="image-div">
              <img className="img" src={item.imageUrl} alt={item.name} />
            </div>
            <div className="card-body">
              <div className="body-div">{item.brand}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Closet; */

/* 
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";
import "./css/Closet.css";

interface ClosetProps {
  onDragStart?: (item: any) => (e: React.DragEvent) => void;
}

const Closet = ({ onDragStart }: ClosetProps) => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);

  return (
    <div className="card-container">
      <div className="card-div">
        {items.map((item) => (
          <div key={item.id} className="card">
            <div className="image-div">
              <img
                className="img"
                src={item.imageUrl}
                alt={item.name}
                draggable
                onDragStart={onDragStart ? onDragStart(item) : undefined}
              />
            </div>
            <div className="card-body">
              <div className="body-div">{item.brand}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Closet;
 */

import { useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useFetchItems } from "../hooks/useFetchItems";
import { useFetchOutfits } from "../hooks/useFetchOutfits";
import "./css/Closet.css";

interface ClosetProps {
  onDragStart?: (item: any) => (e: React.DragEvent) => void;
}

const Closet = ({ onDragStart }: ClosetProps) => {
  const user = useCurrentUser();
  const userId = user?.id;

  const items = useFetchItems(userId);
  const outfits = useFetchOutfits(userId);

  const [activeTab, setActiveTab] = useState<"clothing" | "outfit">("clothing");

  const dataToDisplay = activeTab === "clothing" ? items : outfits;

  return (
    <div className="closet-wrapper">
      <div className="tab-switch">
        <button
          className={activeTab === "clothing" ? "tab active" : "tab"}
          onClick={() => setActiveTab("clothing")}
        >
          clothing
        </button>
        <button
          className={activeTab === "outfit" ? "tab active" : "tab"}
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
                  onDragStart={onDragStart ? onDragStart(entry) : undefined}
                />
              </div>
              <div className="card-body">
                <div className="body-div">
                  {activeTab === "clothing" ? entry.brand : "outfit"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Closet;
