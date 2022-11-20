import CopyToClipboard from "./CopyToClipboard";
import DownloadPDF from "./DownloadPDF";
import SaveToAccount from "./SaveToAccount";
import Transpose from "./TransposeButton";
import TransposeModal from "./TransposeModal";

const ToolBox = () => {
  return (
    <div className="fixed bottom-10 left-0 right-0 flex items-center justify-center p-3 gap-3 bg-slate-700 w-fit m-auto rounded-xl flex-wrap">
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

const ShareLink = () => (
  <button
    className="bg-purple-500 hover:bg-purple-700 text-white font-bold rounded py-1 px-2"
    onClick={(e) => {
      navigator.clipboard.writeText(window.location.href);
    }}
  >
    Share Link
  </button>
);

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
