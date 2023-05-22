const playNowBtn: HTMLButtonElement | null =
  document.querySelector("#playNowBtn");

const gameTypeWindow: HTMLDivElement | null =
  document.querySelector(".gameTypeWindow");

if (playNowBtn) {
  playNowBtn.addEventListener("click", () => {
    if (gameTypeWindow) {
      gameTypeWindow.style.display = "flex";
    }
  });
}
