

layers = {
  "Zambia": ["Isanya", "Lukulu", "Luombe", "Ngoli", "Kateshi", "Nsunzu"],
  "Laos": ["Phetlamka", "TH", "TM", "Xekatam", "Kongtoun"],
  "Tanzania": ["DivisionA", "DivisionB", "DivisionC"]
}

// TODO - is the memory leak from not 'let'-ting these functions...I dunno...you tell me...
compareFarms = (region) => {
  let requests_ = []
  layers[region].forEach(value => {
    requests_.push(axios.get(`https://geogecko.gis-cdn.net/geoserver/Olam_Vector/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Olam_Vector:${value}&outputFormat=application/json`))
  })

  let farm_dates = []
  axios.all(requests_)
    .then(responseArr => {
      let ndvi_mean_data = [];
      responseArr.forEach(response => {
        farm_dates.length = 0
        let total_values = {}

        let first_feature = response.data.features[0]
        let ndvi_mean_std_ = Object.keys(first_feature.properties).filter(str_ => {
          let split_along_dash = str_.split("_")
          if (
            split_along_dash[0] === first_feature.id.split(".")[0] &&
            split_along_dash[split_along_dash.length - 1] != "std"
          ) {
            let date_ = split_along_dash[1]
            date_ = date_.slice(0, 4) + '-' + date_.slice(4, 6) + '-' + date_.slice(start = 6)
            farm_dates.push(date_)
            return str_
          }
        });

        // initialize each mean_key to 0 to avoid NaN
        ndvi_mean_std_.forEach(value => {
          total_values[value] = 0
        });

        // sum the features for the different zones
        response.data.features.forEach(ft => {
          ndvi_mean_std_.forEach(value => {
            total_values[value] += ft.properties[value]
          })
        });

        // get the mean for the farm as a whole
        ndvi_mean_std_.forEach(value => {
          total_values[value] = total_values[value] / response.data.features.length
        });

        ndvi_mean_data.push({
          type: 'scatter',
          mode: 'lines+marker',
          line: { shape: 'spline' },
          name: response.data.features[0].id.split(".")[0],
          x: farm_dates,
          y: Object.values(total_values)
        });
      });

      Plotly.newPlot(
        'farmComparisonContainer',
        ndvi_mean_data,
        {
          title: {
            text: `<b>Farm Comparison for ${region}</b>`,
            font: {
              family: 'Arial, Helvetica, sans-serif',
              size: 28
            }
            
          },
          xaxis: {
            autorange: true,
            range: [farm_dates[0], farm_dates[farm_dates.length - 1]],
            rangeselector: rangeselector,
            rangeslider: { range: [farm_dates[0], farm_dates[farm_dates.length - 1]] },
            type: 'date'
          },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)'
        },
        { responsive: true }
      );
    })
}


let player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytube');
}

// stop youtube video on closing modal
$('#helpModal').on('hidden.bs.modal', function (e) {
  if (player.getPlayerState() === 1) {
    player.pauseVideo();
  }
})
