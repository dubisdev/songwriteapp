import type { FC, RefObject } from "react";
import jsPDF from "jspdf";

type DownloadPDFProps = {
  previewref: RefObject<HTMLElement>;
  title: string;
};

export const DownloadPDF: FC<DownloadPDFProps> = ({ previewref, title }) => {
  const handleDownload = () => {
    const content = previewref.current;

    const doc = new jsPDF();
    doc.html(content!, {
      callback: function (doc) {
        doc.save(`${title}.pdf`);
      },
      html2canvas: { scale: 0.222 },
    });
  };

  return (
    <button
      className="bg-red-400 hover:bg-red-600 text-white font-bold rounded py-1 px-2 mr-2"
      onClick={handleDownload}
    >
      Download PDF
    </button>
  );
};
