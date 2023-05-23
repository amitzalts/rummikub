function handleGetUserDetails() {
  try {
    fetch("/api/v1/users/getUser")
      .then((res) => res.json())
      .then(({ cookieUser }) => {
        renderPageHeader(cookieUser);
        renderPersonalDetailsBar(cookieUser);
        if (cookieUser.userRole === "simple") {
          // simple user case
          renderGameButtons();
        } else if (cookieUser.userRole === "admin") {
          // admin case
          renderAllUsersWrapper();
        }
      });
  } catch (error) {
    console.error(error);
  }
}

function handleEditUserDetails() {
  try {
    const _personalDetailsPropertiesRoot = document.querySelectorAll(
      ".personalDetailsWrapper__detailsBox__detail__property"
    );
    if (!_personalDetailsPropertiesRoot)
      throw new Error("personalDetailsPropertiesRoot not found on DOM");

    const personalDetailsPropertiesRoot: HTMLDivElement[] = Array.from(
      _personalDetailsPropertiesRoot
    ) as HTMLDivElement[];

    personalDetailsPropertiesRoot.map((prop) => {
      prop.contentEditable = "true";
      prop.style.color = "blue";
    });
  } catch (error) {
    console.error(error);
  }
}

function handleSaveEditUserDetails() {
  try {
    const firstNameRoot: HTMLDivElement | null =
      document.querySelector("#firstNameRoot");
    if (!firstNameRoot) throw new Error("firstNameRoot not found on DOM");
    const lastNameRoot: HTMLDivElement | null =
      document.querySelector("#lastNameRoot");
    if (!lastNameRoot) throw new Error("lastNameRoot not found on DOM");
    const genderRoot: HTMLDivElement | null =
      document.querySelector("#genderRoot");
    if (!genderRoot) throw new Error("genderRoot not found on DOM");
    const userNameRoot: HTMLDivElement | null =
      document.querySelector("#userNameRoot");
    if (!userNameRoot) throw new Error("userNameRoot not found on DOM");
    const emailRoot: HTMLDivElement | null =
      document.querySelector("#emailRoot");
    if (!emailRoot) throw new Error("emailRoot not found on DOM");

    const personalDetailsPropertiesRoot: HTMLDivElement[] = [];
    personalDetailsPropertiesRoot.push(
      firstNameRoot,
      lastNameRoot,
      genderRoot,
      userNameRoot,
      emailRoot
    );

    const firstName = firstNameRoot.innerText;
    const lastName = lastNameRoot.innerText;
    const gender = genderRoot.innerText;
    const userName = userNameRoot.innerText;
    const email = emailRoot.innerText;

    fetch("/api/v1/users/getUser")
      .then((res) => res.json())
      .then(({ cookieUser }) => {
        const userId = cookieUser.userId;

        fetch("/api/v1/users/updateUser", {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            firstName,
            lastName,
            gender,
            userName,
            email,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.errorMessage) {
              alert(data.errorMessage);
            } else {
              personalDetailsPropertiesRoot.map((prop) => {
                prop.contentEditable = "false";
                prop.style.color = "black";
              });
            }
          });
      });
  } catch (error) {
    console.error(error);
  }
}

function handleLogout() {
  try {
    fetch("/api/v1/users/userLogout")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = "./index.html";
      });
  } catch (error) {
    console.error(error);
  }
}

function handleGetAllSimpleUsers() {
  try {
    fetch("/api/v1/users/getAllSimpleUsers")
      .then((res) => res.json())
      .then(({ users }) => {
        renderAllSimpleUsers(users);
      });
  } catch (error) {
    console.error(error);
  }
}

function handleEditUserDetailsByAdmin(userId: string) {
  try {
    const editableUserDataRootArray = catchEditbaleUserDetailsRoots(userId);
    if (!editableUserDataRootArray)
      throw new Error("editableUserDataRootArray not found");

    editableUserDataRootArray.map((prop) => {
      prop.contentEditable = "true";
      prop.style.color = "gold";
    });
  } catch (error) {
    console.error(error);
  }
}

function handleSaveEditUserDetailsByAdmin(userId: string) {
  try {
    const editableUserDataRootArray = catchEditbaleUserDetailsRoots(userId);
    if (!editableUserDataRootArray)
      throw new Error("editableUserDataRootArray not found");

    const EmailInHeaderRoot: HTMLDivElement | null = document.querySelector(
      `#emailInHeaderRoot-${userId}`
    );
    if (!EmailInHeaderRoot)
      throw new Error("EmailInHeaderRoot not found on DOM");

    const firstName = editableUserDataRootArray[0].innerText;
    const lastName = editableUserDataRootArray[1].innerText;
    const userName = editableUserDataRootArray[2].innerText;
    const gender = editableUserDataRootArray[3].innerText;
    const email = editableUserDataRootArray[4].innerText;
    const password = editableUserDataRootArray[5].innerText;

    fetch("/api/v1/users/updateUserByAdmin", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        firstName,
        lastName,
        gender,
        userName,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errorMessage) {
          alert(data.errorMessage);
        } else {
          editableUserDataRootArray.map((prop) => {
            prop.contentEditable = "false";
            prop.style.color = "black";
            EmailInHeaderRoot.innerText = email;
          });
        }
      });
  } catch (error) {
    console.error(error);
  }
}

function handleDeleteUserByAdmin(userId: any) {
  try {
    fetch("/api/v1/users/deleteUser", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then(({ users }) => {
        renderAllSimpleUsers(users);
      });
  } catch (error) {
    console.error(error);
  }
}

function handleSearchUsers() {
  try {
    const userInput: HTMLInputElement | null =
      document.querySelector("#userSearchInput");
    if (!userInput) throw new Error("userInput not found on DOM");

    const noResultsRoot: HTMLDivElement | null =
      document.querySelector("#noResultsRoot");
    if (!noResultsRoot) throw new Error("noResultsRoot not found on DOM");

    const userInputValue = userInput.value.toLocaleLowerCase();

    fetch("/api/v1/users/searchUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInputValue }),
    })
      .then((res) => res.json())
      .then(({ users }) => {
        if (users.length !== 0) {
          renderAllSimpleUsers(users);
          noResultsRoot.innerHTML = "";
        } else {
          noResultsRoot.innerHTML = `<span> Sorry, <b>${userInputValue}</b> was not found on data base </span>`;
        }
      });
  } catch (error) {
    console.error(error);
  }
}

async function activateSavedGamesBtn() {
  const gamesFromDB = await fetch("api/v1/games/getUserGames")
    .then((res) => res.json())
    .then(({ games }) => games)
    .catch((err) => console.error(err));

  const savedGamesBtn = document.querySelector(
    "#savedGamesBtn"
  ) as HTMLButtonElement;
  const middleImage = document.querySelector(".middleImage") as HTMLDivElement;

  const gamesDiv = document.createElement("div");
  gamesDiv.classList.add("gamesDiv");

  const names = gamesFromDB.map(
    (game) =>
      `<div class="game" id="${game._id}">${game.players
        .map((player) => player.name)
        .join(", ")}</div>`
  );

  // gamesDiv.innerHTML = names.join("");
  savedGamesBtn.addEventListener("click", () => {
    // middleImage.append(gamesDiv);
    middleImage.innerHTML = names.join("");

    const divGames = middleImage.querySelectorAll(
      ".game"
    ) as NodeListOf<HTMLDivElement>;

    divGames.forEach((game) =>
      game.addEventListener("click", () => {
        const findGame = gamesFromDB.find((obj) => obj._id === game.id);
        console.log(findGame);
      })
    );
  });
}
