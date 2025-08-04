import useUser from "@repo/store/useUser";
import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8080";
export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const user = useUser();

  useEffect(() => {
    if (!user) return;   
    console.log(`from useSocket:${user.token}`) 
    const ws = new WebSocket(`${WS_URL}?token=${user.token}`);
    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [user]);

  return socket;
};
