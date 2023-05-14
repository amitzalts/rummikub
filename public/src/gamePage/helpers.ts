const resetCurrentTile = () => {
  if (!currentTile) throw new Error("current tile not found.");
  currentTile.classList.remove("active");
  currentTile = undefined;
};
