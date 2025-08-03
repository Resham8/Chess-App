import { Puzzle } from "lucide-react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../../../packages/store/src/store/userStore";

export default function SideBar() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  
  return (
    <div className="w-40 bg-gray-900 h-screen flex flex-col fixed">
      <div className="flex flex-col gap-2">
        <div className="flex text-white font-extrabold text-center py-3 px-4 text-2xl bg-gray-300/25">
          <span className="block">♞</span>
          <div>CHESS</div>
        </div>
        <Link to={"/game/random"}>
          <div className="py-3 px-5 mx-2 text-white text-xl font-bold flex gap-1.5 rounded-lg bg-gray-300/10">
            <Puzzle stroke="#49F527" /> <span>Play</span>
          </div>
        </Link>
      </div>
      <div className="flex mt-auto py-3 justify-center px-2.5">
        <Button
          label={`${user ? "Logout" : "Login"}`}
          fullWidth
          onclick={() => {
            navigate("/login");
          }}
        />
      </div>
    </div>
  );
}
