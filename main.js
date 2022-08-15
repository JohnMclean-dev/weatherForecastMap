// alert user to enter api key
const key = prompt('enter api key: ', '');

// set initial location on map
var map = L.map('map').setView([0, 0], 2);

// add basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// function to retrieve and edit weather source data

const url = 'https://forecast.weathersourceapis.com/v2/points/38.8552,-77.0513/days?fields=all&unitScale=IMPERIAL';

console.log(fetch(url, {
    method: 'GET',
    headers: {
        'accept': 'application/json',
        'X-API-KEY': key
    }
}));

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

// get coordinate after click
map.on('click', function (e) {
    lat = e.latlng.lat;
    lng = e.latlng.lng;
    console.log(lat, lng);
    createChart();
});

