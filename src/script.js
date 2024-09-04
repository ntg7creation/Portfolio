import * as myScene from "./THREE/THREE_script";
import * as Actions from "./DataCom/functionalActions.js";

const AuthenticationButton = document.getElementById("Authentication Button");

AuthenticationButton.style.fontSize = "20px";
AuthenticationButton.style.padding = "10px";
AuthenticationButton.style.position = "absolute";
AuthenticationButton.style.zIndex = 10;
document.addEventListener("DOMContentLoaded", function () {
  AuthenticationButton.addEventListener("click", Actions.getAuthenticated);
});

const Buttontest1 = document.getElementById("Buttontest1");

Buttontest1.style.fontSize = "20px";
Buttontest1.style.padding = "10px";
Buttontest1.style.position = "absolute";
Buttontest1.style.zIndex = 10;
Buttontest1.style.top =
  AuthenticationButton.offsetTop + AuthenticationButton.offsetHeight + "px";
Buttontest1.style.left = AuthenticationButton.offsetLeft;
document.addEventListener("DOMContentLoaded", function () {
  Buttontest1.addEventListener("click", Actions.tempButton);
});
