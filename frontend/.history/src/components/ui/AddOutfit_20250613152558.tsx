import React, { useState, useEffect, useRef } from "react";
import "../css/AddOutfit.css";
import Items from "./Items";
import { BsArrowsFullscreen } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase"; // prilagodi put ako treba
import { useCurrentUser } from "../../hooks/useCurrentUser";
import domtoimage from "dom-to-image-more";
import { useFetchItems } from "../../hooks/useFetchItems";

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
  const canvasRef = useRef<HTMLDivElement>(null);
  const [colorFilter, setColorFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [showFilterTab, setShowFilterTab] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [outfitAdded, setOutfitAdded] = useState(false);
  const [itemsOnCanvas, setItemsOnCanvas] = useState<
    {
      item: ClothingItem;
      x: number;
      y: number;
      width: number;
      height: number;
      aspectRatio: number;
    }[]
  >([]);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const user = useCurrentUser();
  const userId = user?.id;
  const allItems = useFetchItems(userId);

  const filteredItems = allItems.filter((item) => {
    return (
      (colorFilter === "" || item.colors.some((c) => c === colorFilter)) &&
      (brandFilter === "" || item.brand === brandFilter) &&
      (materialFilter === "" || item.material === materialFilter) &&
      (categoryFilter === "" || item.category === categoryFilter) &&
      (seasonFilter === "" || item.season === seasonFilter)
    );
  });

  const saveOutfitToBackend = async () => {
    if (!user || !user.id) {
      alert("Niste prijavljeni.");
      return;
    }

    if (!canvasRef.current) {
      alert("Canvas nije pronađen!");
      return;
    }
    const canvasElement = canvasRef.current;

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
      await new Promise((resolve) => requestAnimationFrame(resolve));
      /*
      const canvasImage = await html2canvas(canvasElement);
      console.log("Rezultat html2canvas:", canvasImage);
      document.body.appendChild(canvasImage);

      console.log("Canvas size:", canvasImage.width, canvasImage.height);
      console.log(
        "Canvas toDataURL (skraćeno):",
        canvasImage.toDataURL().slice(0, 100)
      );

       const blob = await new Promise<Blob | null>((resolve) =>
        canvasImage.toBlob((b) => resolve(b), "image/png")
      ); */
      const blob = await domtoimage.toBlob(canvasElement);

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
        setOutfitAdded(true);
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

  useEffect(() => {
    if (outfitAdded) {
      const timer = setTimeout(() => {
        setOutfitAdded(false);
        setItemsOnCanvas([]); // Po želji očisti canvas
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [outfitAdded]);

  const uniqueBrands = Array.from(
    new Set(allItems.map((item) => item.brand).filter(Boolean))
  );

  const uniqueMaterials = Array.from(
    new Set(allItems.map((item) => item.material).filter(Boolean))
  );

  return (
    <div className="outfit-container">
      {outfitAdded ? (
        <div className="confirmation-message-outfit">your outfit is added</div>
      ) : (
        <>
          <div
            className="canvas"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="canvas-inner" ref={canvasRef}>
              {itemsOnCanvas.length === 0 && (
                <div className="canvas-placeholder">
                  drag and drop your clothes here to create an outfit
                </div>
              )}

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
                  onMouseDown={(e) =>
                    handleMouseDown(e, index, entry.x, entry.y)
                  }
                >
                  <img
                    src={entry.item.imageUrl}
                    alt={entry.item.name}
                    className="canvas-item"
                    crossOrigin="anonymous"
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
            <div
              className="filter-tab-wrapper-o"
              style={{ position: "relative" }}
            >
              <button
                ref={filterButtonRef}
                className="filters-button-o"
                onClick={() => setShowFilterTab((prev) => !prev)}
              >
                {showFilterTab ? "filters" : "filters"}
              </button>

              {showFilterTab && (
                <div className="filters-floating-modal-o">
                  <select
                    value={colorFilter}
                    onChange={(e) => setColorFilter(e.target.value)}
                  >
                    <option value="">all colors</option>
                    <option value="Red">red</option>
                    <option value="Blue">blue</option>
                    <option value="Black">black</option>
                    <option value="White">white</option>
                    <option value="Green">green</option>
                    <option value="Pink">pink</option>
                    <option value="Purple">purple</option>
                    <option value="Beige">beige</option>
                    <option value="Cream">cream</option>
                    <option value="Yellow">yellow</option>
                    <option value="Teal">teal</option>
                    <option value="Orange">orange</option>
                    <option value="Brown">brown</option>
                    <option value="Grey">grey</option>
                    <option value="Gold">gold</option>
                    <option value="Silver">silver</option>
                  </select>

                  <select
                    value={materialFilter}
                    onChange={(e) => setMaterialFilter(e.target.value)}
                  >
                    <option value="">All Materials</option>
                    <option value="cotton">Cotton</option>
                    <option value="wool">Wool</option>
                    <option value="leather">Leather</option>
                    <option value="metal">metal</option>
                    <option value="silk">silk</option>
                    <option value="polyamide">polyamide</option>
                  </select>

                  <select
                    value={seasonFilter}
                    onChange={(e) => setSeasonFilter(e.target.value)}
                  >
                    <option value="">All Seasons</option>
                    <option value="summer">Summer</option>
                    <option value="winter">Winter</option>
                    <option value="spring">Spring</option>
                    <option value="autumn">Autumn</option>
                  </select>

                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="Top">Top</option>
                    <option value="Bottom">Bottom</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="One piece">One piece</option>
                    <option value="Accessory">accessory</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Bag">Bag</option>
                    <option value="Swimwear">Swimwear</option>
                  </select>

                  {/* <select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                  >
                    <option value="">All Brands</option>
                    <option value="hm">hm</option>
                    <option value="stradivarius">Stradivarius</option>
                    <option value="gucci">gucci</option>
                  </select> */}

                  <select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                  >
                    <option value="">All Brands</option>
                    {uniqueBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <Items
              items={filteredItems}
              onDragStart={(item: ClothingItem) => (e: React.DragEvent) =>
                e.dataTransfer.setData(
                  "application/json",
                  JSON.stringify(item)
                )}
            />

            <button onClick={saveOutfitToBackend} className="submitButton">
              add outfit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddOutfit;
