// set initial location on map
var map = L.map('map').setView([0, 0], 2);

// add basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// create chart via highcharts module, helper function for map click event
function createChart() {
    const chart = Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
};

// function to get weather data
async function getWeather(url) {
    // **TO DO** update function to catch errors
    const response = await fetch(url);
    const data = await response.json();
    console.log(data['list']);
    createChart();
};

// function to handle click event on map
var isMarkers = false;

map.on('click', function (e) {
    // get coordinate on click event
    lat = e.latlng.lat;
    lng = e.latlng.lng;

    // check to see if there is a previous marker to remove
    if (isMarkers) {
        map.removeLayer(marker);
        ids.shift();
    };

    // show coordinate on map, give unique id
    marker = L.marker([lat, lng]).addTo(map);
    isMarkers = true;

    // create chart
    apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat.toString() + '&lon=' + lng.toString() + '&appid=' + key;
    getWeather(apiUrl);
});