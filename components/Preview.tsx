import { FC, useEffect, useState } from "react";
import { createHTMLForChords, getChords } from "../utils/chordDetection";
import { transportChords } from "../utils/transposeChords";

export const Preview: FC<{ text: string; songName: string }> = ({
  text,
  songName,
}) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    setLines(text.split("\n"));
  }, [text]);

  return (
    <div>
      <header className="mb-3">
        <h2 className="font-bold inline mr-2">Live Preview</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-2 mr-2"
          onClick={(e) => {
            setLines((prevLines) => {
              return prevLines.map((line) => transportChords(line, 2));
            });
          }}
        >
          Traspose +1
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-2"
          onClick={(e) => {
            setLines((prevLines) => {
              return prevLines.map((line) => transportChords(line, +11));
            });
          }}
        >
          Traspose -1
        </button>
      </header>

      <div className="py-3 px-10 border-2 border-black rounded-md min-h-[80vh]">
        <h2 className="text-center font-bold mb-5">
          {songName || "Your Amazing Song Name 🎶"}
        </h2>
        <pre className="whitespace-pre-wrap break-words">
          {lines.map((line) => {
            const isChordsLine = getChords(line).length > 0;
            if (!isChordsLine) return line + "\n";
            return (
              <span
                key={line}
                dangerouslySetInnerHTML={{
                  __html: createHTMLForChords(line, getChords(line)),
                }}
              ></span>
            );
          })}
        </pre>
      </div>
    </div>
  );
};
