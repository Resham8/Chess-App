import { useRef } from "react";
import Button from "../components/Button";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

export default function Login() {
  const guestName = useRef<HTMLInputElement>(null);

  function google() {
    window.open(`${BACKEND_URL}/auth/google`, "_self");
  }

  async function handelLoginAsGuest() {
    const response = await axios.post(`${BACKEND_URL}/auth/guest`, {
      name: (guestName.current && guestName.current.value) || "",
    });

    const user = response.data;
    console.log(user);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-12 text-green-500 drop-shadow-lg">
          Only Moves Matter
        </h1>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700">
          <div className="mb-8">
            <button
              className="w-full flex items-center justify-center px-4 py-3 cursor-pointer bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 shadow-md"
              onClick={google}
            >
              <img src="google.svg" alt="Google" className="w-5 h-5 mr-3" />
              Sign in with Google
            </button>
          </div>

          <div className="flex items-center mb-8">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                ref={guestName}
                placeholder="Enter username"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
            </div>

            <Button
              label="Enter as Guest"
              fullWidth
              onclick={handelLoginAsGuest}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
