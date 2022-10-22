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
      <h2 className="text-center font-bold">{songName}</h2>
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
      <button
        onClick={(e) => {
          setLines((prevLines) => {
            return prevLines.map((line) => transportChords(line, 2));
          });
        }}
      >
        +1
      </button>
    </div>
  );
};
