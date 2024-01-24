if (JSON.parse(localStorage.getItem("userDatabase") === null)) {
  fetchUserDatabase().then();
}
function togglePasswordVisibility(button) {
  var passwordInput = document.getElementById("password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
  button.classList.toggle("active");
}
function TryLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  checkLogin(username, password);
}

function sha256(input) {
  return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
}

function fetchUserDatabase() {
  return fetch("../JSON/LoginData.json")
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("userDatabase", JSON.stringify(data));
      return data;
    });
}

function checkLogin(username, password) {
  const userDatabase = JSON.parse(localStorage.getItem("userDatabase"));

  console.log(userDatabase);

  const existingUser = userDatabase.find((user) => user.username === username);

  if (existingUser) {
    const hashedPassword = sha256(password);
    const user = userDatabase.find(
      (user) =>
        user.username === username && user.hashedPassword === hashedPassword
    );

    if (user) {
      const currentURL = window.location.href;
      const lang = currentURL.split("/").pop().slice(0, 3);
      window.location.href = "../HTML/" + lang + "Landing.html";
      localStorage.setItem("loggedin", true);
    } else {
      alert("Pogresna lozinka");
    }
  } else {
    alert("Korisničko ime ne postoji");
  }
}
