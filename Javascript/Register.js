function CheckAndAdd() {
  const username = document.getElementById("username").value;
  const password1 = document.getElementById("password1").value;
  const password2 = document.getElementById("password2").value;

  if (username === "") {
    alert("Korisnicko ime mora sadrzati bar jedan karakter.");
    return;
  }
  const userDatabase = JSON.parse(localStorage.getItem("userDatabase")) || [];
  const existingUser = userDatabase.find((user) => user.username === username);
  if (existingUser) {
    alert("Ovo korisnicko ime je zauzeto, probajte ponovo");
  } else if (password1 !== password2) {
    alert("Lozinke se ne poklapaju, probajte ponovo.");
  } else if (password1 === password2) {
    const newUser = {
      username: username,
      hashedPassword: sha256(password1),
    };
    userDatabase.push(newUser);
    localStorage.setItem("userDatabase", JSON.stringify(userDatabase));
    localStorage.setItem("loggedin", true);
    window.location.href = "/HTML/Landing.html";
  }
}
function fetchUserDatabase() {
  return fetch("/JSON/LoginData.json")
    .then((response) => response.json())
    .then((data) => data);
}
function sha256(input) {
  return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
}
