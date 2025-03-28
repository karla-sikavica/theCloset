import React from "react";
import "../css/Collage.css";

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
    src: "/images/photo (0).svg", // Fixed filename
    top: "45%",
    left: "0%",
    width: "250px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    src: "/images/photo (1).png", // Fixed filename
    top: "45%",
    left: "0%",
    width: "250px",
    rotate: "0deg",
    zIndex: 2,
  },
];

const Collage: React.FC = () => {
  return (
    <div className="collage-background">
      {collageConfig.map((img, index) => (
        <svg
          key={index}
          className="collage-svg"
          style={{
            position: "absolute",
            top: img.top,
            left: img.left,
            width: img.width,
            zIndex: img.zIndex || 0,
            transform: `rotate(${img.rotate || "0deg"})`,
          }}
          viewBox="0 0 500 500"
        >
          <defs>
            <mask id={`mask-${index}`}>
              {/* Use a rectangle with a white fill for visibility */}
              <rect width="500" height="500" fill="white" />
              <image href={img.src} width="500" height="500" />
            </mask>
          </defs>
          <image
            href={img.src}
            width="500"
            height="500"
            mask={`url(#mask-${index})`}
            className="collage-img"
          />
        </svg>
      ))}
    </div>
  );
};

export default Collage;
