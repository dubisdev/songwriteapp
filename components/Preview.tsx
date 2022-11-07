import { FC, useEffect, useRef, useState } from "react";
import { createHTMLForChords, getChords } from "../utils/chordDetection";
import { useStore } from "../utils/state";
import { transportChords } from "../utils/transposeChords";
import { CopyToClipboard } from "./CopyToClipboard";
import { DownloadPDF } from "./DownloadPDF";
import SaveToAccount from "./SaveToAccount";
import Transpose from "./Transpose";

export const Preview: FC = () => {
  const [text, songName, semitones] = useStore((s) => [
    s.text,
    s.songName,
    s.semitones,
  ]);
  const [lines, setLines] = useState<string[]>([]);

  const preview = useRef(null);

  useEffect(() => {
    const separatedText = text.split("\n");
    setLines(separatedText.map((line) => transportChords(line, semitones)));
  }, [text, semitones]);

  return (
    <div>
      <header className="mb-3">
        <h2 className="font-bold inline mr-2">Live Preview</h2>
      </header>

      <div className="border-2 border-black rounded-md min-h-full mb-2">
        <div ref={preview} className="py-3 px-16">
          <h2 className="text-center font-bold mb-8 text-3xl">{songName}</h2>
          <pre className="whitespace-pre-wrap break-words text-lg">
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
                />
              );
            })}
          </pre>
        </div>
      </div>

      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold rounded py-1 px-2 mr-2"
        onClick={(e) => {
          navigator.clipboard.writeText(window.location.href);
        }}
      >
        Share Link
      </button>

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
      <CopyToClipboard />
      <DownloadPDF previewref={preview} title={songName} />
      <SaveToAccount />
      <Transpose />
    </div>
  );
};
