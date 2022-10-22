import { FC, useState } from "react";

export const CopyToClipboard: FC<{ lines: string[]; title: string }> = ({
  lines,
  title,
}) => {
  const [text, setText] = useState("Copy To Clipboard");

  const handleClick = () => {
    navigator.clipboard.writeText(title + "\n\n" + lines.join("\n"));
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
