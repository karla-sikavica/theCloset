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
          src={`/images/photo%20(${index + 1}).png`}
          alt={`collage-img-${index}`}
          className="collage-img"
        />
      ))}
    </div>
  );
};

export default Collage;
