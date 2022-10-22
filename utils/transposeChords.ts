import { getChords } from "./chordDetection";

/**
 * This method recives a line of text and a number of semitones to transpose
 * Then returns:
 * - the line with the chords transposed
 * - the original line if the line doesn't have chords
 */
export const transportChords = (line: string, semitones: number) => {
  const chords = getChords(line);

  if (chords.length === 0) return line;

  // traspose them to the new key
  const newChords = chords.map((chord) => {
    const newChord = transposeChord(chord, semitones);
    return newChord;
  });

  let returnLine = line;
  // replace the chords in the text
  chords.forEach((chord, index) => {
    returnLine = returnLine.replace(chord, newChords[index]);
  });
  return returnLine;
};

const transposeChord = (chord: string, semitones: number) => {
  const rootNote = chord.match(/[A-G][#b]?/g)?.[0] || "C";

  const restOfChord = chord.replace(rootNote, "");

  const newRootNote = transpose(rootNote, semitones);

  return newRootNote + restOfChord;
};

const scale = [
  "B#",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "E#",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const scaleBemol = [
  "Cb",
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "Fb",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

const transpose = (note: string, semitones: number) => {
  const useBemol = note.includes("b");

  let noteIndex = useBemol ? scaleBemol.indexOf(note) : scale.indexOf(note);
  if (noteIndex === -1) return note;

  const newNoteIndex = noteIndex + semitones;

  // get the new note handling the edge cases (out of range)
  const newNote = useBemol
    ? scaleBemol[newNoteIndex] || scaleBemol[Math.abs(newNoteIndex - 13)]
    : scale[newNoteIndex] || scale[Math.abs(newNoteIndex - 13)];

  return newNote;
};
