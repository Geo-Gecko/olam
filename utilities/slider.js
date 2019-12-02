

// Create the sidebyside slider Leaflet maps
var map = L.map('mymap').setView([-8.81126, 31.33066], 14);
let slider;
let tile_layer1;
let tile_layer2;

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);


$('#new_map').click( () => {

    // reformat date to geoserver-format
    let p_ = selectedFromDate.split("/").reverse()
    let m_ = p_[2]
    p_[2] = p_[1]
    p_[1] = m_ 
    p_ = p_.join("")

    if (slider) {
        map.removeControl(slider);
    };
    if (tile_layer1) {
        map.removeLayer(tile_layer1);
    }
    if (tile_layer2) {
        map.removeLayer(tile_layer2);
    }
    tile_layer1 = L.tileLayer.wms('https://geogecko.gis-cdn.net/geoserver/ows?', {
        layers: 'olamMosaics:Zambia_ndviData',
        dim_location: `Isanya/Isanya_${p_}.tif`,
        transparent: true,
        format: 'image/png'
    }).addTo(map);

    
    let q_ = selectedToDate.split("/").reverse()
    let n_ = q_[2]
    q_[2] = q_[1]
    q_[1] = n_
    q_ = q_.join("")

    tile_layer2 = L.tileLayer.wms('https://geogecko.gis-cdn.net/geoserver/ows?', {
        layers: 'olamMosaics:Zambia_ndviData',
        dim_location: `Isanya/Isanya_${q_}.tif`,
        transparent: true,
        format: 'image/png'
    }).addTo(map);


    slider = L.control.sideBySide(tile_layer1, tile_layer2).addTo(map);
})
