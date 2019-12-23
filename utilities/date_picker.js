
let available_dates = [];
let selectedFromDate;
let selectedToDate;
let farms = [];
let farm;

let months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

let callFarm = (selectedFarm) => {
    
    // remove previously added geojsons and layers
    if (slider) {
        map.removeControl(slider);
    };
    if (map.hasLayer(tile_layer1)) {
        map.removeLayer(tile_layer1);
    }
    if (map.hasLayer(tile_layer2)) {
        map.removeLayer(tile_layer2);
    }

    for (key in map["_layers"]) {
        if (map["_layers"][key]["feature"]) {
            map.removeLayer(map["_layers"][key])
        }
    }

    // Brazil does not have sub-farms
    selectedFarm = (selectedFarm === "Brazil/brazilSubblocks") ? "Brazil" : selectedFarm
    farm = selectedFarm
    let jsonUrl = "https://geogecko.gis-cdn.net/geoserver/Olam_Vector/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Olam_Vector:olamwebsitedata&outputFormat=text/javascript&format_options=callback:handleWebsiteJson";
    $.ajax(jsonUrl,
        { dataType: "jsonp" }
    ).done(() => { });
};


function handleWebsiteJson(data) {

    // reset available dates if another farm is chosed
    available_dates.length = 0

    let zamb_isanya = data.features.filter(
        (feature) => {
            if (JSON.parse(feature.properties.info).key === farm) {
                return feature
            }
        }
    )
    let parsed_zam_isa = JSON.parse(zamb_isanya[0].properties.info)
    parsed_zam_isa.values.forEach((p) => available_dates.push(p.key))

    // clear graph everytime another farm is called
    Plotly.purge('chartContainer');
}

function days_(date) {
    let m = date.getMonth(), d = date.getDate(), y = date.getFullYear();
    if ($.inArray(y + '-' + months[m] + '-' + d, available_dates) != -1) {
        return [true];
    }
    return [false];
}

$(function () {
    $("#from").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        beforeShowDay: days_,
        onClose: function (selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
            selectedFromDate = selectedDate;
        }
    });
    $("#to").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        beforeShowDay: days_,
        onClose: function (selectedDate) {
            $("#from").datepicker("option", "maxDate", selectedDate);
            selectedToDate = selectedDate
        }
    });
});
