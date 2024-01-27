var map;
var EQList = [];
class Earthquake {
  constructor(location, latitude, longitude, magnitude, depth, time) {
    this.location = location;
    this.latitude = latitude;
    this.longitude = longitude;
    this.magnitude = magnitude;
    this.depth = depth;
    this.time = time;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  loggedchecker();
  const EQlist = document.getElementById("EQlist");
  map = L.map("mapid", {
    zoomControl: false,
    center: [90, 90],
    zoom: 2,
  });
  ToggleButtonsOnStart();
  initializeMap();
});
function initializeMap() {
  addTileLayer(map);
  setMapBounds(map);
  addTectonicPlates(map);
  addEarthquakeMarkers(map);
  map.setZoom(4);
  ZoomControl(map);
  return map;
}
function addTileLayer(map) {
  L.tileLayer(
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      minZoom: 3,
      noWrap: true,
    }
  ).addTo(map);
}
function setMapBounds(map) {
  map.invalidateSize();
  var maxBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));
  map.setMaxBounds(maxBounds);
  map.on("drag", function () {
    map.panInsideBounds(maxBounds, { animate: false });
  });
}
function addTectonicPlates(map) {
  fetch("../JSON/tectonicplatedata.json")
    .then((response) => response.json())
    .then((data) => {
      var tectonicPlates = L.geoJSON(data, {
        style: function (feature) {
          return {
            color: "red",
            weight: 2,
          };
        },
      });
      tectonicPlates.addTo(map);
    })
    .catch((error) =>
      console.error("Error fetching tectonic plate data:", error)
    );
}
function addEarthquakeMarkers(map) {
  const url = localStorage.getItem("FetchUrl");
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.features.forEach((element) => {
        const { coordinates } = element.geometry;
        const [longituda, latituda] = coordinates;
        const marker = L.marker([latituda, longituda]).addTo(map);
        marker.on("click", function (e) {
          PretraziStaviFW(e.target);
          FocusViewCoords(e.target);
          PrikaziFw();
        });
        let a = new Earthquake(
          element.properties.place,
          latituda,
          longituda,
          element.properties.mag,
          element.geometry.coordinates[2],
          element.properties.time
        );
        EQList.push(a);
      });
      FillEQList();
    })
    .catch((error) => console.log(error));
}
function getDate(timestamp) {
  let date = new Date(timestamp);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let formattedDateTime = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  } ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;

  return formattedDateTime;
}
function createEarthquakeElements(
  magnitude,
  name,
  time,
  depth,
  longidongi,
  latimati
) {
  const EQcontainer = document.createElement("div");
  EQcontainer.classList.add("EQcontainer");

  const magcontainer = document.createElement("div");
  magcontainer.classList.add("magcontainer");
  const magnitudeElement = document.createElement("h3");
  magnitudeElement.classList.add("magnitude");
  magnitudeElement.textContent = magnitude.toFixed(1);
  magcontainer.appendChild(magnitudeElement);

  const EQinfoCon = document.createElement("div");
  EQinfoCon.classList.add("EQinfoCon");
  const EQname = document.createElement("h4");
  EQname.classList.add("EQname");
  EQname.textContent = name;
  EQinfoCon.appendChild(EQname);

  const EQinfoCon2 = document.createElement("div");
  EQinfoCon2.classList.add("EQinfoCon2");
  const EQtime = document.createElement("h5");
  EQtime.classList.add("EQtime");
  EQtime.textContent = time;
  const EQdepth = document.createElement("h5");
  EQdepth.classList.add("EQdepth");
  EQdepth.textContent = depth.toFixed(2) + " km";
  EQinfoCon2.appendChild(EQtime);
  EQinfoCon2.appendChild(EQdepth);

  EQinfoCon.appendChild(EQinfoCon2);

  EQcontainer.setAttribute("data-lat", latimati);
  EQcontainer.setAttribute("data-lng", longidongi);
  EQcontainer.addEventListener("click", function () {
    FocusViewCoords(EQcontainer);
    PretraziStaviFW(EQcontainer);
    PrikaziFw();
  });
  EQcontainer.appendChild(magcontainer);
  EQcontainer.appendChild(EQinfoCon);

  EQlist.appendChild(EQcontainer);
}
function FocusViewCoords(element) {
  let zoomLevel = 10;
  let ZoomTimeSecs = 0.5;
  if (map.getZoom() > zoomLevel) {
    zoomLevel = map.getZoom();
  }
  if (element instanceof L.Marker) {
    var markerPosition = element.getLatLng();
    ZoomTimeSecs += 0.0000001 * map.getCenter().distanceTo(markerPosition);
    map.flyTo(markerPosition, zoomLevel, {
      duration: ZoomTimeSecs,
    });
  } else if (element instanceof HTMLElement) {
    var clickedLat = parseFloat(element.getAttribute("data-lat"));
    var clickedLng = parseFloat(element.getAttribute("data-lng"));
    markerPosition = [clickedLat, clickedLng];
    ZoomTimeSecs += 0.0000001 * map.getCenter().distanceTo(markerPosition);
    map.flyTo(markerPosition, zoomLevel, {
      duration: ZoomTimeSecs,
    });
  } else {
    console.error("Unsupported element type.");
  }
}
function PretraziStaviFW(element) {
  const fwMagnituda = document.getElementById("FWmagnituda");
  const fwVreme = document.getElementById("FWvreme");
  const fwLokacija = document.getElementById("FWlokacija");
  const fwDubina = document.getElementById("FWdubina");
  const fwNaziv = document.getElementById("FWNaziv");
  var markerPosition = [0, 0];
  if (element instanceof L.Marker) {
    markerPosition[0] = element.getLatLng().lat;
    markerPosition[1] = element.getLatLng().lng;
  } else if (element instanceof HTMLElement) {
    var clickedLat = parseFloat(element.getAttribute("data-lat"));
    var clickedLng = parseFloat(element.getAttribute("data-lng"));
    markerPosition = [clickedLat, clickedLng];
  }
  EQList.forEach((a) => {
    if (markerPosition[0] == a.latitude && markerPosition[1] == a.longitude) {
      fwMagnituda.innerHTML = a.magnitude;
      fwVreme.innerHTML = getDate(a.time) + " (UTC)";
      fwLokacija.innerHTML = NapraviLokaciju(a.latitude, a.longitude);
      fwDubina.innerHTML = a.depth + "km";
      fwNaziv.innerHTML = a.location;
    }
  });
}
function NapraviLokaciju(lat, lng) {
  var str;
  if (lat >= 0) {
    str = lat + "°N  ";
  } else {
    str = Math.abs(lat) + "°S  ";
  }
  if (lng >= 0) {
    str += lng + "°W";
  } else {
    str += Math.abs(lng) + "°E";
  }
  return str;
}
function SakrijFW() {
  const FW = document.getElementById("floating-window");
  FW.style.display = "none";
}
function PrikaziFw() {
  const FW = document.getElementById("floating-window");
  FW.style.display = "flex";
}
function FillEQList() {
  EQlist.innerHTML = "";
  EQList.forEach((earthquake) => {
    createEarthquakeElements(
      earthquake.magnitude,
      earthquake.location,
      getDate(earthquake.time) + " (UTC)",
      earthquake.depth,
      earthquake.longitude,
      earthquake.latitude
    );
  });
  const brojzemljotresa = document.getElementById("BrojZemljotresa");
  brojzemljotresa.innerHTML = EQList.length;
}
function SortByMagnitude(direction) {
  if (direction !== "asc" && direction !== "desc") {
    console.error('Invalid direction. Please use "asc" or "desc".');
    return;
  }

  EQList.sort((a, b) => {
    return direction === "asc"
      ? a.magnitude - b.magnitude
      : b.magnitude - a.magnitude;
  });

  FillEQList();
}
function SortByTime(direction) {
  if (direction !== "asc" && direction !== "desc") {
    console.error('Invalid direction. Please use "asc" or "desc".');
    return;
  }

  EQList.sort((a, b) => {
    return direction === "asc" ? a.time - b.time : b.time - a.time;
  });

  FillEQList();
}
function PrikaziDD(element) {
  if (element.classList.contains("dropbtn"))
    element.parentNode.children[1].classList.toggle("show");
  else element.parentNode.parentNode.children[1].classList.toggle("show");
}
window.onclick = function (event) {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains("show")) {
      openDropdown.classList.remove("show");
    }
  }
  if (
    event.target.classList.contains("dropbtn") ||
    event.target.classList.contains("btnelement")
  )
    PrikaziDD(event.target);
};
function isMobileDevice() {
  var mediaQuery = window.matchMedia("(max-width: 767px)");

  return mediaQuery.matches;
}
function toggleButton(button) {
  if (isMobileDevice()) {
    document.querySelectorAll(".toggle-button").forEach(function (otherButton) {
      if (otherButton !== button) {
        otherButton.classList.remove("active");
      }
    });

    if (!button.classList.contains("active")) {
      button.classList.add("active");
    }
  } else {
    var activeButtons = document.querySelectorAll(".toggle-button.active");

    if (activeButtons.length > 1 || !button.classList.contains("active")) {
      button.classList.toggle("active");
    }
  }
}
document.querySelectorAll(".toggle-button").forEach(function (button) {
  button.addEventListener("click", function () {
    toggleButton(button);
    var toggledButtons = document.querySelectorAll(".toggle-button.active");
    ToggleStylesOnButtons(Array.from(toggledButtons).map((btn) => btn.id));
  });
});
window.addEventListener("resize", function () {
  if (!isMobileDevice()) {
    var activeButtons = document.querySelectorAll(".toggle-button.active");

    if (activeButtons.length === 0) {
      document.querySelector(".toggle-button").classList.add("active");
    } else if (activeButtons.length > 1) {
      activeButtons.forEach(function (button, index) {
        if (index !== 0) {
          button.classList.remove("active");
        }
      });
    }
    var toggledButtons = document.querySelectorAll(".toggle-button.active");
    ToggleStylesOnButtons(Array.from(toggledButtons).map((btn) => btn.id));
  }
});
function ToggleButtonsOnStart() {
  var isMobile = window.matchMedia("(max-width: 767px)").matches;

  if (isMobile) {
    document.querySelector(".toggle-button").classList.add("active");
  } else {
    document.querySelectorAll(".toggle-button").forEach(function (button) {
      button.classList.add("active");
    });
  }
  var toggledButtons = document.querySelectorAll(".toggle-button.active");
  ToggleStylesOnButtons(Array.from(toggledButtons).map((btn) => btn.id));
}
function ToggleStylesOnButtons(arr) {
  MapContainer = document.getElementById("MapContainer");
  levo = document.getElementById("levo");
  if (arr.length == 2) {
    levo.classList.add("both");
    MapContainer.classList.add("both");
    levo.classList.remove("active");
    MapContainer.classList.remove("active");
    levo.classList.remove("inactive");
    MapContainer.classList.remove("inactive");
  } else if (arr[0] == ["list"]) {
    levo.classList.add("active");
    MapContainer.classList.add("inactive");
    levo.classList.remove("inactive");
    MapContainer.classList.remove("active");
    levo.classList.remove("both");
    MapContainer.classList.remove("both");
  } else if (arr[0] == ["globe"]) {
    levo.classList.add("inactive");
    MapContainer.classList.add("active");
    levo.classList.remove("both");
    MapContainer.classList.remove("both");
    levo.classList.remove("active");
    MapContainer.classList.remove("inactive");
  }
  setMapBounds(map);
}
function loggedchecker() {
  const currentURL = window.location.href;
  const lang = currentURL.split("/").pop().slice(0, 3);
  loggedin = localStorage.getItem("loggedin");
  if (loggedin != "true")
    window.location.href = "../HTML/" + lang + "Login.html";
}
function ZoomControl(map) {
  var zoomControl = L.control.zoom({
    position: "bottomleft",
  });
  zoomControl.addTo(map);
}
