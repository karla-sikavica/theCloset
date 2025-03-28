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
    src: "/images/photo%20(0).svg",
    top: "45%",
    left: "0%",
    width: "250px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    src: "/images/photo%20(1).png",
    top: "45%",
    left: "0%",
    width: "250px",
    rotate: "0deg",
    zIndex: 2,
  } /*,
  {
    src: "/images/photo%20(2).png",
    top: "30%",
    left: "25%",
    width: "400px",
    rotate: "0deg",
    zIndex: 1,
  },
  {
    src: "/images/photo%20(3).png",
    top: "18%",
    left: "40%",
    width: "350px",
    rotate: "0deg",
    zIndex: 0,
  },
  {
    src: "/images/photo%20(4).png",
    top: "-5%",
    left: "55%",
    width: "400px",
    rotate: "0deg",
    zIndex: 2,
  },
  {
    src: "/images/photo%20(5).png",
    top: "30%",
    left: "40%",
    width: "260px",
    rotate: "0deg",
    zIndex: 1,
  },
  {
    src: "/images/photo%20(6).png",
    top: "10%",
    left: "18%",
    width: "300px",
    rotate: "0deg",
    zIndex: 4,
  },
  {
    src: "/images/photo%20(7).png",
    top: "30%",
    left: "70%",
    width: "400px",
    rotate: "0deg",
    zIndex: 1,
  },
  {
    src: "/images/photo%20(8).png",
    top: "0%",
    left: "0%",
    width: "350px",
    rotate: "0deg",
    zIndex: 1,
  },
  {
    src: "/images/photo%20(9).png",
    top: "35%",
    left: "55%",
    width: "280px",
    rotate: "-6deg",
    zIndex: 2,
  },
  {
    src: "/images/photo%20(10).png",
    top: "18%",
    left: "6%",
    width: "400px",
    rotate: "15deg",
    zIndex: 1,
  },
  {
    src: "/images/photo%20(11).png",
    top: "-20%",
    left: "70%",
    width: "400px",
    rotate: "0deg",
    zIndex: 0,
  },
  {
    src: "/images/photo%20(12).png",
    top: "-20%",
    left: "10%",
    width: "350px",
    rotate: "-9deg",
    zIndex: 1,
  },
  {
    src: "/images/photo%20(13).png",
    top: "0%",
    left: "6%",
    width: "550px",
    rotate: "0deg",
    zIndex: 0,
  },
  {
    src: "/images/photo%20(14).png",
    top: "70%",
    left: "60%",
    width: "160px",
    rotate: "0deg",
    zIndex: 2,
  },
  {
    src: "/images/photo%20(15).png",
    top: "75%",
    left: "40%",
    width: "170px",
    rotate: "-8deg",
    zIndex: 3,
  },
  {
    src: "/images/photo%20(16).png",
    top: "3%",
    left: "48%",
    width: "500px",
    rotate: "3deg",
    zIndex: 0,
  },
  {
    src: "/images/photo%20(17).png",
    top: "0%",
    left: "45%",
    width: "380px",
    rotate: "0deg",
    zIndex: 1,
  },
  {
    src: "/images/photo%20(18).png",
    top: "75%",
    left: "-3%",
    width: "200px",
    rotate: "10deg",
    zIndex: 3,
  },
  {
    src: "/images/photo%20(19).png",
    top: "22%",
    left: "85%",
    width: "290px",
    rotate: "0deg",
    zIndex: 2,
  },
  {
    src: "/images/photo%20(30).png",
    top: "-20%",
    left: "80%",
    width: "300px",
    rotate: "-27deg",
    zIndex: 3,
  } ,
  {
    src: "/images/photo%20(21).png",
    top: "30%",
    left: "90%",
    width: "170px",
    rotate: "-6deg",
    zIndex: 2,
  },
  {
    src: "/images/photo%20(22).png",
    top: "65%",
    left: "5%",
    width: "160px",
    rotate: "5deg",
    zIndex: 3,
  },
  {
    src: "/images/photo%20(23).png",
    top: "60%",
    left: "20%",
    width: "180px",
    rotate: "-7deg",
    zIndex: 2,
  },
  {
    src: "/images/photo%20(24).png",
    top: "15%",
    left: "50%",
    width: "190px",
    rotate: "6deg",
    zIndex: 1,
  },
  {
    src: "/images/photo%20(25).png",
    top: "10%",
    left: "30%",
    width: "160px",
    rotate: "-4deg",
    zIndex: 3,
  },
  {
    src: "/images/photo%20(26).png",
    top: "40%",
    left: "50%",
    width: "170px",
    rotate: "11deg",
    zIndex: 2,
  },
  {
    src: "/images/photo%20(27).png",
    top: "50%",
    left: "75%",
    width: "180px",
    rotate: "-9deg",
    zIndex: 1,
  },
  {
    src: "/images/photo%20(28).png",
    top: "35%",
    left: "10%",
    width: "200px",
    rotate: "4deg",
    zIndex: 2,
  },
  {
    src: "/images/photo%20(29).png",
    top: "25%",
    left: "65%",
    width: "190px",
    rotate: "-5deg",
    zIndex: 3,
  },
  {
    src: "/images/photo%20(30).png",
    top: "70%",
    left: "85%",
    width: "160px",
    rotate: "6deg",
    zIndex: 1,
  },
  {
    src: "/images/photo%20(31).png",
    top: "80%",
    left: "35%",
    width: "170px",
    rotate: "-3deg",
    zIndex: 2,
  },
  {
    src: "/images/photo%20(32).png",
    top: "90%",
    left: "50%",
    width: "180px",
    rotate: "8deg",
    zIndex: 3,
  }, */,
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
