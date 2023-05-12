import { error } from "console"

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
          console.log("admin case")
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
            alert(data.errorMessage)
            if(!data.errorMessage){
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
