import React, { useState } from "react";
import "../css/AddOutfit.css";
import Items from "./Items";

interface ClothingItem {
  id: number;
  name: string;
  imageUrl: string;
}

const AddOutfit = () => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [itemsOnCanvas, setItemsOnCanvas] = useState<
    {
      item: ClothingItem;
      x: number;
      y: number;
      width: number;
      height: number;
    }[]
  >([]);

  const handleDrop = (e: React.DragEvent) => {
    const data = e.dataTransfer.getData("application/json");
    const item: ClothingItem = JSON.parse(data);
    const canvasRect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    setItemsOnCanvas((prev) => [
      ...prev,
      { item, x, y, width: 100, height: 100 },
    ]);
  };

  const handleMouseDown = (
    e: React.MouseEvent,
    index: number,
    itemX: number,
    itemY: number
  ) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setDraggingIndex(index);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingIndex !== null) {
      const canvas = document.querySelector(".canvas") as HTMLDivElement;
      const canvasRect = canvas.getBoundingClientRect();
      const x = e.clientX - canvasRect.left - offset.x;
      const y = e.clientY - canvasRect.top - offset.y;

      setItemsOnCanvas((prev) =>
        prev.map((entry, idx) =>
          idx === draggingIndex ? { ...entry, x, y } : entry
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

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
            style={{ top: `${entry.y}px`, left: `${entry.x}px` }}
            onMouseDown={(e) => handleMouseDown(e, index, entry.x, entry.y)}
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
