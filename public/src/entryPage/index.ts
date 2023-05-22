const playNowBtn: HTMLButtonElement | null =
  document.querySelector("#playNowBtn");

const gameTypeWindow: HTMLDivElement | null =
  document.querySelector(".gameTypeWindow");

if (playNowBtn) {
  playNowBtn.addEventListener("click", async () => {
    const user = await fetch("api/v1/users/getUser")
      .then((res) => res.json())
      .then(({ cookieUser }) => cookieUser)
      .catch((error) => console.error(error));

    if (!user) {
      location.href = "/signIn";
    } else {
      if (gameTypeWindow) {
        gameTypeWindow.style.display = "flex";
      }
    }
  });
}
