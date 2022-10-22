import { FC } from "react";

export const Editor: FC<{
  songName: string;
  setSongName: Function;
  text: string;
  onChange: Function;
}> = ({ text, onChange, songName, setSongName }) => {
  return (
    <div className="text-center">
      <h2 className="text-start font-bold inline mr-2">Song Editor</h2>
      <input
        className="border-2 border-gray-300 rounded-md w-1/2 text-center"
        type="text"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <textarea
        defaultValue={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Here goes your song!"
        className="w-full resize-none p-3 h-[90vh] border-2 border-gray-300 rounded-sm font-mono"
      />
    </div>
  );
};
