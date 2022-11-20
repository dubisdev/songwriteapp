import { FC } from "react";
import { useStore } from "../../stores/song";

const CopyToClipboard: FC = () => {
  const [songContent, songName] = useStore((s) => [s.text, s.songName]);

  const handleClick = async () => {
    await navigator.clipboard.writeText(songName + "\n\n" + songContent);
    const { toast } = await import("wc-toast");
    toast("Copied to Clipboard!", { icon: { type: "success" } });
  };

  return (
    <button
      className="bg-orange-400 hover:bg-orange-600 text-white font-bold rounded py-1 px-2"
      onClick={handleClick}
    >
      Copy To Clipboard
    </button>
  );
};

export default CopyToClipboard;