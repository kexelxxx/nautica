import { auth } from "../firebase.js";
import {
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const provider = new GithubAuthProvider();

const loginBtn = document.getElementById("loginBtn");
const userInfo = document.getElementById("user-info");

loginBtn.onclick = () => {
  signInWithPopup(auth, provider);
};

onAuthStateChanged(auth, user => {
  if (user) {
    userInfo.innerHTML = `
      <p>👤 ${user.displayName}</p>
      <img src="${user.photoURL}" width="50">
    `;
    loginBtn.style.display = "none";
  }
});
