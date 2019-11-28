
// Creating map options
let mapOptions = {
center: [-8.82009, 31.32271],
zoom: 13
}

// OSM Baselayer

let bounds = [
[-250, -250],
[100, 100]
];

// Creating a map object
let map_options = new L.map('map', mapOptions);

// Creating a Layer object
let layer = new L.TileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png');

// Adding layer to the map
map_options.addLayer(layer);

let scale = L.control.scale(); // Creating scale control
scale.addTo(map); // Adding scale control to the map

// Options for the marker
let markerOptions = {
title: "MyLocation",
clickable: true,
draggable: true
}

// Creating a marker
let marker = new L.Marker([-8.4883999, 31.1955], markerOptions);

// loading GeoJSON file - Here my html and usa_adm.geojson file resides in same folder
$.getJSON("Isanya_WGS84.geojson", function (data) {
// L.geoJson function is used to parse geojson file and load on to map
L.geoJson(data).addTo(map);
});
// Adding pop-up to the marker
marker.bindPopup('Isanya').openPopup();

// Adding marker to the map
marker.addTo(map);
