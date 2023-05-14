function handleGetUserDetails() {
  try {
    fetch("/api/v1/users/getUser")
      .then((res) => res.json())
      .then(({ cookieUser }) => {
        if (cookieUser.userRole === "simple") { // simple user case
          renderPageHeader(cookieUser)
          renderPersonalDetailsBar(cookieUser)
          renderGameButtons()
        } else if (cookieUser.userRole === "admin") { // admin case
          renderPageHeader(cookieUser)
          renderPersonalDetailsBar(cookieUser)
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
            console.log(data)
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

function handleGetAllUsers(){
  try {
    fetch("/api/v1/users/getAllUsers")
      .then((res) => res.json())
      .then(({ users }) => {
        renderAllUsers(users)
      })
  } catch (error) {
    console.error(error)
  }
}


function handleEditUserDetailsByAdmin(userId:any) {
  try {
    const editableFirstNameRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-firstName-${userId}`)
    if (!editableFirstNameRoot) throw new Error(" not found on DOM")
    const editableLastNameRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-lastName-${userId}`)
    if (!editableLastNameRoot) throw new Error(" not found on DOM")
    const editableUserNameRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-userName-${userId}`)
    if (!editableUserNameRoot) throw new Error(" not found on DOM")
    const editableGenderRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-gender-${userId}`)
    if (!editableGenderRoot) throw new Error(" not found on DOM")
    const editableEmailRoot: HTMLDivElement | null = document.querySelector(`#editableUserDataRoot-email-${userId}`)
    if (!editableEmailRoot) throw new Error(" not found on DOM")
  
    const editableUserDataRootArray:HTMLDivElement[] = []
    editableUserDataRootArray.push(editableFirstNameRoot, editableLastNameRoot, editableUserNameRoot, editableGenderRoot, editableEmailRoot)

    editableUserDataRootArray.map((prop) => {
      prop.contentEditable = "true"
      prop.style.color = "gold"
    })

  } catch (error) {
    console.error(error)
  }
}

// function handleSaveEditUserDetailsByAdmin() {
//   try {
//     const firstNameRoot: HTMLDivElement | null = document.querySelector("#firstNameRoot")
//     if (!firstNameRoot) throw new Error("firstNameRoot not found on DOM")
//     const lastNameRoot: HTMLDivElement | null = document.querySelector("#lastNameRoot")
//     if (!lastNameRoot) throw new Error("lastNameRoot not found on DOM")
//     const genderRoot: HTMLDivElement | null = document.querySelector("#genderRoot")
//     if (!genderRoot) throw new Error("genderRoot not found on DOM")
//     const userNameRoot: HTMLDivElement | null = document.querySelector("#userNameRoot")
//     if (!userNameRoot) throw new Error("userNameRoot not found on DOM")
//     const emailRoot: HTMLDivElement | null = document.querySelector("#emailRoot")
//     if (!emailRoot) throw new Error("emailRoot not found on DOM")

//     const personalDetailsPropertiesRoot: HTMLDivElement[] = []
//     personalDetailsPropertiesRoot.push(firstNameRoot, lastNameRoot, genderRoot, userNameRoot, emailRoot)


//     const firstName = firstNameRoot.innerText
//     const lastName = lastNameRoot.innerText
//     const gender = genderRoot.innerText
//     const userName = userNameRoot.innerText
//     const email = emailRoot.innerText

//     fetch("/api/v1/users/getUser")
//       .then((res) => res.json())
//       .then(({ cookieUser }) => {
//         const userId = cookieUser.userId

//         fetch("/api/v1/users/updateUser", {
//           method: "PATCH",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userId, firstName, lastName, gender, userName, email }),
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             console.log(data)
//             if (data.errorMessage) {
//               alert(data.errorMessage)
//             } else {
//               personalDetailsPropertiesRoot.map((prop) => {
//                 prop.contentEditable = "false"
//                 prop.style.color = "black"
//               })
//             }
//           })
//       })
//   } catch (error) {
//     console.error(error)
//   }
// }