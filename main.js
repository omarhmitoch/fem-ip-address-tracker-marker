let mymap = L.map("mapid");
const input = document.querySelector("#input");
const icon = document.querySelector(".erorrIcon");
const submitBtn = document.querySelector("#submitBtn");
const ipPlaceholder = document.querySelector("#ip");
const locationPlaceholder = document.querySelector("#location");
const timezonePlaceholder = document.querySelector("#timezone");
const ispPlaceholder = document.querySelector("#isp");
let state = false;
mymap.setView([51.505, -0.09], 13);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,

    accessToken: "your.mapbox.access.token",
  }
).addTo(mymap);

let myIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
});

function ValidateIPaddress(ipaddress) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }
  return false;
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value.length > 0) {
    if (ValidateIPaddress(input.value)) {
      state = false;
      update();
      getIpData(input.value.trim());
    } else {
      state = true;
      update();
    }
  } else {
    getIpData();
  }
});

const update = () => {
  if (state) {
    input.classList.add("error");
    icon.classList.add("error");
  } else {
    input.classList.remove("error");
    icon.classList.remove("error");
  }
};
const getIpData = (ip = "") => {
  fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_H2JjawqaRZi1g6451VWyKRjX36jcK&ipAddress=${ip}`
  )
    .then((response) => response.json())
    .then((data) => {
      ipPlaceholder.innerHTML = data.ip.trim();
      locationPlaceholder.innerHTML =
        data.location.city + "," + data.location.country;
      timezonePlaceholder.innerHTML = "UTC " + data.location.timezone;
      ispPlaceholder.innerHTML = data.isp;
      let map_data = [data.location.lat, data.location.lng];
      mymap.setView(map_data, 13);
      let marker = L.marker(map_data, { icon: myIcon }).addTo(mymap);
    });
};
