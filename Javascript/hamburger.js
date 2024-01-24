const hamburger = document.querySelector(".hamburger-icon");
const navList = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {
  navList.classList.toggle("show");
  hamburger.classList.toggle("active");
});
function PredjiNaEngleski() {
  const currentURL = window.location.href;
  const pageName = currentURL.split("/").pop();
  const newURL = currentURL.replace(pageName, "en-" + pageName.slice(3));
  window.location.href = newURL;
}
function PredjiNaSrpski() {
  const currentURL = window.location.href;
  const pageName = currentURL.split("/").pop();
  const newURL = currentURL.replace(pageName, "sr-" + pageName.slice(3));
  window.location.href = newURL;
}
function PretragaLogovan() {
  const currentURL = window.location.href;
  const lang = currentURL.split("/").pop().slice(0, 3);
  loggedin = localStorage.getItem("loggedin");
  if (loggedin != "true")
    window.location.href = "../HTML/" + lang + "Login.html";
  else window.location.href = "../HTML/" + lang + "SearchPage.html";
}
