import { useEffect, useRef } from "react";
import { useStore } from "../../stores/editorState";

const TransposeModal = () => {
  const visible = useStore((state) => state.showTransposeModal);
  const setModalVisible = useStore((state) => state.setShowTransposeModal);
  const ref = useRef<HTMLDivElement>(null);
  const addSemitones = useStore((s) => s.addSemitones);
  const setSemitones = useStore((s) => s.setSemitones);

  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setModalVisible(false);
        event.preventDefault();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [setModalVisible]);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      className="w-5/6 md:w-auto overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 z-50 md:p-4"
    >
      <div className="h-full md:h-auto w-full">
        <div className="text-xl bg-white text-gray-900 rounded-lg shadow dark:bg-gray-700 dark:text-white py-6 px-6 lg:px-8 inline-flex flex-wrap w-full gap-3 items-center justify-center">
          <TransposeButton text="-1/2" onClick={() => addSemitones(-1)} />
          <TransposeButton text="-1" onClick={() => addSemitones(-2)} />
          <TransposeButton text="+1" onClick={() => addSemitones(2)} />
          <TransposeButton text="+1/2" onClick={() => addSemitones(1)} />
          <TransposeButton text="Reset" onClick={() => setSemitones(0)} />
        </div>
      </div>
    </div>
  );
};

const TransposeButton = ({ text, onClick }: { text: string; onClick: any }) => {
  return (
    <button
      onClick={onClick}
      className="w-28 justify-center text-white bg-indigo-600 hover:bg-indigo-400 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
    >
      {text}
    </button>
  );
};

export default TransposeModal;
