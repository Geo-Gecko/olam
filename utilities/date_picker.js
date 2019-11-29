
let available_dates = [];

let months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

let jsonUrl = "https://geogecko.gis-cdn.net/geoserver/Olam_Vector/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Olam_Vector:olamwebsitedata&outputFormat=text/javascript&format_options=callback:handleWebsiteJson";
$.ajax(jsonUrl,
    { dataType: "jsonp" }
).done(() => { });

function handleWebsiteJson(data) {
    let zamb_isanya = data.features.filter(
        (feature) => {
            if (JSON.parse(feature.properties.info).key === "Zambia/Isanya") {
                return feature
            }
        }
    )
    let parsed_zam_isa = JSON.parse(zamb_isanya[0].properties.info)
    parsed_zam_isa.values.forEach((p) => available_dates.push(p.key))
}


/* utility functions */
function days_(date) {
    let m = date.getMonth(), d = date.getDate(), y = date.getFullYear();
    m = months[m-1];
    if($.inArray(y + '-' + m + '-' + d, available_dates) != -1) {
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
        }
    });
    $("#to").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
		beforeShowDay: days_,
        onClose: function (selectedDate) {
            $("#from").datepicker("option", "maxDate", selectedDate);
        }
    });
});
