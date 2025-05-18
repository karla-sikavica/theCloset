import AutoLocationWeather from "./AutoLocationWeather";
import "../css/Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo-img-div">
        <img src="../../../public/images/Closet--logo.svg" alt="logo-img"></img>
      </div>
      <AutoLocationWeather />
    </div>
  );
};

export default Header;
