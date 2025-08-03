import { create } from "zustand";

export const BACKEND_URL = "http://localhost:3001";

export interface User {
  token: string;
  id: string;
  name: string;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  initialized: boolean;
  fetchUser: () => Promise<void>;
  setUser: (newUser: User) => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isLoading: false,
  initialized: false,

  setUser: (newUser) => {
    set({ user: newUser });
  },

  fetchUser: async () => {
    const { initialized } = get();
    if (initialized) return;

    set({ isLoading: true });

    try {
      const res = await fetch(`${BACKEND_URL}/auth/refresh`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        const data: User = await res.json();
        set({ user: data, isLoading: false, initialized: true });
      } else {
        set({ user: null, isLoading: false, initialized: true });
      }
    } catch (e) {
      console.error(e);
      set({ user: null, isLoading: false, initialized: true });
    }
  },
}));

export default useUserStore;
