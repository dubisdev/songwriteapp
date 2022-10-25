export const getChords = (line: string) => {
  let cleanLine = line.trim();

  // removes comments from line
  const commentMatches = cleanLine.matchAll(/\([^\)]*\)/g);
  Array.from(commentMatches).forEach((match) => {
    cleanLine = cleanLine.replace(match[0], "");
  });

  // removes symbols from line
  cleanLine = cleanLine.replace(/[^\w\d\s#]/g, " ").trim();

  const chordCandidates = cleanLine.split(" ").filter((word) => word !== "");

  const results = chordCandidates.map((chord) =>
    //chord.match(/([A-G](##?|♯♯?|♮♮?|𝄪|x|bb?|♭♭?)?m?\d?$)/)
    chord.match(/([A-G](##?|bb?)?(m|maj|M)?(\d\d?)?$)/)
  );

  if (results.includes(null)) return [];

  return results.map((res) => res![0]);
};

export const createHTMLForChords = (line: string, chords: string[]) => {
  let processedResult = "";
  let pendingLine = line;

  chords.forEach((chord) => {
    // adds the space previous to chord
    processedResult += pendingLine.substring(0, pendingLine.indexOf(chord));

    // adds the chord with the html tag
    processedResult += `<span style="color: var(--cords-color);">${chord}</span>`;

    // removes the chord from the pending line
    pendingLine = pendingLine.substring(
      pendingLine.indexOf(chord) + chord.length
    );
  });

  return processedResult + pendingLine + "\n";
};
