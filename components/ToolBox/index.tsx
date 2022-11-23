import CopyToClipboard from "./CopyToClipboard";
import DownloadPDF from "./DownloadPDF";
import SaveToAccount from "./SaveToAccount";
import Transpose from "./TransposeButton";
import TransposeModal from "./TransposeModal";

const ToolBox = () => {
  return (
    <div className="fixed bottom-0 md:bottom-10 left-0 right-0 flex items-center justify-center p-3 gap-3 bg-slate-700 w-fit m-auto md:rounded-xl flex-wrap">
      <ShareLink />

      <ChordColorSelector />
      <CopyToClipboard />
      <DownloadPDF />
      <SaveToAccount />
      <Transpose />
      <TransposeModal />
    </div>
  );
};

const ShareLink = () => {
  const handleClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
    const { toast } = await import("wc-toast");
    toast("Link copied to Clipboard!", { icon: { type: "success" } });
  };
  return (
    <button
      className="bg-purple-500 hover:bg-purple-700 text-white font-bold rounded py-1 px-2"
      onClick={handleClick}
    >
      Share Link
    </button>
  );
};

const ChordColorSelector = () => (
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
);

export default ToolBox;
