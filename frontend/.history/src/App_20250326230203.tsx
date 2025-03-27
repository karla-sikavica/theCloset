import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Collage from "./components/ui/Collage";

function App() {
  return (
    <Router>
      {/* Global collage background */}
      <Collage />

      {/* Foreground routes */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
