import jsPDF from "jspdf";
import { useStore } from "../../stores/song";

const DownloadPDF = () => {
  const title = useStore((s) => s.songName);

  const handleDownload = () => {
    const content = document.getElementById("print-region");

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
