// set initial location on map
var map = L.map('map').setView([0, 0], 2);

// add basemap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// create chart via highcharts module, helper function for map click event
function createChart(apiTimes, apiTemps) {
    const chart = Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: '5 day weather forecast'
        },
        xAxis: {
            categories: apiTimes
        },
        yAxis: {
            title: {
                text: 'Metrics per 3 hours'
            }
        },
        series: [{
            name: 'Temperature (K)',
            data: apiTemps
        }]
    });
};

// function to get weather data
async function getWeather(url) {
    // **TO DO** update function to catch errors
    let response = await fetch(url);
    let data = await response.json();
    let weathers = data['list']

    console.log(weathers);

    // create arrays for data to display in the chart
    times = [];
    temps = [];
    // rains = [];
    for (let i = 0; i < weathers.length; i++) {

        weather = weathers[i]
        time = weather['dt_txt'];
        temp = weather['main']['temp'];
        /*
        rain = weather['rain'];
        rain = (rain === undefined) ? 0 : rain['3h'];
        */

        times.push(time);
        temps.push(temp);
        //rains.push(rain);
    };

    // create chart with the data obtained above
    createChart(times, temps);
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
    };

    // show coordinate on map, give unique id
    marker = L.marker([lat, lng]).addTo(map);
    isMarkers = true;

    // create chart
    apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat.toString() + '&lon=' + lng.toString() + '&appid=' + key;
    getWeather(apiUrl);
});