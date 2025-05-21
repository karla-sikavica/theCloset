import React, { useState, useEffect } from "react";
import "../css/AddOutfit.css";
import Items from "./Items";
import { BsArrowsFullscreen } from "react-icons/bs";

interface ClothingItem {
  id: number;
  name: string;
  imageUrl: string;
}

const AddOutfit = () => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [resizingIndex, setResizingIndex] = useState<number | null>(null);
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
      aspectRatio: number; // ✅ NOVO
    }[]
  >([]);

  const handleDrop = (e: React.DragEvent) => {
    const data = e.dataTransfer.getData("application/json");
    const item: ClothingItem = JSON.parse(data);
    const canvasRect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    // dodaj omjer
    const initialWidth = 100;
    const initialHeight = 100;
    const aspectRatio = initialWidth / initialHeight;

    setItemsOnCanvas((prev) => [
      ...prev,
      {
        item,
        x,
        y,
        width: initialWidth,
        height: initialHeight,
        aspectRatio,
      },
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

  const handleResizeMouseDown = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setResizingIndex(index);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const canvas = document.querySelector(".canvas") as HTMLDivElement;
    const canvasRect = canvas.getBoundingClientRect();

    if (draggingIndex !== null) {
      const x = e.clientX - canvasRect.left - offset.x;
      const y = e.clientY - canvasRect.top - offset.y;

      setItemsOnCanvas((prev) =>
        prev.map((entry, idx) =>
          idx === draggingIndex ? { ...entry, x, y } : entry
        )
      );
    }

    if (resizingIndex !== null) {
      setItemsOnCanvas((prev) =>
        prev.map((entry, idx) => {
          if (idx === resizingIndex) {
            const aspectRatio = entry.width / entry.height;

            // promjena u širini (ili koristi movementY ako želiš po visini)
            const delta = e.movementX;

            const newWidth = Math.max(30, entry.width + delta);
            const newHeight = Math.max(30, newWidth / aspectRatio);

            return {
              ...entry,
              width: newWidth,
              height: newHeight,
            };
          }
          return entry;
        })
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
    setResizingIndex(null);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingIndex, resizingIndex]);

  return (
    <div className="outfit-container">
      <div
        className="canvas"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {itemsOnCanvas.map((entry, index) => (
          <div
            key={index}
            className="canvas-item-wrapper"
            style={{
              top: `${entry.y}px`,
              left: `${entry.x}px`,
              width: `${entry.width}px`,
              height: `${entry.height}px`,
            }}
            onMouseDown={(e) => handleMouseDown(e, index, entry.x, entry.y)}
          >
            <img
              src={entry.item.imageUrl}
              alt={entry.item.name}
              className="canvas-item"
              style={{ width: "100%", height: "100%" }}
            />
            <div
              className="resize-handle"
              onMouseDown={(e) => handleResizeMouseDown(e, index)}
            >
              <BsArrowsFullscreen />
            </div>
          </div>
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
