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
  if (!ImeRegex(ime.value)) {
    if (proveriJezik() == "sr")
      netacnoime.innerHTML = "Polje prihvata samo 5-9 velikih slova";
    else netacnoime.innerHTML = "Field accepts only 5-9 uppercase letters";
    netacnoime.style.color = "red";
    netacnoime.style.visibility = "visible";

    netacno = true;
  }
  if (!PrezimeRegex(prezime.value)) {
    if (proveriJezik() == "sr")
      netacnoprezime.innerHTML = "Polje prihvata samo 3-20 velikih slova";
    else netacnoprezime.innerHTML = "Field accepts only 3-20 uppercase letters";
    netacnoprezime.style.color = "red";
    netacnoprezime.style.visibility = "visible";

    netacno = true;
  }
  if (!EmailRegex(email.value)) {
    if (proveriJezik() == "sr")
      netacnoemail.innerHTML = "Email adresa mora sadžati .edu";
    else netacnoemail.innerHTML = "Email address must contain .edu";
    netacnoemail.style.color = "red";
    netacnoemail.style.visibility = "visible";

    netacno = true;
  }
  if (!PorukaRegex(poruka.value)) {
    if (proveriJezik() == "sr")
      netacnoporuka.innerHTML = "Recenice moraju biti sintaksički tačne";
    else netacnoporuka.innerHTML = "Sentences need to have the correct syntax";
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
function ImeRegex(str) {
  const regex = /^[A-Z]{5,9}$/;
  return regex.test(str);
}
function PrezimeRegex(str) {
  const regex = /[A-Z]{3,20}/;
  return regex.test(str);
}
function EmailRegex(str) {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(edu)[A-Z|a-z]{0,}$/;
  return regex.test(str);
}
function PorukaRegex(str) {
  const regex = /^(?:(?:(?:[A-Z][a-z]*\s?)+[.?!])\s?)+$/;
  return regex.test(str);
}
window.addEventListener("click", function (event) {
  if (event.target.id == "imeinput") {
    if (proveriJezik() == "sr") netacnoime.innerHTML = "5-9 znakova [A-Z]";
    else netacnoime.innerHTML = "5-9 characters [A-Z]";
    netacnoime.style.color = "white";
    netacnoime.style.visibility = "visible";
    netacnoprezime.style.visibility = "hidden";
    netacnoemail.style.visibility = "hidden";
    netacnoporuka.style.visibility = "hidden";
  }
  if (event.target.id == "prezimeinput") {
    if (proveriJezik() == "sr") netacnoprezime.innerHTML = "3-20 znakova [A-Z]";
    else netacnoprezime.innerHTML = "3-20 characters [A-Z]";
    netacnoprezime.style.color = "white";
    netacnoprezime.style.visibility = "visible";
    netacnoime.style.visibility = "hidden";
    netacnoemail.style.visibility = "hidden";
    netacnoporuka.style.visibility = "hidden";
  }
  if (event.target.id == "emailinput") {
    netacnoemail.innerHTML = "Example@gmail.edu";
    netacnoemail.style.color = "white";
    netacnoemail.style.visibility = "visible";
    netacnoprezime.style.visibility = "hidden";
    netacnoime.style.visibility = "hidden";
    netacnoporuka.style.visibility = "hidden";
  }
  if (event.target.id == "porukainput") {
    if (proveriJezik() == "sr")
      netacnoporuka.innerHTML = "Vasa poruka ide ovde";
    else netacnoporuka.innerHTML = "Your message goes here";
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
