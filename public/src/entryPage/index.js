"use strict";
const playNowBtn = document.querySelector("#playNowBtn");
const gameTypeWindow = document.querySelector(".gameTypeWindow");
if (playNowBtn) {
    playNowBtn.addEventListener("click", () => {
        if (gameTypeWindow) {
            gameTypeWindow.style.display = "flex";
        }
    });
}
