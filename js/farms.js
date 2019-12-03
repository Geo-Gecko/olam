

let set_mgt_zones = new Set()
let mgt_zones = []

let ndvi_mean_date = [];
let ndvi_mean_data = [];

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

  data.features.forEach(feature => {

    // get mgt zones as unique strings for the buttons
    set_mgt_zones.add(feature.properties.Name)
    mgt_zones = Array.from(set_mgt_zones)


    if (feature.properties.Name == 'Pivot 1') {
      let ndvi_mean_std_ = Object.keys(feature.properties).slice(start=4)
    
      let these_values = []
      ndvi_mean_std_.forEach(e => {
        if (e.slice(start=e.length - 4) === 'mean'){
          let date_ = e.split("_")[1];
          these_values.push(feature.properties[e]);
        };
      });
      ndvi_mean_data.push({
        type: 'scatter',
        mode: 'lines+marker',
        line: {shape: 'spline'},
        name: `unit_id_${feature.properties.unit_id}`,
        x: ndvi_mean_date,
        y: these_values
      });
    };  
  });

}




window.onload = function() {

  
  Plotly.newPlot('chartContainer', ndvi_mean_data);

}
