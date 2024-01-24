function Posaljiporuku() {
  const ime = document.getElementById("imeinput");
  const prezime = document.getElementById("prezimeinput");
  const email = document.getElementById("emailinput");
  const poruka = document.getElementById("porukainput");
  const netacnoime = document.getElementById("imenetacno");
  const netacnoprezime = document.getElementById("prezimenetacno");
  const netacnoemail = document.getElementById("emailnetacno");
  const netacnoporuka = document.getElementById("porukanetacno");
  var netacno = false;
  if (!containsOnlyLetters(ime.value)) {
    netacnoime.style.visibility = "visible";
    netacno = true;
  }
  if (!containsOnlyLetters(prezime.value)) {
    netacnoprezime.style.visibility = "visible";
    netacno = true;
  }
  if (!IsEmail(email.value)) {
    netacnoemail.style.visibility = "visible";
    netacno = true;
  }
  if (poruka.value == "") {
    netacnoporuka.style.visibility = "visible";
    netacno = true;
  }
  if (!netacno) {
    alert("Poruka je uspesno poslata");
    ime.value = "";
    prezime.value = "";
    email.value = "";
    poruka.value = "";
  }
}
function containsOnlyLetters(str) {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(str);
}
function IsEmail(str) {
  const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(str);
}
window.addEventListener("click", function (event) {
  if (event.target.tagName !== "BUTTON") {
    const netacnoime = document.getElementById("imenetacno");
    const netacnoprezime = document.getElementById("prezimenetacno");
    const netacnoemail = document.getElementById("emailnetacno");
    const netacnoporuka = document.getElementById("porukanetacno");
    netacnoime.style.visibility = "hidden";
    netacnoprezime.style.visibility = "hidden";
    netacnoemail.style.visibility = "hidden";
    netacnoporuka.style.visibility = "hidden";
  }
});
