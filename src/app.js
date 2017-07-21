import './styles.css';

import { statesData } from './us-states'

const L = require('leaflet');

const map = L.map('map', {
    center: [37.8, -96],
    zoom: 4
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1IjoiaWdvcnlhaXRza3kiLCJhIjoiY2o1ZHdld2cxMGZteTJxbnVzYTQ5YnRiYyJ9.RROlDzi1Vxh6yILdjarxCg'
}).addTo(map);

var geojson;

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJSON(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);








// L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

// const map = L.map('map', {
//     center: [55.74659601670633, 37.683877944946296],
//     zoom: 6
// });

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1IjoiaWdvcnlhaXRza3kiLCJhIjoiY2o1ZHdld2cxMGZteTJxbnVzYTQ5YnRiYyJ9.RROlDzi1Vxh6yILdjarxCg'
// }).addTo(map);

// let markers = [];

// map.on('click', function (e) {
//     let marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

//     marker.bindPopup(`<b>Hello world!</b><br>I am a popup.${marker._latlng.lat + ' ' + marker._latlng.lng}`);

//     marker.on('click', function (e) {
//         console.log(e.latlng);
//     })

//     markers.push(marker);

//     console.log(markers);
// })

// let circle = L.circle([55.74175262364227, 37.64413833618165], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);

// let polygon = L.polygon([
//     [55.75426449918814, 37.66508102416993],
//     [55.75291205743683, 37.686882019042976],
//     [55.74677717934575, 37.68061637878419],
//     [55.748854450820616, 37.659673690795906]
// ], {
//     color: 'black'
// }).addTo(map);

// var states = [{
//     "type": "Feature",
//     "properties": {"party": "Republican"},
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [-104.05, 48.99],
//             [-97.22,  48.98],
//             [-96.58,  45.94],
//             [-104.03, 45.94],
//             [-104.05, 48.99]
//         ]]
//     }
// }, {
//     "type": "Feature",
//     "properties": {"party": "Democrat"},
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [-109.05, 41.00],
//             [-102.06, 40.99],
//             [-102.03, 36.99],
//             [-109.04, 36.99],
//             [-109.05, 41.00]
//         ]]
//     }
// }];

// L.geoJSON(states, {
//     style: function(feature) {
//         switch (feature.properties.party) {
//             case 'Republican': return {color: "#ff0000"};
//             case 'Democrat':   return {color: "#0000ff"};
//         }
//     }
// }).addTo(map);

// function onEachFeature(feature, layer) {
//     // does this feature have a property named popupContent?
//     if (feature.properties && feature.properties.popupContent) {
//         layer.bindPopup(feature.properties.popupContent);
//     }
// }

// var geojsonFeature = {
//     "type": "Feature",
//     "properties": {
//         "name": "Coors Field",
//         "amenity": "Baseball Stadium",
//         "popupContent": "This is where the Rockies play!"
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [-104.99404, 39.75621]
//     }
// };

// L.geoJSON(geojsonFeature, {
//     onEachFeature: onEachFeature
// }).addTo(map);