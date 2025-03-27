import { motion } from "framer-motion";
import { useState } from "react";

// Array of images with random sizes & positions
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

export default function Collage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {images.map((img) => (
        <ImageItem key={img.id} src={img.src} alt={img.alt} />
      ))}
    </div>
  );
}

interface Props {
  src: string;
  alt: string;
}

function ImageItem({ src, alt }: Props) {
  const [hovered, setHovered] = useState(false);

  // Random positioning & size for collage effect
  const randomX = Math.random() * 80; // Random horizontal position
  const randomY = Math.random() * 80; // Random vertical position
  const randomSize = Math.random() * 100 + 80; // Image size between 80px - 180px
  const randomRotation = Math.random() * 30 - 15; // Rotate between -15deg to 15deg

  return (
    <motion.div
      className="absolute"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        top: `${randomY}%`,
        left: `${randomX}%`,
        width: `${randomSize}px`,
        transform: `rotate(${randomRotation}deg)`,
      }}
    >
      {/* Image with grayscale effect */}
      <motion.img
        src={src}
        alt={alt}
        className="transition-all duration-300"
        initial={{ filter: "grayscale(100%)" }}
        animate={{
          filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
          scale: hovered ? 1.1 : 1, // Slight zoom effect on hover
        }}
      />
    </motion.div>
  );
}
