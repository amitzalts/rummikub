"use strict";
function renderPageHeader(user) {
    try {
        const headerRoot = document.querySelector("#headerRoot");
        if (!headerRoot)
            throw new Error("headerRoot not found on DOM");
        headerRoot.innerText = `${user.userName} welcome to your profile page`;
    }
    catch (error) {
        console.error(error);
    }
}
function renderpersonalDetailsBar(user) {
    try {
        const personalDetailsRoot = document.querySelector("#personalDetailsRoot");
        if (!personalDetailsRoot)
            throw new Error("personalDetailsRoot not found on DOM");
        personalDetailsRoot.innerHTML = `
      <div class="personalDetailsWrapper">
          <div class="personalDetailsWrapper__buttons">
              <i class="fa-solid fa-pen-to-square personalDetailsWrapper__buttons__button"></i>
              <i class="fa-solid fa-floppy-disk personalDetailsWrapper__buttons__button"></i>
          </div>
          <div  class="personalDetailsWrapper__detailsBox">
            <div class="personalDetailsWrapper__detailsBox__detail">first name:
              <div> ${user.firstName}</div>
            </div>
            <div class="personalDetailsWrapper__detailsBox__detail">last name:
              <div> ${user.lastName}</div>
            </div>  
            <div class="personalDetailsWrapper__detailsBox__detail">gender: 
              <div> ${user.gender}</div>
            </div>
            <div class="personalDetailsWrapper__detailsBox__detail">user name: 
            <div> ${user.userName}</div>
              </div>
            <div class="personalDetailsWrapper__detailsBox__detail">e-mail:
              <div> ${user.email}</div>
            </div>
          </div>  
      </div>
    `;
    }
    catch (error) {
        console.error(error);
    }
}
