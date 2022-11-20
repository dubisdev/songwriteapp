import jsPDF from "jspdf";
import { useStore } from "../../stores/editorState";
import { useStore as useSongStore } from "../../stores/song";

const DownloadPDF = () => {
  const title = useSongStore((s) => s.songName);
  const previewRef = useStore((s) => s.previewRef);

  const handleDownload = () => {
    const content = previewRef?.current;

    const doc = new jsPDF();
    doc.html(content!, {
      callback: function (doc) {
        doc.save(`${title}.pdf`);
      },
      width: 200,
      windowWidth: 1080,
      autoPaging: "text",
      margin: [10, 0, 10, 0],
    });
  };

  return (
    <button
      className="bg-red-400 hover:bg-red-600 text-white font-bold rounded py-1 px-2"
      onClick={handleDownload}
    >
      Download PDF
    </button>
  );
};

export default DownloadPDF;
