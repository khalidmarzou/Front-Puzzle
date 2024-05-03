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

// Register Btn to display form Register:
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
      inputsRegister[i].parentElement.nextElementSibling.textContent = "";
      validation = validation && true;
    } else {
      inputsRegister[i].style.borderColor = "red";
      inputsRegister[i].parentElement.nextElementSibling.textContent =
        errorRegister[i];
      validation = validation && false;
    }
  }
  if (inputsRegister[2].value === inputsRegister[3].value) {
    inputsRegister[3].style.borderColor = "green";
    inputsRegister[3].parentElement.nextElementSibling.textContent = "";
    validation = validation && true;
  } else {
    inputsRegister[3].style.borderColor = "red";
    inputsRegister[3].parentElement.nextElementSibling.textContent =
      errorRegister[3];
    validation = validation && false;
  }
  if (checkUserExist(inputsRegister[1].value)) {
    validation = validation && true;
  } else {
    inputsRegister[1].style.borderColor = "red";
    inputsRegister[1].parentElement.nextElementSibling.textContent =
      "email already exist please login";
    validation = validation && false;
  }
  return validation;
}

// submit Register Register Form :
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

let usersInfo;
let login;
// Laod data Users :
document.addEventListener("DOMContentLoaded", laodDataFromServer);
function laodDataFromServer() {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://getpantry.cloud/apiv1/pantry/48db89c1-ef9c-4410-b945-2c1a51212191/basket/front_puzzle",
    true
  );
  xhr.onload = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 300) {
        usersInfo = JSON.parse(this.responseText).usersInfo;
        // import data from local Storage :
        const findUser = usersInfo.find(
          (user) => user.email === localStorage.getItem("user")
        );
        if (findUser !== undefined) {
          login = "YES";
          alreadyLogin();
        }
      }
    }
  };
  xhr.onerror = function () {
    console.error("error in laod data users from server");
  };
  xhr.send();
}

// send data in register :
let dataJSON;
registerForm.onsubmit = function (event) {
  event.preventDefault();
  const formValid = validationRegisterForm();
  if (formValid) {
    const user = new User(
      inputsRegister[0].value,
      inputsRegister[1].value,
      cryptage(inputsRegister[2].value, true)
    );

    usersInfo.push(user);
    dataJSON = JSON.stringify({
      usersInfo: usersInfo,
    });
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://getpantry.cloud/apiv1/pantry/48db89c1-ef9c-4410-b945-2c1a51212191/basket/front_puzzle",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          console.log("data send with success : ", this.status);
          login = "YES";
          localStorage.setItem("user", user.email);
          alreadyLogin();
          closeRegisterForm();
        }
      }
    };
    xhr.onerror = function () {
      console.error("error in send data users to the server");
    };
    xhr.send(dataJSON);
  }
};

// check if user already registered :
function checkUserExist(mail) {
  const indexMail = usersInfo.findIndex((user) => user.email === mail);
  if (indexMail != -1) {
    return false;
  } else {
    return true;
  }
}

// Crypt and Decrypt password :
function cryptage(password, a) {
  var crypt = {
    secret: "THESECRET",
    encrypt: function (clear) {
      var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
      cipher = cipher.toString();
      return cipher;
    },
    decrypt: function (cipher) {
      var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
      decipher = decipher.toString(CryptoJS.enc.Utf8);
      return decipher;
    },
  };

  if (a) {
    let cipher = crypt.encrypt(password);
    return cipher;
  } else {
    let decipher = crypt.decrypt(password);
    return decipher;
  }
}

// Btn LOgin to display Login Form :
const formContainerLogin = getID("formContainerLogin");
function closeLoginForm() {
  formContainerLogin.style.display = "none";
}
const loginBtn = getID("login");
loginBtn.addEventListener("click", (event) => {
  formContainerLogin.style.display = "flex";
});

// Login to the account :
const loginForm = document.forms[1];
const emailLogin = document.getElementById("emailLogin");
const passwordLogin = document.getElementById("passwordLogin");
const loginRegisterBtns = getID("loginRegisterBtns");

function verifierEmailPassword() {
  const user = usersInfo.find((us) => us.email === emailLogin.value);
  if (user !== undefined) {
    if (cryptage(user.password, false) === passwordLogin.value) {
      emailLogin.style.borderColor = "green";
      emailLogin.parentElement.nextElementSibling.textContent = "";
      passwordLogin.style.borderColor = "green";
      passwordLogin.parentElement.nextElementSibling.textContent = "";
      console.log("login success");
      closeLoginForm();
      localStorage.setItem("user", user.email);
      login = "YES";
      alreadyLogin();
    } else {
      emailLogin.style.borderColor = "green";
      emailLogin.parentElement.nextElementSibling.textContent = "";
      passwordLogin.style.borderColor = "red";
      passwordLogin.parentElement.nextElementSibling.textContent =
        "Wrong Password";
    }
  } else {
    emailLogin.style.borderColor = "red";
    emailLogin.parentElement.nextElementSibling.textContent =
      "email not founded";
  }
}
function alreadyLogin() {
  const user = usersInfo.find(
    (user) => user.email === localStorage.getItem("user")
  );
  if (login === "YES") {
    loginRegisterBtns.innerHTML = `Welcome ${user.name}
                                      <a class="cursor-pointer text-red-300 hover:text-red-900" onclick="logout()"><i class="bi bi-box-arrow-right"></i></a>`;
    loginRegisterBtns.style.color = "orange";
    document.getElementsByTagName("main")[0].classList.remove("hidden");
    document.getElementsByTagName("aside")[0].classList.add("hidden");
    getID("indexPic").style.display = "none";
  }
}

// Logout function :
function logout() {
  localStorage.clear();
  location.reload();
}

// action :
loginForm.onsubmit = function (event) {
  event.preventDefault();
  verifierEmailPassword();
};

// Slides :
let currentSlide = 1;
const totalSlides = 3;

function showSlide(slideIndex) {
  const slides = document.querySelectorAll(".slide");

  slides.forEach((slide, index) => {
    if (index + 1 === slideIndex) {
      slide.classList.add("active");
      slide.classList.remove("previous", "next");
    } else if (index + 1 === currentSlide) {
      slide.classList.remove("active", "next");
      slide.classList.add("previous");
    } else {
      slide.classList.remove("active", "previous");
      slide.classList.add("next");
    }
  });

  currentSlide = slideIndex;
}

function nextSlide() {
  currentSlide = (currentSlide % totalSlides) + 1;
  showSlide(currentSlide);
}

function previousSlide() {
  currentSlide = ((currentSlide - 2 + totalSlides) % totalSlides) + 1;
  showSlide(currentSlide);
}

// Show the initial slide
showSlide(currentSlide);

// linkdin and github links :
function linkdin() {
  window.open("https://www.linkedin.com/in/khalid-marzoug/");
}

function github() {
  window.open("https://github.com/khalidmarzou");
}
