clearGameCookie();

const playNowBtn: HTMLButtonElement | null =
  document.querySelector("#playNowBtn");

const gameTypeWindow: HTMLDivElement | null =
  document.querySelector(".gameTypeWindow");

if (playNowBtn) {
  playNowBtn.addEventListener("click", async () => {
    const user = await fetch("http://localhost:3000/api/v1/users/getUser")
      .then((res) => res.json())
      .then(({ cookieUser }) => cookieUser)
      .catch((error) => console.error(error));
    if (!user) {
      location.href = "http://localhost:3000/signIn";
    } else {
      if (gameTypeWindow) {
        gameTypeWindow.style.display = "flex";
      }
    }
  });
}

async function clearGameCookie() {
  await fetch("api/v1/games/removeGameCookie", { method: "DELETE" });
}
