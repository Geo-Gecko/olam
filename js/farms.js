

let set_mgt_zones = new Set()
let mgt_zones = []

let ndvi_mean_date = [];
let setZonePlot;
let setDataTypeplot;
let traces;

let mgtZoneSelector = document.querySelector('.zonedata');
function assignOptions(textArray, selector) {
  textArray.forEach(i => {
      let currentOption = document.createElement('option');
      currentOption.text = i;
      selector.appendChild(currentOption);
  })
}


let dataTypeSelector = document.querySelector('.datatype');
function assignDTypeOptions(textArray, selector) {
  textArray.forEach(i => {
      let currentOption = document.createElement('option');
      currentOption.text = i;
      selector.appendChild(currentOption);
  })
}


let jsonUrl_ = "https://geogecko.gis-cdn.net/geoserver/Olam_Vector/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Olam_Vector:Isanya&outputFormat=text/javascript&format_options=callback:handleWebsiteJson_";
$.ajax(jsonUrl_,
    { dataType: "jsonp" }
).done(() => { });

 function handleWebsiteJson_(data) {
  // get date values...hopefully they are the same..tihi
  let ndvi_mean_std = Object.keys(data.features[0].properties).slice(start=4)
  ndvi_mean_std.forEach(e => {
    if (e.slice(start=e.length - 4) === 'mean'){
      let date_ = e.split("_")[1];
      date_ = date_.slice(0, 4) + '-' + date_.slice(4, 6) + '-' + date_.slice(start=6)
      ndvi_mean_date.push(date_);
    };
  });

  // get mgt zones as unique strings for the buttons
  data.features.forEach(feature => {
    set_mgt_zones.add(feature.properties.Name)
    mgt_zones = Array.from(set_mgt_zones)
  });

  setZonePlot = (zone) => {
    let ndvi_mean_data = [];
    let ndvi_std_data = [];
    
    data.features.forEach(feature => {

      if (feature.properties.Name == zone) {
        let ndvi_mean_std_ = Object.keys(feature.properties).slice(start=4)
      
        let these_mean_values = [];
        let these_std_values = [];
        ndvi_mean_std_.forEach(e => {
          if (e.slice(start=e.length - 4) === 'mean'){
            these_mean_values.push(feature.properties[e]);
          };

          if (e.slice(start=e.length - 3) === 'std'){
            these_std_values.push(feature.properties[e]);
          };
        });

        ndvi_mean_data.push({
          type: 'scatter',
          mode: 'lines+marker',
          line: {shape: 'spline'},
          name: `unit_id_${feature.properties.unit_id}`,
          x: ndvi_mean_date,
          y: these_mean_values
        });

        ndvi_std_data.push({
          type: 'scatter',
          mode: 'lines+marker',
          line: {shape: 'spline'},
          name: `unit_id_${feature.properties.unit_id}`,
          x: ndvi_mean_date,
          y: these_std_values
        });
      };  
    });

    traces = {"std": ndvi_std_data, "mean": ndvi_mean_data}
    setDTypePlot = (dataType) => Plotly.newPlot(
      'chartContainer',
      traces[dataType],
      {
        title: {
          text:`Farm Performance for ${zone}`,
          font: {
            family: 'Times New, roman',
            size: 24
          }
        }
      },
      {responsive: true}
    );
  };
};


window.onload = function() {

  mgt_zones.sort((a, b) => {
    a = parseInt(a.split(' ')[1]);
    b = parseInt(b.split(' ')[1]);
    if (a < b) {
      return -1;
    } else if ( a > b) {
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

  assignDTypeOptions(['mean', 'std'], dataTypeSelector)
  function updateDType() {
    setDTypePlot(dataTypeSelector.value);
  };
  dataTypeSelector.addEventListener('change', updateDType, false);
};
