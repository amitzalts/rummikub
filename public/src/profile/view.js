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
function renderPersonalDetailsBar(user) {
    try {
        const personalDetailsRoot = document.querySelector("#personalDetailsRoot");
        if (!personalDetailsRoot)
            throw new Error("personalDetailsRoot not found on DOM");
        personalDetailsRoot.innerHTML = `
    <div id="personalDetailsWrapperRoot" class="personalDetailsWrapper" style="visibility: hidden;">
      <div class="personalDetailsWrapper__buttons">
          <i onclick="handleEditUserDetails()" class="fa-solid fa-pen-to-square personalDetailsWrapper__buttons__button"></i>
          <i onclick="handleSaveEditUserDetails()" class="fa-solid fa-floppy-disk personalDetailsWrapper__buttons__button"></i>
      </div>
      <div  class="personalDetailsWrapper__detailsBox">
        <div class="personalDetailsWrapper__detailsBox__detail">
          <span>first name:</span>
          <div id="firstNameRoot" class="personalDetailsWrapper__detailsBox__detail__property"> ${user.firstName}</div>
        </div>
        <div class="personalDetailsWrapper__detailsBox__detail">
          <span>last name:</span>
          <div id="lastNameRoot" class="personalDetailsWrapper__detailsBox__detail__property"> ${user.lastName}</div>
        </div>  
        <div class="personalDetailsWrapper__detailsBox__detail">
          <span>gender:</span> 
          <div id="genderRoot" class="personalDetailsWrapper__detailsBox__detail__property"> ${user.gender}</div>
        </div>
        <div class="personalDetailsWrapper__detailsBox__detail">
          <span>user name:</span> 
          <div id="userNameRoot" class="personalDetailsWrapper__detailsBox__detail__property"> ${user.userName}</div>
        </div>
        <div class="personalDetailsWrapper__detailsBox__detail">
          <span>e-mail:</span>
          <div id="emailRoot" class="personalDetailsWrapper__detailsBox__detail__property"> ${user.email}</div>
        </div>
      </div>
    </div>  
    `;
    }
    catch (error) {
        console.error(error);
    }
}
function collapsePersonalDetailsWrapper() {
    try {
        const wrapper = document.querySelector("#personalDetailsWrapperRoot");
        if (!wrapper)
            throw new Error("personalDetailsWrapperRoot not found on DOM");
        if (wrapper.style.visibility === "hidden") {
            wrapper.style.visibility = "visible";
        }
        else {
            wrapper.style.visibility = "hidden";
        }
    }
    catch (error) {
        console.error(error);
    }
}
function renderAllUsersWrapper() {
    try {
        const allUsersWrapperRoot = document.querySelector("#allUsersWrapperRoot");
        if (!allUsersWrapperRoot)
            throw new Error("allUsersWrapperRoot not found on DOM");
        allUsersWrapperRoot.innerHTML = `
    <div class="allUsersWrapper">
      <h1>users</h1>
      <div class="allUsersWrapper__filterBar">
        <input id="userSearchInput" class="allUsersWrapper__filterBar__searchBar" placeholder="search">
        <i onclick="handleSearchUsers()" class="fa-solid fa-magnifying-glass"></i>
      </div>
      <div id="noResultsRoot"></div>
      <div class="allUsersWrapper__users" id="allUsersRoot"></div>
    </div>
    `;
        handleGetAllSimpleUsers();
    }
    catch (error) {
        console.error(error);
    }
}
function renderAllSimpleUsers(users) {
    try {
        const allUsersRoot = document.querySelector("#allUsersRoot");
        if (!allUsersRoot)
            throw new Error("allUsersRoot not found on DOM");
        const html = users
            .map((user) => {
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
            <p>password:
              <span id="editableUserDataRoot-password-${user._id}" class="allUsersWrapper__users__user__details__detail"> ${user.password}</span>
            </p>
            <button onclick="handleDeleteUserByAdmin('${user._id}')" >DELETE USER</button>
          </div>
        </div>
      `;
        })
            .join(" ");
        allUsersRoot.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
function catchEditbaleUserDetailsRoots(userId) {
    try {
        const editableFirstNameRoot = document.querySelector(`#editableUserDataRoot-firstName-${userId}`);
        if (!editableFirstNameRoot)
            throw new Error("editableFirstNameRoot not found on DOM");
        const editableLastNameRoot = document.querySelector(`#editableUserDataRoot-lastName-${userId}`);
        if (!editableLastNameRoot)
            throw new Error("editableLastNameRoot not found on DOM");
        const editableUserNameRoot = document.querySelector(`#editableUserDataRoot-userName-${userId}`);
        if (!editableUserNameRoot)
            throw new Error("editableUserNameRoot not found on DOM");
        const editableGenderRoot = document.querySelector(`#editableUserDataRoot-gender-${userId}`);
        if (!editableGenderRoot)
            throw new Error("editableGenderRoot not found on DOM");
        const editableEmailRoot = document.querySelector(`#editableUserDataRoot-email-${userId}`);
        if (!editableEmailRoot)
            throw new Error("editableEmailRoot not found on DOM");
        const editablePasswordRoot = document.querySelector(`#editableUserDataRoot-password-${userId}`);
        if (!editablePasswordRoot)
            throw new Error("editablePasswordRoot not found on DOM");
        const editableUserDataRootArray = [];
        editableUserDataRootArray.push(editableFirstNameRoot, editableLastNameRoot, editableUserNameRoot, editableGenderRoot, editableEmailRoot, editablePasswordRoot);
        return editableUserDataRootArray;
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
}
function collapseUserDetails(userId) {
    try {
        const collapsible = document.querySelector(`#userDetailsRoot-${userId}`);
        if (!collapsible)
            throw new Error("userDetailsRoot not found on DOM");
        const editableUserDataRootArray = catchEditbaleUserDetailsRoots(userId);
        if (!editableUserDataRootArray)
            throw new Error("editableUserDataRootArray not found");
        if (editableUserDataRootArray[1].contentEditable === "true") {
            alert("notice you didn't save the user's details");
        }
        else {
            const collapsibleArrow = document.querySelector(`#collapsibleArrow-${userId}`);
            if (!collapsibleArrow)
                throw new Error("collapsibleArrow not found on DOM");
            if (collapsible.style.maxHeight === "0px") {
                collapsible.style.maxHeight = "30vh";
                collapsibleArrow.style.transform = "scaleY(-1)";
            }
            else {
                collapsible.style.maxHeight = "0px";
                collapsibleArrow.style.transform = "scaleY(1)";
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}
