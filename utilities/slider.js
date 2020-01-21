

// Create the sidebyside slider Leaflet maps
var map = L.map('mymap').setView(mapViews["Zambia/Isanya"], 14);
let slider;
let tile_layer1;
let tile_layer2;
let mosaic_layer;
let layers;
let filter_ = [
    'grayscale:100%'
];

var Esri_WorldImagery = L.tileLayer.colorFilter('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    filter: filter_,
}).addTo(map);

    
$('#new_map').click( () => {

    // reformat date to geoserver-format
    use_in_date_picker = use_in_date_picker ?
     use_in_date_picker.split("/")[1] + '/' + use_in_date_picker.split("/")[1] : "Isanya/Isanya";

    // get mosaic layer
    layers = {
        "Zambia": ["Isanya", "Lukulu", "Luombe", "Ngoli", "Kateshi", "Nsunzu"],
        "Laos": ["Phetlamka", "TH", "TM", "Xekatam", "Kongtoun"],
        "Tanzania": ["DivisionA", "DivisionB", "DivisionC"],
        "Brazil": ["brazilSubblocks"]
    }

    if ( use_in_date_picker.split("/")[0] == "Isanya") {
        mosaic_layer = "Zambia"
    }

    Object.keys(layers).forEach(key => {
        layers[key].forEach(value => {
            if (value === use_in_date_picker.split("/")[1]) {
                mosaic_layer = key
                return true
            }
        })
    })

    mosaic_layer = (mosaic_layer === "brazilSubblocks") ? "Brazil" : mosaic_layer;
    use_in_date_picker = (use_in_date_picker === "brazilSubblocks/brazilSubblocks") ? "Brazil" : use_in_date_picker;

    let p_ = selectedFromDate.split("/").reverse()
    let m_ = p_[2]
    p_[2] = p_[1]
    p_[1] = m_ 
    p_ = p_.join("")

    if (slider) {
        map.removeControl(slider);
    };
    if (map.hasLayer(tile_layer1)) {
        map.removeLayer(tile_layer1);
    }
    if (map.hasLayer(tile_layer2)) {
        map.removeLayer(tile_layer2);
    }
    tile_layer1 = L.tileLayer.wms('https://geogecko.gis-cdn.net/geoserver/ows?', {
        layers: `olamMosaics:${mosaic_layer}_ndviData`,
        dim_location: `${use_in_date_picker}_${p_}.tif`,
        transparent: true,
        format: 'image/png'
    }).addTo(map);


    let q_ = selectedToDate.split("/").reverse()
    let n_ = q_[2]
    q_[2] = q_[1]
    q_[1] = n_
    q_ = q_.join("")

    tile_layer2 = L.tileLayer.wms('https://geogecko.gis-cdn.net/geoserver/ows?', {
        layers: `olamMosaics:${mosaic_layer}_ndviData`,
        dim_location: `${use_in_date_picker}_${q_}.tif`,
        transparent: true,
        format: 'image/png'
    }).addTo(map);


    slider = L.control.sideBySide(tile_layer1, tile_layer2).addTo(map);
})
