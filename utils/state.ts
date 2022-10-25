import create from "zustand";
import { debouncedUpdateHashedContent } from "./hashedLink";

interface SongState {
  songName: string;
  text: string;
  setSongName: (title: string) => void;
  setText: (text: string) => void;
}

export const useStore = create<SongState>()((set) => ({
  songName: "",
  text: "",

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
}));
