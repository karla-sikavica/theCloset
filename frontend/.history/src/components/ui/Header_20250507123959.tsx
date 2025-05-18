import AutoLocationWeather from "./AutoLocationWeather";
import "../css/Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <img
        src="../../../public/images/Closet--logo.svg"
        alt="logo-img"
        className="logo-img"
      ></img>
      <AutoLocationWeather />
    </div>
  );
};

export default Header;
