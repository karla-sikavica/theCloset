import React, { useState } from "react";
import "../css/AddOutfit.css";
import Items from "./Items";
import Draggable from "react-draggable";

interface ClothingItem {
  id: number;
  name: string;
  imageUrl: string;
}

const AddOutfit = () => {
  const [itemsOnCanvas, setItemsOnCanvas] = useState<
    { item: ClothingItem; x: number; y: number }[]
  >([]);

  const handleDrop = (e: React.DragEvent) => {
    const data = e.dataTransfer.getData("application/json");
    const item: ClothingItem = JSON.parse(data);
    const canvasRect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    setItemsOnCanvas((prev) => [...prev, { item, x, y }]);
  };

  return (
    <div className="outfit-container">
      <div
        className="canvas"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {itemsOnCanvas.map((entry, index) => (
          <img
            key={index}
            src={entry.item.imageUrl}
            alt={entry.item.name}
            className="canvas-item"
            style={{ top: entry.y, left: entry.x }}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData(
                "application/json",
                JSON.stringify(entry.item)
              );
              setItemsOnCanvas((prev) => prev.filter((_, i) => i !== index));
            }}
          />
        ))}
      </div>

      <div className="closet-panel">
        <Items
          onDragStart={(item: ClothingItem) => (e: React.DragEvent) =>
            e.dataTransfer.setData("application/json", JSON.stringify(item))}
        />
      </div>
    </div>
  );
};

export default AddOutfit;

/* 
import React, { useState } from "react";
import Draggable from "react-draggable";
import "../css/AddOutfit.css";
import Items from "./Items";

interface ClothingItem {
  id: number;
  name: string;
  imageUrl: string;
}

const AddOutfit = () => {
  const [itemsOnCanvas, setItemsOnCanvas] = useState<
    { item: ClothingItem; x: number; y: number }[]
  >([]);

  const handleDrop = (e: React.DragEvent) => {
    const data = e.dataTransfer.getData("application/json");
    const item: ClothingItem = JSON.parse(data);

    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    setItemsOnCanvas((prev) => [...prev, { item, x, y }]);
  };

  const handleDragStart = (item: ClothingItem) => (e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  return (
    <div className="outfit-container">
      <div
        className="canvas"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {itemsOnCanvas.map((entry, index) => (
          <Draggable key={index} defaultPosition={{ x: entry.x, y: entry.y }}>
            <div className="draggable-wrapper">
              <img
                src={entry.item.imageUrl}
                alt={entry.item.name}
                className="canvas-item"
              />
            </div>
          </Draggable>
        ))}
      </div>

      <div className="closet-panel">
        <Items onDragStart={handleDragStart} />
      </div>
    </div>
  );
};

export default AddOutfit;
 */
