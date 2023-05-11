"use strict";
function getUserDetails() {
    try {
        fetch("/api/v1/users/getUser")
            .then((res) => res.json())
            .then(({ cookieUser }) => {
            if (cookieUser.userRole === "simple") { // simple user case
                renderPageHeader(cookieUser);
                renderpersonalDetailsBar(cookieUser);
            }
            else if (cookieUser.userRole === "admin") { // admin case
                console.log("admin case");
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}
