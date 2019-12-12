


let mgtZoneSelector = document.querySelector('.zonedata');
let dataTypeSelector = document.querySelector('.datatype');
let farmSelector = document.querySelector('.farmdata');


function assignOptions(textArray, selector) {
    textArray.forEach(i => {
        let currentOption = document.createElement('option');
        currentOption.text = i;
        selector.appendChild(currentOption);
    })
}


window.onload = function () {

    // initial farmMap
    callFarm('Zambia/Isanya');

    // initial mean_data
    callVector('Isanya')

    assignOptions(mgt_zones, mgtZoneSelector);
    function updateZone() {
        setZonePlot(mgtZoneSelector.value);
        setDTypePlot("mean");
    };
    mgtZoneSelector.addEventListener('change', updateZone, false);

    assignOptions(['mean', 'std', 'cov'], dataTypeSelector)
    function updateDType() {
        setDTypePlot(dataTypeSelector.value);
    };
    dataTypeSelector.addEventListener('change', updateDType, false);

    assignOptions(Object.keys(mapViews), farmSelector)
    function updateFarm() {
        use_in_date_picker = farmSelector.value;
        callFarm(farmSelector.value);
        map.panTo(mapViews[use_in_date_picker])
        callVector(use_in_date_picker.split("/")[1])
    };
    farmSelector.addEventListener('change', updateFarm, false);
};
