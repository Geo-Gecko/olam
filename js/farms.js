
let mgtZoneSelector = document.querySelector('.zonedata');
let set_mgt_zones = new Set()
let mgt_zones = [];
let use_in_date_picker;

let ndvi_date = [];
// let setZonePlot;
let setDataTypeplot;
let traces;

// this should be in event_listeners.js
let assignOptions = (textArray, selector) => {

  // empty dropdowns if this function is called again
  $(`.${selector.className.split(" ")[1]}`).empty();

  textArray.forEach(i => {
    let currentOption = document.createElement('option');
    currentOption.text = i;
    selector.appendChild(currentOption);
  })
}
function updateZone() {
  setZonePlot(mgtZoneSelector.value);
  setDTypePlot("mean");
};

let callVector = (selectedFarm) => {

  document.getElementById("csv").setAttribute(
    "href",
    `https://geogecko.gis-cdn.net/geoserver/Olam_Vector/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Olam_Vector:${selectedFarm}&outputFormat=csv`
  )

  let jsonUrl_ = `https://geogecko.gis-cdn.net/geoserver/Olam_Vector/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Olam_Vector:${selectedFarm}&outputFormat=text/javascript&format_options=callback:handleWebsiteJson_`;
  $.ajax(jsonUrl_,
    { dataType: "jsonp" }
  ).done(() => { });
}

function handleWebsiteJson_(data) {
  // get date values...hopefully they are the same..tihi
  let ndvi_mean_std = Object.keys(data.features[0].properties).slice(start = 4)
  ndvi_date.length = 0
  ndvi_mean_std.forEach(e => {
    if (e.slice(start = e.length - 4) === 'mean') {
      let date_ = e.split("_")[1];
      date_ = date_.slice(0, 4) + '-' + date_.slice(4, 6) + '-' + date_.slice(start = 6)
      ndvi_date.push(date_);
    };
  });


  set_mgt_zones.clear()
  mgt_zones.length = 0
  // get mgt zones as unique strings for the buttons
  data.features.forEach(feature => {

    // get the different fields for a region
    if (feature.geometry) {
      L.geoJson(
        feature,
        { onEachFeature: onEachFeature }
      ).addTo(map);
    }

    set_mgt_zones.add(feature.properties.Name)
    mgt_zones = Array.from(set_mgt_zones)
  });

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
  mgtZoneSelector.addEventListener('change', updateZone, false);


  setZonePlot = (zone) => {
    let ndvi_mean_data = [];
    let ndvi_std_data = [];
    let ndvi_cov_data = [];

    data.features.forEach(feature => {

      if (feature.properties.Name == zone) {
        let ndvi_mean_std_ = Object.keys(feature.properties).filter((str_) => {
          let filter_ = feature.id.split(".")[0]
          filter_ = (filter_ === "brazilSubblocks") ? "Brazil" : filter_
          if (str_.split("_")[0] === filter_) {
            return str_
          }
        })

        let these_mean_values = [];
        let these_std_values = [];
        ndvi_mean_std_.forEach(e => {
          if (e.slice(start = e.length - 4) === 'mean') {
            these_mean_values.push(feature.properties[e]);
          };

          if (e.slice(start = e.length - 3) === 'std') {
            these_std_values.push(feature.properties[e]);
          };
        });

        let these_cov_values = [];
        for (let i = 0; i < these_mean_values.length; i++) {
          these_cov_values.push(
            these_std_values[i] / these_mean_values[i]
          );
        };


        ndvi_mean_data.push({
          type: 'scatter',
          mode: 'lines+marker',
          line: { shape: 'spline' },
          name: `unit_${
            feature.properties.unit_id ? feature.properties.unit_id : feature.properties.SUB_BLOCK
            }`,
          x: ndvi_date,
          y: these_mean_values
        });

        ndvi_std_data.push({
          type: 'scatter',
          mode: 'lines+marker',
          line: { shape: 'spline' },
          name: `unit_${
            feature.properties.unit_id ? feature.properties.unit_id : feature.properties.SUB_BLOCK
            }`,
          x: ndvi_date,
          y: these_std_values
        });

        ndvi_cov_data.push({
          type: 'scatter',
          mode: 'lines+marker',
          line: { shape: 'spline' },
          name: `unit_${
            feature.properties.unit_id ? feature.properties.unit_id : feature.properties.SUB_BLOCK
            }`,
          x: ndvi_date,
          y: these_cov_values
        });
      };
    });

    traces = { "std": ndvi_std_data, "mean": ndvi_mean_data, "cov": ndvi_cov_data }
    setDTypePlot = (dataType) => {
      Plotly.newPlot(
        'chartContainer',
        traces[dataType],
        {
          title: {
            text: `Farm Performance for ${zone}`,
            font: {
              family: 'Arial, Helvetica, sans-serif',
              size: 24
            }
          },
          xaxis: {
            autorange: true,
            range: [ndvi_date[0], ndvi_date[ndvi_date.length - 1]],
            rangeselector: rangeselector,
            rangeslider: {range: [ndvi_date[0], ndvi_date[ndvi_date.length - 1]]},
            type: 'date'
          },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)'
        },
        { responsive: true }
      );
    }
  };

  setZonePlot(mgt_zones[0]);
  setDTypePlot("mean");
};
