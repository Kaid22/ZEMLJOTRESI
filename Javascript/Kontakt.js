var ime;
var prezime;
var email;
var poruka;
var netacnoime;
var netacnoprezime;
var netacnoemail;
var netacnoporuka;
document.addEventListener("DOMContentLoaded", function () {
  ime = document.getElementById("imeinput");
  prezime = document.getElementById("prezimeinput");
  email = document.getElementById("emailinput");
  poruka = document.getElementById("porukainput");
  netacnoime = document.getElementById("imenetacno");
  netacnoprezime = document.getElementById("prezimenetacno");
  netacnoemail = document.getElementById("emailnetacno");
  netacnoporuka = document.getElementById("porukanetacno");
});
function Posaljiporuku() {
  var netacno = false;
  if (!containsOnlyLetters(ime.value)) {
    netacnoime.innerHTML = "Polje prihvata samo slova";
    netacnoime.style.color = "red";
    netacnoime.style.visibility = "visible";

    netacno = true;
  }
  if (!containsOnlyLetters(prezime.value)) {
    netacnoprezime.innerHTML = "Polje prihvata samo slova";
    netacnoprezime.style.color = "red";
    netacnoprezime.style.visibility = "visible";

    netacno = true;
  }
  if (!IsEmail(email.value)) {
    netacnoemail.innerHTML = "Email adresa mora biti validna";
    netacnoemail.style.color = "red";
    netacnoemail.style.visibility = "visible";

    netacno = true;
  }
  if (poruka.value == "") {
    netacnoporuka.innerHTML = "Poruka ne sme biti prazna";
    netacnoporuka.style.color = "red";
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
  if (event.target.id == "imeinput") {
    netacnoime.innerHTML = "a-z A-Z";
    netacnoime.style.color = "white";
    netacnoime.style.visibility = "visible";
    netacnoprezime.style.visibility = "hidden";
    netacnoemail.style.visibility = "hidden";
    netacnoporuka.style.visibility = "hidden";
  }
  if (event.target.id == "prezimeinput") {
    netacnoprezime.innerHTML = "a-z A-Z";
    netacnoprezime.style.color = "white";
    netacnoprezime.style.visibility = "visible";
    netacnoime.style.visibility = "hidden";
    netacnoemail.style.visibility = "hidden";
    netacnoporuka.style.visibility = "hidden";
  }
  if (event.target.id == "emailinput") {
    netacnoemail.innerHTML = "Example@gmail.com";
    netacnoemail.style.color = "white";
    netacnoemail.style.visibility = "visible";
    netacnoprezime.style.visibility = "hidden";
    netacnoime.style.visibility = "hidden";
    netacnoporuka.style.visibility = "hidden";
  }
  if (event.target.id == "porukainput") {
    netacnoporuka.innerHTML = "Vasa poruka ide ovde";
    netacnoporuka.style.color = "white";
    netacnoporuka.style.visibility = "visible";
    netacnoprezime.style.visibility = "hidden";
    netacnoemail.style.visibility = "hidden";
    netacnoime.style.visibility = "hidden";
  }
});
