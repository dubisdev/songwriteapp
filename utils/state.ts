import create from "zustand";
import { debouncedUpdateHashedContent } from "./hashedLink";

interface SongState {
  songName: string;
  text: string;
  semitones: number;
  setSongName: (title: string) => void;
  setText: (text: string) => void;
  setSemitones: (semitones: number) => void;
  addSemitones: (semitones: number) => void;
}

export const useStore = create<SongState>()((set) => ({
  songName: "",
  text: "",
  semitones: 0,

  setSongName: (songName: string) => {
    set((state) => {
      (songName || (!songName && state.songName)) &&
        debouncedUpdateHashedContent({ title: songName, content: state.text });
      return { songName };
    });
  },

  setText: (text: string) =>
    set((state) => {
      (text || (!text && state.text)) &&
        debouncedUpdateHashedContent({ title: state.songName, content: text });
      return { text };
    }),

  setSemitones: (semitones: number) => set({ semitones }),

  addSemitones: (semitones: number) =>
    set((state) => ({ semitones: state.semitones + semitones })),
}));
