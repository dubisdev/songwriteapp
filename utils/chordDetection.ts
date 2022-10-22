export const getChords = (text: string) => {
  const cleanLine = text.trim();

  const chords = cleanLine.match(/([A-G][#b]?m?\d?)/g);
  if (!chords) return [];

  const words = cleanLine.split(" ").filter((word) => word !== "");

  const isChordsLine = chords.length === words.length;

  return isChordsLine ? chords : [];
};

export const createHTMLForChords = (line: string, chords: string[]) => {
  let processedResult = "";
  let pendingLine = line;

  chords.forEach((chord) => {
    // adds the space previous to chord
    processedResult += pendingLine.substring(0, pendingLine.indexOf(chord));

    // adds the chord with the html tag
    processedResult += `<span style="color: red;">${chord}</span>`;

    // removes the chord from the pending line
    pendingLine = pendingLine.substring(
      pendingLine.indexOf(chord) + chord.length
    );
  });

  return processedResult + "\n";
};
