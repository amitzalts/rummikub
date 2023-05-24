checkIfUserSignedIn();

// const closedEye=document.querySelector("iconClosedEye") as HTMLSpanElement
// const openEye=document.querySelector(".iconOpenEye") as HTMLSpanElement
// const password=document.querySelector(".checkPassword") as HTMLInputElement

// closedEye?.addEventListener("click",(e)=>{
// openEye.classList.remove(".eye-slash")
// password.type="text"

// });
// closedEye?.addEventListener("click",(e)=>{
// password.type="password"

// });
// console.log("knnjnjiu")

async function checkIfUserSignedIn() {
  const user = await fetch("api/v1/users/getUser")
    .then((res) => res.json())
    .then(({ cookieUser }) => cookieUser)
    .catch((error) => console.error(error));

  if (user) {
    location.href = "/profile";
  }
}
