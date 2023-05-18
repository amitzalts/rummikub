function renderPageHeader(user: any) {
  try {
    const headerRoot: HTMLDivElement | null = document.querySelector("#headerRoot")
    if (!headerRoot) throw new Error("headerRoot not found on DOM")

    headerRoot.innerText = `${user.userName} welcome to your profile page`

  } catch (error) {
    console.error(error)
  }
}


function renderPersonalDetailsBar(user: any) {
  try {
    const personalDetailsRoot: HTMLDivElement | null = document.querySelector("#personalDetailsRoot")
    if (!personalDetailsRoot) throw new Error("personalDetailsRoot not found on DOM")

    personalDetailsRoot.innerHTML = `
      <div id="personalDetailsWrapperRoot" class="personalDetailsWrapper" style="max-height:0px;">
          <div class="personalDetailsWrapper__buttons">
              <i onclick="handleEditUserDetails()" class="fa-solid fa-pen-to-square personalDetailsWrapper__buttons__button"></i>
              <i onclick="handleSaveEditUserDetails()" class="fa-solid fa-floppy-disk personalDetailsWrapper__buttons__button"></i>
          </div>
          <div  class="personalDetailsWrapper__detailsBox">
            <div class="personalDetailsWrapper__detailsBox__detail">first name:
              <div id="firstNameRoot" class="personalDetailsWrapper__detailsBox__detail__property"> ${user.firstName}</div>
            </div>
            <div class="personalDetailsWrapper__detailsBox__detail">last name:
              <div id="lastNameRoot" class="personalDetailsWrapper__detailsBox__detail__property"> ${user.lastName}</div>
            </div>  
            <div class="personalDetailsWrapper__detailsBox__detail">gender: 
              <div id="genderRoot" class="personalDetailsWrapper__detailsBox__detail__property"> ${user.gender}</div>
            </div>
            <div class="personalDetailsWrapper__detailsBox__detail">user name: 
            <div id="userNameRoot" class="personalDetailsWrapper__detailsBox__detail__property"> ${user.userName}</div>
              </div>
            <div class="personalDetailsWrapper__detailsBox__detail">e-mail:
              <div id="emailRoot" class="personalDetailsWrapper__detailsBox__detail__property"> ${user.email}</div>
            </div>
          </div>  
      </div>
    `
  } catch (error) {
    console.error(error)
  }
}

function renderGameButtons() {
  try {
    const GameButtonsRoot: HTMLDivElement | null = document.querySelector("#GameButtonsRoot")
    if (!GameButtonsRoot) throw new Error("GameButtonsRoot not found on DOM")

    GameButtonsRoot.innerHTML = `
    <div class="gameButtons">
      <button>join game</button>
      <button>create game</button>
    </div>
    `

  } catch (error) {
    console.error(error)
  }
}

function collapsePersonalDetailsWrapper() {
  try {
    const wrapper: HTMLDivElement | null = document.querySelector("#personalDetailsWrapperRoot")
    if (!wrapper) throw new Error("personalDetailsWrapperRoot not found on DOM")

    if (wrapper.style.maxHeight === "0px") {
      wrapper.style.maxHeight = wrapper.scrollHeight + "rem"
    } else {
      wrapper.style.maxHeight = "0px"
    }

  } catch (error) {
    console.error(error)
  }
}




function renderAllUsersWrapper() {
  try {
    const allUsersWrapperRoot: HTMLDivElement | null = document.querySelector("#allUsersWrapperRoot")
    if (!allUsersWrapperRoot) throw new Error("allUsersWrapperRoot not found on DOM")

    allUsersWrapperRoot.innerHTML = `
    <div class="allUsersWrapper">
      <h1>users</h1>
      <div class="allUsersWrapper__filterBar">
        <input id="userSearchInput" class="allUsersWrapper__filterBar__searchBar" placeholder="search" onkeyup="handleSearchUsers()">
      </div>
      <div id="noResultsRoot"></div>
      <div class="allUsersWrapper__users" id="allUsersRoot"></div>
    </div>
    `
    handleGetAllSimpleUsers()

  } catch (error) {
    console.error(error)

  }
}


function renderAllSimpleUsers(users:any){
  try {
    
    const allUsersRoot: HTMLDivElement | null = document.querySelector("#allUsersRoot")
    if (!allUsersRoot) throw new Error("allUsersRoot not found on DOM")

    const html:string  = users.map((user:any)=>{
      return `
        <div class="allUsersWrapper__users__user">
          <h2>
            <span id="emailInHeaderRoot-${user._id}">${user.email}</span>
            <i id="collapsibleArrow-${user._id}" onclick="collapseUserDetails('${user._id}')" class="fa-solid fa-angle-up"></i>
          </h2>
          <div id="userDetailsRoot-${user._id}" class="allUsersWrapper__users__user__details" style="max-height:0px;">
            <div class="allUsersWrapper__users__user__details__buttons">
                <i onclick="handleEditUserDetailsByAdmin('${user._id}')" class="fa-solid fa-pen-to-square"></i>
                <i onclick="handleSaveEditUserDetailsByAdmin('${user._id}')" class="fa-solid fa-floppy-disk"></i>
            </div>
            <p>first name: 
              <span id="editableUserDataRoot-firstName-${user._id}" class="allUsersWrapper__users__user__details__detail"> ${user.firstName}</span>
            </p>
            <p>last name:
              <span id="editableUserDataRoot-lastName-${user._id}" class="allUsersWrapper__users__user__details__detail"> ${user.lastName}</span>
            </p>
            <p>user name:
              <span id="editableUserDataRoot-userName-${user._id}" class="allUsersWrapper__users__user__details__detail"> ${user.userName}</span>
            </p>
            <p>gender:
              <span id="editableUserDataRoot-gender-${user._id}" class="allUsersWrapper__users__user__details__detail"> ${user.gender}</span>
            </p>
            <p>email:
              <span id="editableUserDataRoot-email-${user._id}" class="allUsersWrapper__users__user__details__detail"> ${user.email}</span>
            </p>
            <button onclick="handleDeleteUserByAdmin('${user._id}')" >DELETE USER</button>
          </div>
        </div>
      `
    }).join(" ")

    allUsersRoot.innerHTML = html
  } catch (error) {
    console.error(error)

  }
}

function collapseUserDetails(userId:string) {
  try {
    const collapsible: HTMLDivElement | null = document.querySelector(`#userDetailsRoot-${userId}`)
    if (!collapsible) throw new Error("userDetailsRoot not found on DOM")

    const collapsibleArrow: HTMLDivElement | null = document.querySelector(`#collapsibleArrow-${userId}`)
    if (!collapsibleArrow) throw new Error("collapsibleArrow not found on DOM")

    if (collapsible.style.maxHeight === "0px") {
      collapsible.style.maxHeight = "13rem"
      collapsibleArrow.style.transform = "scaleY(-1)"
    } else {
      collapsible.style.maxHeight = "0px"
      collapsibleArrow.style.transform = "scaleY(1)"
    }
  } catch (error) {
    console.error(error)
  }
}