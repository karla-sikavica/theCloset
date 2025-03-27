import { motion } from "framer-motion";
import { useState } from "react";

// Array of images
const images = [
  { id: 1, src: "/images/photo1.png", alt: "Item 1" },
  { id: 2, src: "/images/photo2.png", alt: "Item 2" },
  { id: 3, src: "/images/photo3.png", alt: "Item 3" },
  { id: 4, src: "/images/photo4.png", alt: "Item 4" },
  { id: 5, src: "/images/photo5.png", alt: "Item 5" },
  { id: 6, src: "/images/photo6.png", alt: "Item 6" },
  { id: 7, src: "/images/photo7.png", alt: "Item 7" },
  { id: 8, src: "/images/photo8.png", alt: "Item 8" },
];
import React, { useEffect, useRef } from "react";
import "../css/Collage.css";

const imageCount = 32;

const Collage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const imgs = container.querySelectorAll("img");
    imgs.forEach((img) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const rotate = Math.random() * 20 - 10; // rotate between -10 and +10 degrees
      const z = Math.floor(Math.random() * 10); // random z-index

      img.style.top = `${y}vh`;
      img.style.left = `${x}vw`;
      img.style.transform = `rotate(${rotate}deg)`;
      img.style.zIndex = z.toString();
    });
  }, []);

  return (
    <div className="collage-background" ref={containerRef}>
      {[...Array(imageCount)].map((_, index) => (
        <img
          key={index}
          src={`/images/img${index + 1}.png`} // adjust this path to your setup
          alt={`collage-img-${index}`}
          className="collage-img"
        />
      ))}
    </div>
  );
};

export default Collage;
