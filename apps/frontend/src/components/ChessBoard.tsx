import type { Chess, Color, PieceSymbol, Square } from "chess.js";
import { memo, useEffect, useState } from "react";
import MoveSound from "/move.wav";
import CaptureSound from "/capture.wav";
import { useChessBoardStore } from "@repo/store/chessBoardStore";

import ReactConfetti from "react-confetti";
import NumberNotation from "./chess-board/NumberNotation";

export function isPromoting(chess: Chess, from: Square, to: Square) {
  if (!from) {
    return false;
  }

  const piece = chess.get(from);

  if (piece?.type !== "p") {
    return false;
  }

  if (piece.color !== chess.turn()) {
    return false;
  }

  if (!["1", "8"].some((it) => to.endsWith(it))) {
    return false;
  }

  return chess
    .history({ verbose: true })
    .map((it) => it.to)
    .includes(to);
}

interface ChessBoardProps {
  gameId: string;
  started: boolean;
  myColor: Color;
  chess: Chess;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: React.Dispatch<
    React.SetStateAction<
      ({
        square: Square;
        type: PieceSymbol;
        color: Color;
      } | null)[][]
    >
  >;
}

const ChessBoard = ({
  gameId,
  started,
  myColor,
  chess,
  board,
  socket,
  setBoard,
}: ChessBoardProps) => {
  const isFlipped = useChessBoardStore((s) => s.isBoardFlipped);
  const setIsFlipped = useChessBoardStore((s) => s.setIsBoardFlipped);
  const move = useChessBoardStore((s) => s.moves);
  const setMoves = useChessBoardStore((s) => s.setMoves);
  const addMoves = useChessBoardStore((s) => s.addMove);
  const userSelectedMoveIndex = useChessBoardStore(
    (s) => s.userSelectedMoveIndex
  );
  const setUserSelectedMoveIndex = useChessBoardStore(
    (s) => s.setUserSelectedMoveIndex
  );
  const [gameOver, setGameOver] = useState(false);
  const [from, setFrom] = useState<null | Square>(null);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(
    null
  );
  const isMyTurn = myColor === chess.turn();
  const [legalMove, setLegalMove] = useState<string[]>([]);
  const labels = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const boxSize = 80;
  const [gameOver, setGameOver] = useState(false);
  const moveAudio = new Audio(MoveSound);
  const captureAudio = new Audio(CaptureSound);

  console.log("chessboard reloaded");

  useEffect(() => {
    if (myColor === "b") {
      setIsFlipped(true);
    }
  }, [myColor]);
  

  return (
    <>
      {gameOver && <ReactConfetti />}
      <div className="flex relative">
        <div className="text-white rounded-md overflow-hidden">
          {(isFlipped ? board.slice().reverse() : board).map((row,i) => {
            i = isFlipped ? i + 1 : 8 - i;
            return(
              <div key={i} className="flex relative">
                <NumberNotation isMainBoxColor={isFlipped ? i % 2 !== 0 : i % 2 === 0} label={i.toString()}/>
                {(isFlipped ? row.slice().reverse() : row).map((square, j) => {
                   j = isFlipped ? 7 - (j % 8) : j % 8;
                   const isMainBoxColor = (i + j) % 2 !== 0;
                    const isPiece: boolean = !!square;
                    const squareRepresentation = (String.fromCharCode(97 + j) + '' + i) as Square;
                    const isHighlightedSquare =
                      from === squareRepresentation ||
                      squareRepresentation === lastMove?.from ||
                      squareRepresentation === lastMove?.to;
                    const isRightClickedSquare = rightClickedSquares.includes(squareRepresentation);

                    const piece = square && square.type;
                    const isKingInCheckSquare = piece === 'k' && square?.color === chess.turn() && chess.inCheck();

                    return( 
                      <div onClick={()=>{}}>

                      </div>
                    )
                })}
              </div>
            )
          })}
        </div>
        <canvas
          ref={(ref) => setCanvas(ref)}
          width={boxSize * 8}
          height={boxSize * 8}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onMouseUp={(e) => e.preventDefault()}
        ></canvas>
      </div>
    </>
  );
};

export default memo(ChessBoard);
