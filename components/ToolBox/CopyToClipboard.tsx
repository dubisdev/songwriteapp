import { useStore } from "../../stores/song";

const CopyToClipboard = () => {
  const songName = useStore((s) => s.songName);

  const handleClick = async () => {
    const $pre = document.getElementById("chords-preview");
    const content = $pre?.innerText || "";

    const clipboardContent = songName ? songName + "\n\n" + content : content;

    await navigator.clipboard.writeText(clipboardContent);

    const { toast } = await import("wc-toast");
    toast("Song copied to Clipboard!", { icon: { type: "success" } });
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
