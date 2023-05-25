"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
checkIfUserSignedIn();
// const closedEye=document.querySelector("iconClosedEye") as HTMLSpanElement
// const openEye=document.querySelector(".iconOpenEye") as HTMLSpanElement
// const password=document.querySelector(".checkPassword") as HTMLInputElement
// closedEye?.addEventListener("click",(e)=>{
// openEye.classList.remove(".eye-slash")
// password.type="text"
// });
// closedEye?.addEventListener("click",(e)=>{
// password.type="password"
// });
// console.log("knnjnjiu")
function checkIfUserSignedIn() {
    return __awaiter(this, void 0, void 0, function* () {
        const fetchUser = yield fetch("api/v1/users/getUser")
            .then((res) => res.json())
            .then(({ user }) => user)
            .catch((error) => console.error(error));
        if (fetchUser) {
            location.href = "/profile";
        }
    });
}
