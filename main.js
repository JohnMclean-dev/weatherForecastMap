// alert user to enter api key
// const key = prompt('enter api key: ', '');

// set initial location on map
var map = L.map('map').setView([0, 0], 2);

// add basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// function to retrieve weather forecast data via api



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

    return chart
};

// generate unique id, helper function for click event
function generateId() {
    var id = '';
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 36; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    };
    return id;
};

// function to handle click event on map
map.on('click', function (e) {
    // get coordinate on click event
    lat = e.latlng.lat;
    lng = e.latlng.lng;

    // show coordinate on map, give unique id
    marker = L.marker([lat, lng]).addTo(map);
    marker.id = generateId();

    //
    console.log(marker.id);
    createChart();
});