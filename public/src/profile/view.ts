function renderPageHeader(user: any){
    try {
      const headerRoot: HTMLDivElement | null  = document.querySelector("#headerRoot")
      if(!headerRoot) throw new Error ("headerRoot not found on DOM")
      
      headerRoot.innerText = `${user.userName} welcome to your profile page`

    } catch (error) {
       console.error(error) 
    }
}

function renderPersonalDetailsBar(user: any){
  try {
    const personalDetailsRoot: HTMLDivElement | null  = document.querySelector("#personalDetailsRoot")
    if(!personalDetailsRoot) throw new Error ("personalDetailsRoot not found on DOM")

    personalDetailsRoot.innerHTML=`
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

function renderGameButtons(){
  try {
    const GameButtonsRoot: HTMLDivElement | null  = document.querySelector("#GameButtonsRoot")
    if(!GameButtonsRoot) throw new Error ("GameButtonsRoot not found on DOM")

    GameButtonsRoot.innerHTML=`
    <div class="gameButtons">
      <button>join game</button>
      <button>create game</button>
    </div>
    `
    
  } catch (error) {
    console.error(error)
  }
}

function collapsePersonalDetailsWrapper(){
  try {
    const wrapper:HTMLDivElement | null = document.querySelector("#personalDetailsWrapperRoot")
    if(!wrapper) throw new Error ("personalDetailsWrapperRoot not found on DOM")

    if (wrapper.style.maxHeight === "0px"){
      wrapper.style.maxHeight = wrapper.scrollHeight + "px"
    } else {
      wrapper.style.maxHeight = "0px"
    } 

  } catch (error) {
    console.error(error)
  }
}

