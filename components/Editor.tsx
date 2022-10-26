"use client";

import { FC, useEffect } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { useStore } from "../utils/state";

type EditorProps = {
  content: string;
  title: string;
};

export const Editor: FC<EditorProps> = ({ content, title }) => {
  const setSongName = useStore((s) => s.setSongName);
  const setText = useStore((state) => state.setText);

  useEffect(() => {
    setSongName(title);
    setText(content);
  }, [content, title]);

  return (
    <div className="text-center">
      <header className="mb-3">
        <h2 className="text-start font-bold inline mr-2">Song Editor</h2>
        <input
          placeholder="Your Amazing song Name 🎶"
          className="outline outline-2 outline-gray-900 rounded-md w-1/2 text-center"
          type="text"
          defaultValue={title}
          onChange={(e) => setSongName(e.target.value)}
        />
      </header>

      <TextareaAutosize
        defaultValue={content}
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="Here goes your song!"
        className="min-h-full w-full resize-none p-3 border-2 border-gray-300 rounded-sm font-mono"
      />
    </div>
  );
};
