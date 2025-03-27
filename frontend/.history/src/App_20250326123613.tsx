import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Closet from "./pages/Closet";
import GoogleLogin from "./components/ui/GoogleLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<GoogleLogin />} />
        <Route path="/closet" element={<Closet />} />
      </Routes>
    </Router>
  );
}

export default App;
