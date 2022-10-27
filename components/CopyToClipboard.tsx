"use client";

import { FC, useState } from "react";
import { useStore } from "../utils/state";

export const CopyToClipboard: FC = () => {
  const [songContent, songName] = useStore((s) => [s.text, s.songName]);

  const [text, setText] = useState("Copy To Clipboard");

  const handleClick = () => {
    navigator.clipboard.writeText(songName + "\n\n" + songContent);
    setText("☑️ Copied!");

    setTimeout(() => {
      setText("Copy To Clipboard");
    }, 1500);
  };

  return (
    <button
      className="bg-orange-400 hover:bg-orange-600 text-white font-bold rounded py-1 px-2"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
