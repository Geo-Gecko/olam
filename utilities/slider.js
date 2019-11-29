
// $(window).on("load", function() {
//   $("#twentytwenty-container").twentytwenty();
// });

// Create the sidebyside slider Leaflet maps
var map = L.map('mymap').setView([-8.81126, 31.33066], 14);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

var mapLayer1 = L.tileLayer.wms('https://geogecko.gis-cdn.net/geoserver/ows?', {
    layers: 'olamMosaics:Zambia_ndviData',
    dim_location: "Isanya/Isanya_20190130.tif",
    transparent: true,
    format: 'image/png'
}).addTo(map);

var mapLayer2 = L.tileLayer.wms('https://geogecko.gis-cdn.net/geoserver/ows?', {
    layers: 'olamMosaics:Zambia_ndviData',
    dim_location: "Isanya/Isanya_20180510.tif",
    transparent: true,
    format: 'image/png'
}).addTo(map);

L.control.sideBySide(mapLayer1, mapLayer2).addTo(map);