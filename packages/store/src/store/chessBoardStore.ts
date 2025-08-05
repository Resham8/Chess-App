import { Move } from "chess.js";
import { create } from "zustand";

interface chessBoardStore {
  isBoardFlipped: boolean;
  setIsBoardFlipped: (flipped: boolean) => void;

  moves: Move[];
  setMoves: (moves: Move[]) => void;
  addMove: (move: Move) => void;

  userSelectedMoveIndex: number | null;
  setUserSelectedMoveIndex: (index: number | null) => void;
}

export const useChessBoardStore = create<chessBoardStore>((set) => ({
  isBoardFlipped: false,
  setIsBoardFlipped: (flipped) => set({ isBoardFlipped: flipped }),

  moves: [],
  setMoves: (moves) => set({ moves }),
  addMove: (move) => set((state) => ({ moves: [...state.moves, move] })),

  userSelectedMoveIndex: null,
  setUserSelectedMoveIndex: (index) => set({ userSelectedMoveIndex: index }),
}));
