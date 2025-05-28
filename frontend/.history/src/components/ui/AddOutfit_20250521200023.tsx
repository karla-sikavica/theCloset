import React, { useState, useEffect, useRef } from "react";
import "../css/AddOutfit.css";
import Items from "./Items";
import { BsArrowsFullscreen } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import html2canvas from "html2canvas";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase"; // prilagodi put ako treba
import { useCurrentUser } from "../../hooks/useCurrentUser";

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

  const user = useCurrentUser();

  const saveOutfitToBackend = async () => {
    if (!user || !user.id) {
      alert("Niste prijavljeni.");
      return;
    }

    const canvasElement = document.querySelector(
      ".canvas-inner"
    ) as HTMLElement;

    if (!canvasElement || itemsOnCanvas.length === 0) {
      alert("Canvas je prazan!");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 300)); // 300ms pauza

      // 1. Pretvori canvas div u sliku
      console.log("Canvas sadrži:", canvasElement.innerHTML);
      await Promise.all(
        Array.from(canvasElement.querySelectorAll("img")).map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) return resolve();
              img.onload = () => resolve();
              img.onerror = () => resolve(); // čak i ako faila
            })
        )
      );

      const canvasImage = await html2canvas(canvasElement);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvasImage.toBlob((b) => resolve(b), "image/png")
      );

      if (!blob) throw new Error("Slika se nije mogla generirati.");

      const file = new File([blob], `outfit-${Date.now()}.png`, {
        type: "image/png",
      });

      // 2. Upload na Firebase
      const storageRef = ref(storage, `outfits/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // 3. Pripremi podatke za backend
      const clothingItemIds = itemsOnCanvas.map((entry) => entry.item.id);

      const outfitData = {
        imageUrl: downloadURL,
        user: { id: user?.id },
        // ako koristiš Spring Security možeš samo ID poslati
        clothingItems: clothingItemIds.map((id) => ({ id })),
        //tags: [], // po potrebi dodaj tagove
      };

      console.log(
        "JSON koji se šalje na backend:",
        JSON.stringify(outfitData, null, 2)
      );

      // 4. Pošalji na backend
      const response = await fetch("http://localhost:8080/outfits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(outfitData),
      });

      if (response.ok) {
        alert("Outfit uspješno spremljen!");
      } else {
        console.error("Neuspješno:", await response.text());
      }
    } catch (err) {
      console.error("Greška kod spremanja outfita:", err);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    const data = e.dataTransfer.getData("application/json");
    const item: ClothingItem = JSON.parse(data);
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const canvasRef = useRef<HTMLDivElement>(null);

    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    // Učitaj sliku i dohvati prirodne dimenzije
    const img = new Image();
    img.src = item.imageUrl;

    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;

      const initialWidth = 100;
      const initialHeight = initialWidth / aspectRatio;

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
            const delta = e.movementX; // samo širina
            const newWidth = Math.max(30, entry.width + delta);
            const newHeight = newWidth / entry.aspectRatio;

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

  const handleDelete = (indexToDelete: number) => {
    setItemsOnCanvas((prev) => prev.filter((_, idx) => idx !== indexToDelete));
  };

  return (
    <div className="outfit-container">
      <div
        className="canvas"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {" "}
        <div className="canvas-inner" ref={canvasRef}>
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
              <button
                className="delete-button"
                onClick={() => handleDelete(index)}
              >
                <IoClose />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="closet-panel">
        <Items
          onDragStart={(item: ClothingItem) => (e: React.DragEvent) =>
            e.dataTransfer.setData("application/json", JSON.stringify(item))}
        />
        <button onClick={saveOutfitToBackend} className="submitButton">
          add outfit
        </button>
      </div>
    </div>
  );
};

export default AddOutfit;
