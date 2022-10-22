import { FC } from "react";
import TextareaAutosize from "react-autosize-textarea";

export const Editor: FC<{
  songName: string;
  setSongName: Function;
  text: string;
  onChange: Function;
}> = ({ text, onChange, songName, setSongName }) => {
  return (
    <div className="text-center">
      <header className="mb-3">
        <h2 className="text-start font-bold inline mr-2">Song Editor</h2>
        <input
          placeholder="Your Amazing song Name 🎶"
          className="outline outline-2 outline-gray-900 rounded-md w-1/2 text-center"
          type="text"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
      </header>

      <TextareaAutosize
        defaultValue={text}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder="Here goes your song!"
        className="min-h-[80vh] w-full resize-none p-3 border-2 border-gray-300 rounded-sm font-mono"
      />
    </div>
  );
};
