import { Dropdown } from "flowbite-react";
import { useStore } from "../utils/state";

const Transpose = () => {
  const addSemitones = useStore((s) => s.addSemitones);
  const setSemitones = useStore((s) => s.setSemitones);

  return (
    <Dropdown label="Transpose" dismissOnClick={false} placement="right-start">
      <Dropdown.Item onClick={() => setSemitones(0)}>Original</Dropdown.Item>
      <Dropdown.Item onClick={() => addSemitones(2)} className="w-32">
        +1 Tone
      </Dropdown.Item>
      <Dropdown.Item onClick={() => addSemitones(-2)}>-1 Tone</Dropdown.Item>
      <Dropdown.Item onClick={() => addSemitones(+1)}>+½ Tone</Dropdown.Item>
      <Dropdown.Item onClick={() => addSemitones(-1)}>-½ Tone</Dropdown.Item>
    </Dropdown>
  );
};

export default Transpose;
