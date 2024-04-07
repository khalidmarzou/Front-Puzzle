function getID(id) {
  return document.getElementById(id);
}

// Open and close navbar for mobile :
const iconMenu = getID("iconMenu");
const navBar = getID("navBar");
iconMenu.addEventListener("click", () => {
  const icon = iconMenu.children[0];
  const checkCloseOrOpen = Array.from(icon.classList).findIndex(
    (classs) => classs === "fa-bars"
  );
  if (checkCloseOrOpen !== -1) {
    navBar.style.display = "flex";
    icon.classList.replace("fa-bars", "fa-xmark");
  } else {
    navBar.style.display = "none";
    icon.classList.replace("fa-xmark", "fa-bars");
  }
});

// change buttons color in navBar in hover :
const btn1 = document.querySelector("input[type='button']");
const btn2 = document.querySelector("input[type='button']:nth-of-type(2)");
btn1.onmouseenter = () => {
  btn1.style.backgroundColor = "white";
  btn1.style.color = "#CC3A62";
  btn2.style.backgroundColor = "#CC3A62";
  btn2.style.color = "#fff";
};
btn1.onmouseleave = () => {
  btn1.style.backgroundColor = "#CC3A62";
  btn1.style.color = "white";
  btn2.style.backgroundColor = "white";
  btn2.style.color = "#CC3A62";
};

// styling list li :
const ul = document.getElementsByTagName("ul")[0];
Array.from(ul.children).forEach((li, index) => {
  index === Array.from(ul.children).length - 1
    ? null
    : li.addEventListener("mouseenter", () => {
        li.style.transform = "scale(1.2)";
      });
});
Array.from(ul.children).forEach((li, index) => {
  index === Array.from(ul.children).length - 1
    ? null
    : li.addEventListener("mouseleave", () => {
        li.style.transform = "scale(1)";
      });
});
// display navBar att width over than 1024px :
window.addEventListener("resize", () => {
  window.innerWidth > 1024 ? (navBar.style.display = "flex") : null;
  window.innerWidth < 1024
    ? (navBar.style.display = "none") &&
      iconMenu.children[0].classList.replace("fa-xmark", "fa-bars")
    : null;
});
document.addEventListener("DOMContentLoaded", () => {
  window.innerWidth > 1024 ? (navBar.style.display = "flex") : null;
  window.innerWidth < 1024
    ? (navBar.style.display = "none") &&
      iconMenu.children[0].classList.replace("fa-xmark", "fa-bars")
    : null;
});

// Register :
const formContainer = getID("formContainer");
function closeRegisterForm() {
  formContainer.style.display = "none";
}
const registerBtn = getID("register");
registerBtn.addEventListener("click", (event) => {
  formContainer.style.display = "flex";
});
// Validation Register :
const registerForm = document.forms[0];
const inputsRegister = Array.from(registerForm.getElementsByTagName("input"));
const patternRegister = [
  /[a-z]+\s[a-z]+/i,
  /\w{3,}@[a-z]{2,}\.\w{2,12}/i,
  /.{6,}/,
];
const errorRegister = [
  "Enter Your Full Name 'don't forget space'",
  "Enter Your Email 'user@example.expl'",
  "At Least 6 Characters",
  "repeat your Password",
];
function validationRegisterForm() {
  let validation = true;
  for (let i = 0; i < inputsRegister.length - 1; i++) {
    if (patternRegister[i].test(inputsRegister[i].value)) {
      inputsRegister[i].style.borderColor = "green";
    } else {
      inputsRegister[i].style.borderColor = "red";
      inputsRegister[i].nextElementSibling.textContent = errorRegister[i];
    }
  }
}

// button Register :
console.log(registerForm);
registerForm.onsubmit = function (event) {
  validationRegisterForm();
  console.log("okkk");
  return event.preventDefault();
};
