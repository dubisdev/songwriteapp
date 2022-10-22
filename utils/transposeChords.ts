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

  let processedResult = "";
  let pendingLine = line;

  chords.forEach((chord, index) => {
    // adds the space previous to chord
    processedResult += pendingLine.substring(0, pendingLine.indexOf(chord));

    // adds the chord with the html tag
    processedResult += newChords[index];

    // removes the chord from the pending line
    pendingLine = pendingLine.substring(
      pendingLine.indexOf(chord) + chord.length
    );
  });

  return processedResult;
};

const transposeChord = (chord: string, semitones: number) => {
  const rootNote = chord.match(/[A-G][#b]?/g)?.[0] || "C";

  const restOfChord = chord.replace(rootNote, "");

  const newRootNote = transpose(rootNote, semitones);

  console.log(chord, newRootNote + restOfChord);
  return newRootNote + restOfChord;
};

const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const scaleBemol = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

const transpose = (note: string, semitones: number) => {
  if (note === "E#") note = "F";
  if (note === "B#") note = "C";
  if (note === "Fb") note = "E";
  if (note === "Cb") note = "B";

  const useBemol = note.includes("b");

  let noteIndex = useBemol ? scaleBemol.indexOf(note) : scale.indexOf(note);
  if (noteIndex === -1) return note;

  const newNoteIndex = noteIndex + semitones;

  // get the new note handling the edge cases (out of range)
  const newNote = useBemol
    ? scaleBemol[newNoteIndex] || scaleBemol[Math.abs(newNoteIndex - 12)]
    : scale[newNoteIndex] || scale[Math.abs(newNoteIndex - 12)];

  console.log(note, newNote);

  return newNote;
};
