import { useStore } from "../../stores/editorState";

const OpenTransposeModalButton = () => {
  const toggleTransposeModal = useStore((s) => s.toggleTransposeModal);

  return (
    <button
      onClick={(e) => {
        if (e.defaultPrevented) return;
        toggleTransposeModal();
      }}
      className="text-white bg-blue-500 hover:bg-blue-300 rounded py-1 px-2 font-bold"
      type="button"
    >
      Transpose
    </button>
  );
};

export default OpenTransposeModalButton;
