const playNowBtn: HTMLButtonElement | null =
  document.querySelector("#playNowBtn");

const gameTypeWindow: HTMLDivElement | null =
  document.querySelector(".gameTypeWindow");

if (playNowBtn) {
  playNowBtn.addEventListener("click", () => {
    console.log("click");
    if (gameTypeWindow) {
      gameTypeWindow.style.display = "flex";
    }
  });
}
