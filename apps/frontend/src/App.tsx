import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./pages/Game";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";

function App() {
  return (
    <div className="h-screen bg-gray-800">
      <BrowserRouter>
        <Routes>
          <Route path=  "/" element={<LandingPage />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/game/:gameId" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
