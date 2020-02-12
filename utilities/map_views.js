

let mapViews = {
    "Brazil/brazilSubblocks": [-12.28, -45.5],
    "Laos/Kongtoun": [15.30286, 106.36875],
    "Laos/Phetlamka": [15.11309, 106.24055],
    "Laos/TH": [15.23389, 106.38246],
    "Laos/TM": [15.20479, 106.40411],
    "Laos/Xekatam": [15.1508, 106.5523],
    "Tanzania/DivisionA": [-10.6995, 35.2637],
    "Tanzania/DivisionB": [-10.7167, 35.2523],
    "Tanzania/DivisionC": [-10.7288, 35.2357],
    "Zambia/Isanya": [-8.81126, 31.33066],
    "Zambia/Kateshi": [-10.0203, 31.2216],
    "Zambia/Lukulu": [-10.3188, 30.9372],
    "Zambia/Luombe": [-9.74655, 31.14099],
    "Zambia/Ngoli": [-9.78316, 31.20458],
    "Zambia/Nsunzu": [-9.0895, 31.4475],
}


let places_ = [
    'Brazil', 'DivisionA', 'DivisionB', 'DivisionC', 'Isanya', 'Kateshi',
    'Kongtoun', 'Lukulu', 'Luombe', 'Ngoli', 'Nsunzu', 'Phetlamka', 'TH', 'Xekatam'
]

let months_ = {
    "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
    "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
};


let rangeselector = {
    buttons: [
        {
            count: 1,
            label: '<b>Monthly<b>',
            step: 'month',
            stepmode: 'backward',
            
        },
        {
            count: 6,
            label: '<b>Bi-Anually<b>',
            step: 'month',
            stepmode: 'backward'
        },
        { step: '<b>All<b>' }
    ]
}

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "450",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function whenClicked(e) {
    document.querySelector('.zonedata').value = e.target.feature.properties.Name;
    setZonePlot(e.target.feature.properties.Name);
    setDTypePlot("mean")
    toastr.clear()
    toastr.success("", `Performance Line chart updated to ${e.target.feature.properties.Name}`)
}

function onMouseOver(e) {
    this.openPopup();
}

function onMouseOut(e) {
    this.closePopup();
}

function onEachFeature(feature, layer) {
    layer.on({
        click: whenClicked,
        mouseover: onMouseOver,
        mouseout: onMouseOut,
    });
    layer.bindPopup(
        `${feature.properties.Name} unit_id: ${
        feature.properties.unit_id ? feature.properties.unit_id : feature.properties.SUB_BLOCK
        }`
    );
}
