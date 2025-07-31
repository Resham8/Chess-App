import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./pages/Game";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="h-screen bg-gray-800">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
