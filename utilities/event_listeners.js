

let dataTypeSelector = document.querySelector('.datatype');
let farmSelector = document.querySelector('.farmdata');
let farmComparisonSelector = document.querySelector('.farmcomparisondata');



window.onload = function () {

    // initial mean_data
    callVector('Isanya')

    // initial farmMap
    callFarm('Zambia/Isanya');

    // initial farm comparison chart
    compareFarms("Zambia")

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

    assignOptions(['Zambia', 'Laos', 'Tanzania'], farmComparisonSelector)
    function updatRegion() {
        compareFarms(farmComparisonSelector.value);
    };
    farmComparisonSelector.addEventListener('change', updatRegion, false);
};
