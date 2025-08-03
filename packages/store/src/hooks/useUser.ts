import { useEffect } from "react";
import useUserStore from "../store/userStore";

export default function useUser() {
  const user = useUserStore((s) => s.user);
  const initialized = useUserStore((s) => s.initialized);
  const fetchUser = useUserStore((s) => s.fetchUser);

  useEffect(() => {
    if (!initialized) {
      fetchUser();
    }
  }, [initialized, fetchUser]);

  return user;
}
