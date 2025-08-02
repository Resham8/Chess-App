import { useEffect, useState } from "react";
import Button from "../components/Button";


import { Chess } from "chess.js";
import { useSocket } from "../hooks/useSocket";
import ChessBoard from "../components/ChessBoard";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export default function Game() {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:          
          setBoard(chess.board());
          console.log("game initialized");
          break;
        case MOVE: {
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("move made");
          break;
        }
        case GAME_OVER:
          console.log("game over");
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;
  return (
    <div className="flex justify-center">
      <div className="pt-8  max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4 w-full flex justify-center">
            <ChessBoard setBoard={setBoard} socket={socket} board={board} chess={chess}/>
          </div>
          <div className="col-span-2 bg-slate-600 w-full flex justify-center">
            <div className="pt-5">
            <Button
              label={"Play"}
              onclick={() => {
                socket.send(
                  JSON.stringify({
                    type: INIT_GAME,
                  })
                );
              }}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}