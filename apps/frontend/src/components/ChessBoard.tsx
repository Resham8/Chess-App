import type { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/Game";

export default function ChessBoard({
  board,
  socket,
  setBoard,
  chess,
}: {
  setBoard: any;
  chess: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) {
  const [from, setFrom] = useState<Square | null>(null);
  const [to, setTo] = useState<Square | null>(null);
  const pieceSymbols: Record<string, string> = {
    pw: "/wp.png",
    pb: "/bp.png",
    nw: "/wn.png",
    nb: "/bn.png",
    bw: "/wb.png",
    bb: "/bb.png",
    rw: "/wr.png",
    rb: "/br.png",
    qw: "/wq.png",
    qb: "/bp.png",
    kw: "/wk.png",
    kb: "/bk.png",
  };

  return (
    <div className="text-white">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepesentation = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;
              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepesentation);
                    } else {
                      const to = squareRepesentation;
                      socket.send(
                        JSON.stringify({
                          type: MOVE,

                          payload: {
                            move: {
                              from,
                              to: squareRepesentation,
                            },
                          },
                        })
                      );

                      setFrom(null);
                      chess.move({
                        from,
                        to,
                      });

                      console.log({ from, to });
                      setBoard(chess.board());
                    }
                  }}
                  key={j}
                  className={`w-16 h-16 font-bold text-black cursor-pointer ${
                    (i + j) % 2 === 0 ? "bg-yellow-900" : "bg-yellow-100"
                  }`}
                >
                  <div className="flex h-full justify-center items-center text-3xl">
                    {square ? (
                      <img src={pieceSymbols[square.type + square.color[0]]} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
