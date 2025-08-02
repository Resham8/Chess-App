import { Link } from "react-router-dom";
import Button from "../components/Button";
import SideBar from "../components/Sidebar";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center">
      <SideBar/>
      <div className="flex-1 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src="chess_board.png"
              alt="Chess Board"
              className="max-w-sm w-full"
            />
          </div>
          
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-white">
              Play Chess Online
            </h1>
            <Link to="/game/random">
              <Button label="Play Online"/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
