"use strict";
function handleGetUserDetails() {
    try {
        fetch("/api/v1/users/getUser")
            .then((res) => res.json())
            .then(({ cookieUser }) => {
            if (cookieUser.userRole === "simple") { // simple user case
                renderPageHeader(cookieUser);
                renderPersonalDetailsBar(cookieUser);
                renderGameButtons();
            }
            else if (cookieUser.userRole === "admin") { // admin case
                renderPageHeader(cookieUser);
                renderPersonalDetailsBar(cookieUser);
                renderAllUsersWrapper();
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}
function handleEditUserDetails() {
    try {
        const _personalDetailsPropertiesRoot = document.querySelectorAll(".personalDetailsWrapper__detailsBox__detail__property");
        if (!_personalDetailsPropertiesRoot)
            throw new Error("personalDetailsPropertiesRoot not found on DOM");
        const personalDetailsPropertiesRoot = Array.from(_personalDetailsPropertiesRoot);
        personalDetailsPropertiesRoot.map((prop) => {
            prop.contentEditable = "true";
            prop.style.color = "blue";
        });
    }
    catch (error) {
        console.error(error);
    }
}
function handleSaveEditUserDetails() {
    try {
        const firstNameRoot = document.querySelector("#firstNameRoot");
        if (!firstNameRoot)
            throw new Error("firstNameRoot not found on DOM");
        const lastNameRoot = document.querySelector("#lastNameRoot");
        if (!lastNameRoot)
            throw new Error("lastNameRoot not found on DOM");
        const genderRoot = document.querySelector("#genderRoot");
        if (!genderRoot)
            throw new Error("genderRoot not found on DOM");
        const userNameRoot = document.querySelector("#userNameRoot");
        if (!userNameRoot)
            throw new Error("userNameRoot not found on DOM");
        const emailRoot = document.querySelector("#emailRoot");
        if (!emailRoot)
            throw new Error("emailRoot not found on DOM");
        const personalDetailsPropertiesRoot = [];
        personalDetailsPropertiesRoot.push(firstNameRoot, lastNameRoot, genderRoot, userNameRoot, emailRoot);
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
                body: JSON.stringify({ userId, firstName, lastName, gender, userName, email }),
            })
                .then((res) => res.json())
                .then((data) => {
                console.log(data);
                if (data.errorMessage) {
                    alert(data.errorMessage);
                }
                else {
                    personalDetailsPropertiesRoot.map((prop) => {
                        prop.contentEditable = "false";
                        prop.style.color = "black";
                    });
                }
            });
        });
    }
    catch (error) {
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
    }
    catch (error) {
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
    }
    catch (error) {
        console.error(error);
    }
}
function handleEditUserDetailsByAdmin(userId) {
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
        const editableUserDataRootArray = [];
        editableUserDataRootArray.push(editableFirstNameRoot, editableLastNameRoot, editableUserNameRoot, editableGenderRoot, editableEmailRoot);
        editableUserDataRootArray.map((prop) => {
            prop.contentEditable = "true";
            prop.style.color = "gold";
        });
    }
    catch (error) {
        console.error(error);
    }
}
function handleSaveEditUserDetailsByAdmin(userId) {
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
        const personalDetailsPropertiesRoot = [];
        personalDetailsPropertiesRoot.push(editableFirstNameRoot, editableLastNameRoot, editableUserNameRoot, editableGenderRoot, editableEmailRoot);
        const EmailInHeaderRoot = document.querySelector(`#emailInHeaderRoot-${userId}`);
        if (!EmailInHeaderRoot)
            throw new Error("EmailInHeaderRoot not found on DOM");
        const firstName = editableFirstNameRoot.innerText;
        const lastName = editableLastNameRoot.innerText;
        const userName = editableUserNameRoot.innerText;
        const gender = editableGenderRoot.innerText;
        const email = editableEmailRoot.innerText;
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
            console.log(data);
            if (data.errorMessage) {
                alert(data.errorMessage);
            }
            else {
                personalDetailsPropertiesRoot.map((prop) => {
                    prop.contentEditable = "false";
                    prop.style.color = "black";
                    EmailInHeaderRoot.innerText = email;
                });
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}
function handleDeleteUserByAdmin(userId) {
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
    }
    catch (error) {
        console.error(error);
    }
}
