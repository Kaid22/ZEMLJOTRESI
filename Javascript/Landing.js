document.addEventListener("DOMContentLoaded", function () {
  // Create a Leaflet map centered at a specific location
  const map = L.map("map").setView([0, 0], 2);

  // Add a tile layer (OpenStreetMap)
  L.tileLayer(
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
    {
      noWrap: true,
    }
  ).addTo(map);

  // Fetch the latest earthquake data from the USGS API
  fetch(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
  )
    .then((response) => response.json())
    .then((data) => {
      const place = data.features[0].properties.place;
      const magnitude = data.features[0].properties.mag;
      const latituda = data.features[0].geometry.coordinates[0];
      const longituda = data.features[0].geometry.coordinates[1];
      const depth = data.features[0].geometry.coordinates[2];
      const time = data.features[0].properties.time;
      PostaviPodatke(place, magnitude, latituda, longituda, depth, time);
      const coordinates = data.features[0].geometry.coordinates;
      const marker = L.marker([coordinates[1], coordinates[0]]).addTo(map);
      map.setMaxZoom(18);
      map.setMinZoom(2);
      map.setView([coordinates[1], coordinates[0]], 6);
      setMapBounds(map);
    })
    .catch((error) => console.error("Error fetching earthquake data:", error));
});
function PostaviPodatke(place, magnitude, latituda, longituda, depth, time) {
  const fwplace = document.getElementById("FWplace");
  const fwmagnituda = document.getElementById("FWmagnituda");
  const fwVreme = document.getElementById("FWvreme");
  const fwlokacija = document.getElementById("FWlokacija");
  const fwdubina = document.getElementById("FWdubina");

  fwplace.innerHTML = place;
  fwmagnituda.innerHTML = magnitude.toFixed(2);
  fwVreme.innerHTML = getDate(time) + " (UTC)";
  fwlokacija.innerHTML = NapraviLokaciju(latituda, longituda);
  fwdubina.innerHTML = depth.toFixed(2) + "km";
}
function getDate(timestamp) {
  console.log(timestamp);
  let date = new Date(timestamp);

  // Extracting different parts of the date
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // Month starts from 0, so we add 1
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Formatting the date and time
  let formattedDateTime = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  } ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;

  return formattedDateTime;
}
function NapraviLokaciju(lat, lng) {
  var str;
  if (lat >= 0) {
    str = lat.toFixed(2) + "°N  ";
  } else {
    str = Math.abs(lat).toFixed(2) + "°S  ";
  }
  if (lng >= 0) {
    str += lng.toFixed(2) + "°W";
  } else {
    str += Math.abs(lng).toFixed(2) + "°E";
  }
  return str;
}
function IdinaPretragu() {
  const currentURL = window.location.href;
  const lang = currentURL.split("/").pop().slice(0, 3);
  loggedin = localStorage.getItem("loggedin");
  if (loggedin == "true")
    window.location.href = "../HTML/" + lang + "SearchPage.html";
  else window.location.href = "../HTML/" + lang + "Login.html";
}
function setMapBounds(map) {
  map.invalidateSize();
  var maxBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));
  map.setMaxBounds(maxBounds);
  map.on("drag", function () {
    map.panInsideBounds(maxBounds, { animate: false });
  });
}
