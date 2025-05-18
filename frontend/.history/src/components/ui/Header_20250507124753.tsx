import AutoLocationWeather from "./AutoLocationWeather";
import "../css/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <button className="logo-img-btn" onClick={() => navigate("/home")}>
        <img
          src="../../../public/images/Closet--logo.svg"
          alt="logo-img"
          className="logo-img"
        ></img>
      </button>

      <AutoLocationWeather />
    </div>
  );
};

export default Header;
