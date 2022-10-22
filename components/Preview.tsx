import { FC, useEffect, useState } from "react";
import { createHTMLForChords, getChords } from "../utils/chordDetection";
import { transportChords } from "../utils/transposeChords";
import { CopyToClipboard } from "./CopyToClipboard";

export const Preview: FC<{ text: string; songName: string }> = ({
  text,
  songName,
}) => {
  const [lines, setLines] = useState<string[]>([]);
  const displaySongName = songName || "Your Amazing Song Name 🎶";

  useEffect(() => {
    setLines(text.split("\n"));
  }, [text]);

  return (
    <div>
      <header className="mb-3">
        <h2 className="font-bold inline mr-2">Live Preview</h2>
      </header>

      <div className="py-3 px-10 border-2 border-black rounded-md min-h-full mb-2">
        <h2 className="text-center font-bold mb-5">{displaySongName}</h2>
        <pre className="whitespace-pre-wrap break-words">
          {lines.map((line, index) => {
            const chords = getChords(line);
            const isChordsLine = chords.length > 0;
            if (!isChordsLine) return line + "\n";
            return (
              <span
                key={index}
                dangerouslySetInnerHTML={{
                  __html: createHTMLForChords(line, chords),
                }}
              ></span>
            );
          })}
        </pre>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-1 px-2 mr-2"
        onClick={(e) => {
          setLines((prevLines) =>
            prevLines.map((line) => transportChords(line, 2))
          );
        }}
      >
        Transpose +1
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-1 px-2 mr-2"
        onClick={(e) => {
          setLines((prevLines) =>
            prevLines.map((line) => transportChords(line, -2))
          );
        }}
      >
        Transpose -1
      </button>
      <CopyToClipboard lines={lines} title={displaySongName} />
      <input
        className="px-2 py-1"
        type="color"
        onChange={(e) => {
          document.documentElement.style.setProperty(
            "--cords-color",
            e.target.value
          );
        }}
      />
    </div>
  );
};
