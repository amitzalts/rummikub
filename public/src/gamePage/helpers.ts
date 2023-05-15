const resetCurrentTile = () => {
  if (!currentTile) throw new Error("current tile not found.");
  currentTile.classList.remove("active");
  currentTile = undefined;
};

const compareArrays = (a: Array<HTMLDivElement>, b: Array<HTMLDivElement>) =>
  a.length === b.length;

  // && a.every((element, index) => element === b[index])