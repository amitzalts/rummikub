checkIfUserSavedInCookies();

async function checkIfUserSavedInCookies() {
  const user = await fetch("api/v1/users/getUser")
    .then((res) => res.json())
    .then(({ cookieUser }) => cookieUser)
    .catch((error) => console.error(error));

  if (!user) {
    location.href = "/";
  }
}
