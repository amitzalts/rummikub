function handleGetUserDetails() {
  try {
    fetch("/api/v1/users/getUser")
      .then((res) => res.json())
      .then(({ cookieUser }) => {
        renderPageHeader(cookieUser)
        renderPersonalDetailsBar(cookieUser)
        if (cookieUser.userRole === "simple") { // simple user case
          renderGameButtons()
        } else if (cookieUser.userRole === "admin") { // admin case
          renderAllUsersWrapper()
        }
      })
  } catch (error) {
    console.error(error)
  }
}

function handleEditUserDetails() {
  try {
    const _personalDetailsPropertiesRoot = document.querySelectorAll(".personalDetailsWrapper__detailsBox__detail__property")
    if (!_personalDetailsPropertiesRoot) throw new Error("personalDetailsPropertiesRoot not found on DOM")

    const personalDetailsPropertiesRoot: HTMLDivElement[] = Array.from(_personalDetailsPropertiesRoot) as HTMLDivElement[]

    personalDetailsPropertiesRoot.map((prop) => {
      prop.contentEditable = "true"
      prop.style.color = "blue"
    })

  } catch (error) {
    console.error(error)
  }
}

function handleSaveEditUserDetails() {
  try {
    const firstNameRoot: HTMLDivElement | null = document.querySelector("#firstNameRoot")
    if (!firstNameRoot) throw new Error("firstNameRoot not found on DOM")
    const lastNameRoot: HTMLDivElement | null = document.querySelector("#lastNameRoot")
    if (!lastNameRoot) throw new Error("lastNameRoot not found on DOM")
    const genderRoot: HTMLDivElement | null = document.querySelector("#genderRoot")
    if (!genderRoot) throw new Error("genderRoot not found on DOM")
    const userNameRoot: HTMLDivElement | null = document.querySelector("#userNameRoot")
    if (!userNameRoot) throw new Error("userNameRoot not found on DOM")
    const emailRoot: HTMLDivElement | null = document.querySelector("#emailRoot")
    if (!emailRoot) throw new Error("emailRoot not found on DOM")

    const personalDetailsPropertiesRoot: HTMLDivElement[] = []
    personalDetailsPropertiesRoot.push(firstNameRoot, lastNameRoot, genderRoot, userNameRoot, emailRoot)


    const firstName = firstNameRoot.innerText
    const lastName = lastNameRoot.innerText
    const gender = genderRoot.innerText
    const userName = userNameRoot.innerText
    const email = emailRoot.innerText

    fetch("/api/v1/users/getUser")
      .then((res) => res.json())
      .then(({ cookieUser }) => {
        const userId = cookieUser.userId

        fetch("/api/v1/users/updateUser", {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, firstName, lastName, gender, userName, email }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.errorMessage) {
              alert(data.errorMessage)
            } else {
              personalDetailsPropertiesRoot.map((prop) => {
                prop.contentEditable = "false"
                prop.style.color = "black"
              })
            }
          })
      })
  } catch (error) {
    console.error(error)
  }
}


function handleLogout() {
  try {
    fetch("/api/v1/users/userLogout")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        window.location.href = "./index.html"
      })
  }
  catch (error) {
    console.error(error)
  }
}

function handleGetAllSimpleUsers() {
  try {
    fetch("/api/v1/users/getAllSimpleUsers")
      .then((res) => res.json())
      .then(({ users }) => {
        renderAllSimpleUsers(users)
      })
  } catch (error) {
    console.error(error)
  }
}


function handleEditUserDetailsByAdmin(userId: string) {
  try {
    const editableFirstNameRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-firstName-${userId}`)
    if (!editableFirstNameRoot) throw new Error("editableFirstNameRoot not found on DOM")
    const editableLastNameRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-lastName-${userId}`)
    if (!editableLastNameRoot) throw new Error("editableLastNameRoot not found on DOM")
    const editableUserNameRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-userName-${userId}`)
    if (!editableUserNameRoot) throw new Error("editableUserNameRoot not found on DOM")
    const editableGenderRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-gender-${userId}`)
    if (!editableGenderRoot) throw new Error("editableGenderRoot not found on DOM")
    const editableEmailRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-email-${userId}`)
    if (!editableEmailRoot) throw new Error("editableEmailRoot not found on DOM")

    const editableUserDataRootArray: HTMLDivElement[] = []
    editableUserDataRootArray.push(editableFirstNameRoot, editableLastNameRoot, editableUserNameRoot, editableGenderRoot, editableEmailRoot)

    editableUserDataRootArray.map((prop) => {
      prop.contentEditable = "true"
      prop.style.color = "gold"
    })

  } catch (error) {
    console.error(error)
  }
}

function handleSaveEditUserDetailsByAdmin(userId: string) {
  try {
    const editableFirstNameRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-firstName-${userId}`)
    if (!editableFirstNameRoot) throw new Error("editableFirstNameRoot not found on DOM")
    const editableLastNameRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-lastName-${userId}`)
    if (!editableLastNameRoot) throw new Error("editableLastNameRoot not found on DOM")
    const editableUserNameRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-userName-${userId}`)
    if (!editableUserNameRoot) throw new Error("editableUserNameRoot not found on DOM")
    const editableGenderRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-gender-${userId}`)
    if (!editableGenderRoot) throw new Error("editableGenderRoot not found on DOM")
    const editableEmailRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-email-${userId}`)
    if (!editableEmailRoot) throw new Error("editableEmailRoot not found on DOM")

    const personalDetailsPropertiesRoot: HTMLDivElement[] = []
    personalDetailsPropertiesRoot.push(editableFirstNameRoot, editableLastNameRoot, editableUserNameRoot, editableGenderRoot, editableEmailRoot)

    const EmailInHeaderRoot: HTMLDivElement | null = document.querySelector(`#emailInHeaderRoot-${userId}`)
    if (!EmailInHeaderRoot) throw new Error("EmailInHeaderRoot not found on DOM")


    const firstName = editableFirstNameRoot.innerText
    const lastName = editableLastNameRoot.innerText
    const userName = editableUserNameRoot.innerText
    const gender = editableGenderRoot.innerText
    const email = editableEmailRoot.innerText

    fetch("/api/v1/users/updateUserByAdmin", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, firstName, lastName, gender, userName, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errorMessage) {
          alert(data.errorMessage)
        } else {
          personalDetailsPropertiesRoot.map((prop) => {
            prop.contentEditable = "false"
            prop.style.color = "black"
            EmailInHeaderRoot.innerText = email
          })
        }
      })
  } catch (error) {
    console.error(error)
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
        renderAllSimpleUsers(users)
      })
  } catch (error) {
    console.error(error)
  }
}

function handleSearchUsers() {
  try {
    console.log("handleSearchUsers invoked")
    const userInput: HTMLInputElement | null = document.querySelector("#userSearchInput")
    if (!userInput) throw new Error("userInput not found on DOM")

    const noResultsRoot: HTMLDivElement | null = document.querySelector("#noResultsRoot")
    if (!noResultsRoot) throw new Error("noResultsRoot not found on DOM")

      const userInputValue = userInput.value.toLocaleLowerCase()
      
      // const allDetails = document.querySelectorAll<HTMLElement>(".allUsersWrapper__users__user__details__detail")

      const allUsers = document.querySelectorAll<HTMLElement>(".allUsersWrapper__users__user")
      

      for (let i = 0; i < allUsers.length; i++) {
     
        if (allUsers[i].innerText.toLowerCase().includes(userInputValue)) {
          allUsers[i].style.display = ""
          noResultsRoot.style.display = "none"
        } else {
          allUsers[i].style.display = "none"
        }
      }

      const _allUsers = document.querySelectorAll<HTMLElement>(".allUsersWrapper__users")
      for (let i = 0; i < _allUsers.length; i++) {
        if (!_allUsers[i].innerText.toLowerCase().includes(userInputValue)) {
          noResultsRoot.style.display = ""
          noResultsRoot.innerHTML = `Sorry, there isn't a user email that icludes <u><b>${userInputValue}</b></u> on our Data Base...`
          noResultsRoot.style.backgroundColor = "white"
        }
      }
 

    console.log("handleSearchUsers end")
  } catch (error) {
    console.error(error)

  }
}


// function handleSearchUsers() {
//   try {
//     console.log("handleSearchUsers invoked")
//     const userInput: HTMLInputElement | null = document.querySelector("#userSearchInput")
//     if (!userInput) throw new Error("userInput not found on DOM")

//     const noResultsRoot: HTMLDivElement | null = document.querySelector("#noResultsRoot")
//     if (!noResultsRoot) throw new Error("noResultsRoot not found on DOM")
//     console.log("userInput.value", userInput.value)

//     userInput.addEventListener("input", (search) => {
//       console.log("search")
//       const _userInputValue = (search.target as HTMLInputElement).value
//       const userInputValue = _userInputValue.toLocaleLowerCase()
      
//       console.log("search", search)

//       const results = document.querySelectorAll<HTMLElement>(".allUsersWrapper__users__user")
//       console.log("results", results)
//       for (let i = 0; i < results.length; i++) {
//         if (results[i].innerText.toLowerCase().includes(userInputValue) && noResultsRoot) {
//           results[i].style.display = ""
//           noResultsRoot.style.display = "none"
//           console.log("handleSearchUsers if case")
//         } else {
//           results[i].style.display = "none"
//           noResultsRoot.style.display = ""
//           noResultsRoot.innerHTML = `Sorry, there isn't a user email that icludes <u><b>${userInputValue}</b></u> on our store...`
//           noResultsRoot.style.backgroundColor = "white"
//         }
//       }
//     })

//     console.log("handleSearchUsers end")
//   } catch (error) {
//     console.error(error)

//   }
// }