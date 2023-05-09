"use strict";
function renderPageHeader(user) {
    try {
        const headerRoot = document.querySelector("#headerRoot");
        if (!headerRoot)
            throw new Error("headerRoot not found on DOM");
        headerRoot.innerText = `${user.userName} welcome to user profile page`;
    }
    catch (error) {
        console.error(error);
    }
}
