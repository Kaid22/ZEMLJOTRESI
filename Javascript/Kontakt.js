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
  console.log(proveriJezik());
  var netacno = false;
  if (!containsOnlyLetters(ime.value)) {
    if (proveriJezik() == "sr")
      netacnoime.innerHTML = "Polje prihvata samo slova";
    else netacnoime.innerHTML = "Field accepts only letters";
    netacnoime.style.color = "red";
    netacnoime.style.visibility = "visible";

    netacno = true;
  }
  if (!containsOnlyLetters(prezime.value)) {
    if (proveriJezik() == "sr")
      netacnoprezime.innerHTML = "Polje prihvata samo slova";
    else netacnoprezime.innerHTML = "Field accepts only letters";
    netacnoprezime.style.color = "red";
    netacnoprezime.style.visibility = "visible";

    netacno = true;
  }
  if (!IsEmail(email.value)) {
    if (proveriJezik() == "sr")
      netacnoemail.innerHTML = "Email adresa mora biti validna";
    else netacnoemail.innerHTML = "Email address must be valid";
    netacnoemail.style.color = "red";
    netacnoemail.style.visibility = "visible";

    netacno = true;
  }
  if (poruka.value == "") {
    if (proveriJezik() == "sr")
      netacnoporuka.innerHTML = "Poruka ne sme biti prazna";
    else netacnoporuka.innerHTML = "Message field can not be empty";
    netacnoporuka.style.color = "red";
    netacnoporuka.style.visibility = "visible";

    netacno = true;
  }
  if (!netacno) {
    if (proveriJezik() == "sr") alert("Poruka je uspesno poslata");
    else alert("Message sent succesfully");
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
function proveriJezik() {
  currentURL = window.location.href;
  const lang = currentURL.split("/").pop().slice(0, 2);
  return lang;
}
