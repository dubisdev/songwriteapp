import { getChords } from "./chordDetection";

import {
  scaleSharp,
  scaleBemol,
  scaleDoubleBemol,
  scaleDoubleSharp,
} from "./noteScales";

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

  return processedResult + pendingLine;
};

const transposeChord = (chord: string, semitones: number) => {
  const rootNote = chord.match(/[A-G](##?|bb?)?/g)?.[0] || "C";

  const restOfChord = chord.replace(rootNote, "");

  const newRootNote = transpose(rootNote, semitones);

  return newRootNote + restOfChord;
};

const transpose = (note: string, semitones: number) => {
  const useBemol = note.includes("b");
  const useDoubleSharp = note.includes("##");
  const useDoubleBemol = note.includes("bb");

  let noteIndex = useBemol
    ? useDoubleBemol
      ? scaleDoubleBemol.indexOf(note)
      : scaleBemol.indexOf(note)
    : useDoubleSharp
    ? scaleDoubleSharp.indexOf(note)
    : scaleSharp.indexOf(note);

  if (noteIndex === -1) return note;

  const newNoteIndex = noteIndex + semitones;

  // get the new note handling the edge cases (out of range)
  const newNote = useBemol
    ? scaleBemol.at(newNoteIndex) || scaleBemol[newNoteIndex - 12]
    : scaleSharp.at(newNoteIndex) || scaleSharp[newNoteIndex - 12];

  return newNote;
};
