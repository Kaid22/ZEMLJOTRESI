document.addEventListener("DOMContentLoaded", function () {
  ProveriLogin();
});

function LogOut() {
  localStorage.setItem("loggedin", false);
  location.reload();
}
function ProveriLogin() {
  if (localStorage.getItem("loggedin") == "true") {
    logginnav = document.getElementById("loginnav");
    if (logginnav != null) logginnav.classList.add("inactive");
    logoutnav = document.getElementById("logoutnav");
    if (logoutnav != null) logoutnav.classList.remove("inactive");
  } else {
    logginnav = document.getElementById("loginnav");
    if (logginnav != null) logginnav.classList.remove("inactive");
    logoutnav = document.getElementById("logoutnav");
    if (logoutnav != null) logoutnav.classList.add("inactive");
  }
}
function LoginIfNot() {
  if (localStorage.getItem("loggedin") != "true")
    window.location.href = "/HTML/Login.html";
  else window.location.href = "/HTML/SearchPage.html";
}
