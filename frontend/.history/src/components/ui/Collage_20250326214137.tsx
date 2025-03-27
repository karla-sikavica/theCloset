import React, { useEffect, useRef } from "react";
import "../css/Collage.css";

/* const imageCount = 32;
 */
type CollageImage = {
  src: string;
  top: string;
  left: string;
  width: string;
  rotate?: string;
  zIndex?: number;
};

const collageConfig: CollageImage[] = [
  {
    src: "/images/photo%20(1).png",
    top: "5%",
    left: "10%",
    width: "180px",
    rotate: "-5deg",
    zIndex: 2,
  },
  {
    src: "/images/photo%20(2).png",
    top: "20%",
    left: "15%",
    width: "200px",
    rotate: "10deg",
    zIndex: 1,
  },
  // ...repeat for all 32 images with custom positions
];

const Collage: React.FC = () => {
  return (
    <div className="collage-background">
      {collageConfig.map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt={`collage-img-${index}`}
          className="collage-img"
          style={{
            top: img.top,
            left: img.left,
            width: img.width,
            transform: `rotate(${img.rotate || "0deg"})`,
            zIndex: img.zIndex || 0,
          }}
        />
      ))}
    </div>
  );
};

export default Collage;

/* 
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
          src={`/images/photo%20(${index + 1}).png`}
          alt={`collage-img-${index}`}
          className="collage-img"
        />
      ))}
    </div>
  );
};

export default Collage; */
