import create from "zustand";

interface SongState {
  showTransposeModal: boolean;
  setShowTransposeModal: (showTransposeModal: boolean) => void;
  toggleTransposeModal: () => void;

  semitones: number;
  setSemitones: (semitones: number) => void;
  addSemitones: (semitones: number) => void;
}

export const useStore = create<SongState>()((set) => ({
  showTransposeModal: false,
  semitones: 0,

  setShowTransposeModal: (newState: boolean) =>
    set({ showTransposeModal: newState }),

  toggleTransposeModal: () =>
    set((state) => ({ showTransposeModal: !state.showTransposeModal })),

  setSemitones: (semitones: number) => set({ semitones }),

  addSemitones: (semitones: number) =>
    set((state) => ({ semitones: state.semitones + semitones })),
}));
