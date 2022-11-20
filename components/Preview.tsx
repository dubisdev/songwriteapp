import { FC, useEffect, useRef, useState } from "react";
import { createHTMLForChords, getChords } from "../utils/chordDetection";
import { useStore as useSongStore } from "../stores/song";
import { useStore as useEditorStore } from "../stores/editorState";
import { transportChords } from "../utils/transposeChords";

export const Preview: FC = () => {
  const [text, songName] = useSongStore((s) => [s.text, s.songName]);
  const semitones = useEditorStore((s) => s.semitones);
  const setPreviewRef = useEditorStore((s) => s.setPreviewRef);
  const [lines, setLines] = useState<string[]>([]);

  const preview = useRef(null);

  useEffect(() => {
    const separatedText = text.split("\n");
    setLines(separatedText.map((line) => transportChords(line, semitones)));
  }, [text, semitones]);

  useEffect(() => {
    setPreviewRef(preview);
  }, [preview, setPreviewRef]);

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
    </div>
  );
};
