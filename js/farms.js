
const pivots = [
  'Pivot 1', 'Pivot 2',
  'Pivot 3', 'Pivot 4',
  'Pivot 5', 'Pivot 6',
  'Pivot 7', 'Pivot 8',
  'Pivot 9', 'Pivot 10',
]
let ndvi_mean_date = [];
let ndvi_mean_values = [];

let jsonUrl_ = "https://geogecko.gis-cdn.net/geoserver/Olam_Vector/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Olam_Vector:Isanya&outputFormat=text/javascript&format_options=callback:handleWebsiteJson_";
$.ajax(jsonUrl_,
    { dataType: "jsonp" }
).done(() => { });

function handleWebsiteJson_(data) {
  let ndvi_mean_std = Object.keys(data.features[0].properties).slice(start=4)
  let ndvi_mean_std_values = Object.values(data.features[0].properties).slice(start=4)

  ndvi_mean_std.forEach(e => {
    if (e.slice(start=e.length - 4) === 'mean'){
      let date_ = e.split("_")[1];
      date_ = date_.slice(0, 4) + '-' + date_.slice(4, 6) + '-' + date_.slice(start=6)
      ndvi_mean_date.push(date_);
      ndvi_mean_values.push(data.features[0].properties[e]);
    }
  });
}




window.onload = function() {



  console.log('here we are...')
  var data = [
    {
      x: ndvi_mean_date,
      y: ndvi_mean_values,
      type: 'scatter',
      mode: 'lines+marker',
      line: {shape: 'spline'},
    }
  ];
  
  Plotly.newPlot('chartContainer', data);
}
