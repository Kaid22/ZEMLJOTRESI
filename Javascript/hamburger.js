const hamburger = document.querySelector(".hamburger-icon");
const navList = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {
  navList.classList.toggle("show");
  hamburger.classList.toggle("active");
});
function PredjiNaEngleski() {
  const currentURL = window.location.href;
  const pageName = currentURL.split("/").pop();
  const newURL = currentURL.replace(pageName, "en-" + pageName);
  window.location.href = newURL;
}
function PredjiNaSrpski() {
  const currentURL = window.location.href;
  const pageName = currentURL.split("/").pop();
  const newURL = currentURL.replace(pageName, "sr-" + pageName);
  window.location.href = newURL;
}
