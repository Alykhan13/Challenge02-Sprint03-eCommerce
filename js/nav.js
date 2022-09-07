const logo = document.getElementById("logo");
const loginBtn = document.getElementById("login__btn");
const searchIcon = document.getElementById("search__icon__container");
const searchInputContainer = document.getElementById("search__input__container");
const loginSection = document.querySelector(".login");

function redirectPage(dest) {
    location.href = dest;
}

function showSearchingBox() {
    searchInputContainer.classList.toggle("search__input__container--active");
}

function loginUser() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    
    if (username.value === "admin" && password.value === "admin123") {
        redirectPage("admin.html");
    } else {
        alert("Los datos son incorrectos");
        password.value = "";
    }
}

function hideLogin() {
    loginSection.classList.remove("login--active");
}

function showLogin() {
    loginSection.classList.add("login--active");

    const loginEntryBtn = document.getElementById("login__entry__btn");
    const loginCancelBtn = document.getElementById("login__cancel__btn");

    loginEntryBtn.addEventListener("click", loginUser);

    loginCancelBtn.addEventListener("click", hideLogin);
}

searchIcon.addEventListener("click", showSearchingBox);

logo.addEventListener("click", ()=> {
    redirectPage("index.html");
});

loginBtn.addEventListener("click", showLogin);