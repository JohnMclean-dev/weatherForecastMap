// alert user to enter api key
const key = prompt('enter api key: ', '');
console.log(key);

// set initial location on map
var map = L.map('map').setView([0, 0], 2);

// add basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// get coordinate after click
map.on('click', function(e) {
    lat = e.latlng.lat;
    lng = e.latlng.lng;
    console.log(lat, lng);
});