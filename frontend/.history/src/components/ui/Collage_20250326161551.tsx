import { motion } from "framer-motion";
import { useState } from "react";

const images = [
  { id: 1, src: "/images/photo1.png", alt: "Item 1" },
  { id: 2, src: "/images/photo2.png", alt: "Item 2" },
  { id: 3, src: "/images/photo3.png", alt: "Item 3" },
  { id: 4, src: "/images/photo4.png", alt: "Item 4" },
  { id: 5, src: "/images/photo5.png", alt: "Item 5" },
  { id: 6, src: "/images/photo6.png", alt: "Item 6" },
  { id: 7, src: "/images/photo7.png", alt: "Item 7" },
  { id: 8, src: "/images/photo8.png", alt: "Item 8" } /* 
  { id: 9, src: "/images/photo9.png", alt: "Item 9" },
  { id: 10, src: "/images/photo10.png", alt: "Item 10" },
  { id: 11, src: "/images/photo11.png", alt: "Item 11" }, */,
];

export default function Collage() {
  return (
    <div className="relative grid grid-cols-3 gap-4 p-6">
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

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image with grayscale effect */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-auto transition-all duration-300"
        initial={{ filter: "grayscale(100%)" }}
        animate={{ filter: hovered ? "grayscale(0%)" : "grayscale(100%)" }}
      />
    </motion.div>
  );
}
