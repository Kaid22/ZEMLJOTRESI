var defaultValues = {
  endtime: "",
  starttime: "",
  minlatitude: "",
  minlongitude: "",
  maxlatitude: "",
  maxlongitude: "",
  latitude: "",
  longitude: "",
  maxradiuskm: "",
  limit: "",
  maxdepth: "",
  maxmagnitude: "",
  mindepth: "",
  minmagnitude: "",
  orderby: "",
};
loggedchecker();
document.addEventListener("DOMContentLoaded", function () {
  loggedchecker();
  document.getElementById("starttime").max = new Date()
    .toISOString()
    .split("T")[0];
  document.getElementById("endtime").max = new Date()
    .toISOString()
    .split("T")[0];
  defaultValuesString = JSON.stringify(defaultValues);
  localStorage.setItem("params", defaultValuesString);
});
function Stisnutodugme() {
  proveriMagTimeBox();
  RectangleCheck();
  KrugCheck();
  ProveriDubinu();
  ProveriFormat();
  constructURL();
}
function constructURL() {
  var baseUrl =
    "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";

  var storedValues =
    JSON.parse(localStorage.getItem("params")) || defaultValues;
  var variables = [
    "endtime",
    "starttime",
    "minlatitude",
    "minlongitude",
    "maxlatitude",
    "maxlongitude",
    "latitude",
    "longitude",
    "maxradiuskm",
    "limit",
    "maxdepth",
    "maxmagnitude",
    "mindepth",
    "minmagnitude",
    "orderby",
  ];
  var params = [];
  for (var i = 0; i < variables.length; i++) {
    var value = storedValues[variables[i]] || "";
    if (value !== "") {
      params.push(variables[i] + "=" + value);
    }
  }

  var url = baseUrl + (params.length > 0 ? "&" + params.join("&") : "");

  localStorage.setItem("FetchUrl", url);
  const currentURL = window.location.href;
  const lang = currentURL.split("/").pop().slice(0, 3);
  window.location.href = "../HTML/" + lang + "index.html";
}
function updateParameter(paramName, paramValue) {
  var storedValues =
    JSON.parse(localStorage.getItem("params")) || defaultValues;
  storedValues[paramName] = paramValue;
  localStorage.setItem("params", JSON.stringify(storedValues));
}
function proveriMagTimeBox() {
  var magnitudadugmad = document.getElementsByName("magnituda");
  var magstisnuto;
  for (let i = 0; i < magnitudadugmad.length; i++) {
    if (magnitudadugmad[i].checked) {
      magstisnuto = magnitudadugmad[i].value;
    }
  }
  switch (magstisnuto) {
    case "4.5":
      updateParameter("minmagnitude", 4.5);
      break;
    case "2.5":
      updateParameter("minmagnitude", 2.5);
      break;
    case "Drugo":
      minmagvalue = document.getElementById("minmagnitude").value;
      maxmagvalue = document.getElementById("maxmagnitude").value;
      updateParameter("minmagnitude", minmagvalue);
      updateParameter("maxmagnitude", maxmagvalue);
      break;
    default:
      break;
  }
  var vremedugmad = document.getElementsByName("vreme");
  var vremestisnuto;
  for (let i = 0; i < vremedugmad.length; i++) {
    if (vremedugmad[i].checked) {
      vremestisnuto = vremedugmad[i].value;
    }
  }
  var currentDate = new Date();
  switch (vremestisnuto) {
    case "7":
      updateParameter(
        "endtime",
        currentDate.toISOString().replace("Z", "").slice(0, 19)
      );
      currentDate.setDate(currentDate.getDate() - 7);
      updateParameter(
        "starttime",
        currentDate.toISOString().replace("Z", "").slice(0, 19)
      );
      break;
    case "30":
      updateParameter(
        "endtime",
        currentDate.toISOString().replace("Z", "").slice(0, 19)
      );
      currentDate.setDate(currentDate.getDate() - 30);
      updateParameter(
        "starttime",
        currentDate.toISOString().replace("Z", "").slice(0, 19)
      );
      break;
    case "Drugo":
      startdateval = document.getElementById("starttime").value;
      enddateval = document.getElementById("endtime").value;
      updateParameter("starttime", startdateval);
      updateParameter("endtime", enddateval);
      break;
    default:
      break;
  }
}
function enableMag() {
  document.getElementById("maxmagnitude").removeAttribute("disabled");
  document.getElementById("minmagnitude").removeAttribute("disabled");
}
function enableTime() {
  document.getElementById("starttime").removeAttribute("disabled");
  document.getElementById("endtime").removeAttribute("disabled");
}
function disableMag() {
  document.getElementById("maxmagnitude").setAttribute("disabled", true);
  document.getElementById("minmagnitude").setAttribute("disabled", true);
}
function disableTime() {
  document.getElementById("starttime").setAttribute("disabled", true);
  document.getElementById("endtime").setAttribute("disabled", true);
}
function RectangleCheck() {
  var maxlat = document.getElementById("maxlatitude");
  var minlat = document.getElementById("minlatitude");
  var maxlng = document.getElementById("maxlongitude");
  var minlng = document.getElementById("minlongitude");
  updateParameter("maxlatitude", maxlat.value);
  updateParameter("minlatitude", minlat.value);
  updateParameter("maxlongitude", maxlng.value);
  updateParameter("minlongitude", minlng.value);
}
function KrugCheck() {
  lat = document.getElementById("latitude");
  lng = document.getElementById("longitude");
  rad = document.getElementById("maxradiuskm");
  updateParameter("latitude", lat.value);
  updateParameter("longitude", lng.value);
  updateParameter("maxradiuskm", rad.value);
}
function ProveriDubinu() {
  mind = document.getElementById("mindepth");
  maxd = document.getElementById("maxdepth");
  updateParameter("mindepth", mind.value);
  updateParameter("maxdepth", maxd.value);
}
function ProveriFormat() {
  num = document.getElementById("limit");
  updateParameter("limit", num.value);

  var orderselect = document.getElementById("orderby");
  var selektovano;
  for (var i = 0; i < orderselect.options.length; i++) {
    var option = orderselect.options[i];
    if (option.selected) {
      selektovano = orderselect.options[i].value;
    }
  }
  updateParameter("orderby", selektovano);
}
function loggedchecker() {
  const currentURL = window.location.href;
  const lang = currentURL.split("/").pop().slice(0, 3);
  loggedin = localStorage.getItem("loggedin");
  if (loggedin != "true")
    window.location.href = "../HTML/" + lang + "Login.html";
}
