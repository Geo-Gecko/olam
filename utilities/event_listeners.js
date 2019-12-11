

window.onload = function () {

    mgt_zones.sort((a, b) => {
        a = parseInt(a.split(' ')[1]);
        b = parseInt(b.split(' ')[1]);
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        }
        return 0;
    });
    assignOptions(mgt_zones, mgtZoneSelector);


    // initial plot
    setZonePlot(mgt_zones[0]);
    setDTypePlot("mean");

    function updateZone() {
        setZonePlot(mgtZoneSelector.value);
        setDTypePlot("mean");
    };
    mgtZoneSelector.addEventListener('change', updateZone, false);

    assignDTypeOptions(['mean', 'std', 'cov'], dataTypeSelector)
    function updateDType() {
        setDTypePlot(dataTypeSelector.value);
    };
    dataTypeSelector.addEventListener('change', updateDType, false);
};
