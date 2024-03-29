import { FC, useEffect } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { useStore } from "../stores/song";

type EditorProps = {
  content: string;
  title: string;
};

export const Editor: FC<EditorProps> = ({ content, title }) => {
  const setSongName = useStore((s) => s.setSongName);
  const setText = useStore((s) => s.setText);

  useEffect(() => {
    setSongName(title);
    setText(content);
  }, [content, title, setSongName, setText]);

  return (
    <div className="text-center">
      <header className="mb-3">
        <input
          placeholder="Your Amazing song Name 🎶"
          className="outline outline-2 outline-gray-900 rounded-md w-2/3 text-center p-0 text-lg"
          type="text"
          defaultValue={title}
          onChange={(e) => setSongName(e.target.value)}
        />
      </header>

      <TextareaAutosize
        defaultValue={content}
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="Here goes your song!"
        className="min-h-full w-full resize-none p-3 border-2 border-black focus:outline-gray-400 rounded font-mono"
      />
    </div>
  );
};
