import { Puzzle } from "lucide-react";
import Button from "./Button";


export default function SideBar() {
  return (
    <div className="w-40 bg-gray-900 h-screen flex flex-col fixed">
      <div className="flex flex-col gap-2">
        <div className="flex text-white font-extrabold text-center py-3 px-4 text-2xl bg-gray-300/25">
          <span className="block">♞</span>
          <div>CHESS</div>
        </div>
        <div className="py-3 px-5 mx-2 text-white text-xl font-bold flex gap-1.5 rounded-lg bg-gray-300/10">
          <Puzzle stroke="#49F527" /> <span>Play</span>
        </div>
      </div>
      <div className="flex mt-auto py-3 justify-center px-2.5">
        <Button label="Login" fullWidth />
      </div>
    </div>
  );
}
