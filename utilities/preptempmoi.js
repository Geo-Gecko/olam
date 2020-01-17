
let chart_ = (data_, dates_, title_, chart_id) => Plotly.newPlot(
    chart_id,
    data_,
    {
        title: {
            text: title_,
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 24
            }
        },
        yaxis: { title: chart_id === "prepTempContainer" ? 'Precipitation' : 'soil moisture' },
        yaxis2: chart_id === "prepTempContainer" ? {
            title: 'Temperature',
            titlefont: { color: 'rgb(148, 103, 189)' },
            tickfont: { color: 'rgb(148, 103, 189)' },
            overlaying: 'y',
            side: 'right',
            showgrid: false
        } : {},
        xaxis: {
            autorange: true,
            range: [dates_[0], dates_[dates_.length - 1]],
            rangeselector: rangeselector,
            rangeslider: { range: [dates_[0], dates_[dates_.length - 1]] },
            type: 'date'
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
    },
    { responsive: true }
);


let files_ = place => [
    axios.get(`csvs/${place}_DayTemperature.csv`),
    axios.get(`csvs/${place}_Precipitation.csv`),
    axios.get(`csvs/${place}_SoilMoisture.csv`)
]


preptempmoisture = place_ =>
    axios.all(files_(place_))
        .then(responseArr => {
            let prepTempData = [];
            let soilMoistureData = [];
            let dates_ = {}
            responseArr.forEach((response, index) => {
                let data_ = $.csv.toObjects(response.data)

                dates_[Object.keys(data_[0])[1]] = []
                data_ = data_.filter(temp => {
                    if (temp["LST_Day_1km"] && temp["LST_Day_1km"] != "") {
                        return true
                    } else if (temp["precipitation"] && temp["precipitation"] != "0") {
                        return true
                    } else if (temp["ssm"]) {
                        return true
                    }
                })


                data_.forEach(temp => {
                    let date_ = temp["time_start"].split(",").join("").split(" ")

                    let mth_ = months_[date_[0]]
                    let day = date_[1]
                    date_[1] = mth_
                    date_[0] = date_[2]
                    date_[2] = day

                    dates_[Object.keys(data_[0])[1]].push(date_.join("-"))
                })

                let temp_values = []
                let moist_values = []
                data_.forEach(temp => {
                    if (temp["LST_Day_1km"]) {
                        temp_values.push(parseInt(temp["LST_Day_1km"].replace(",", "")))
                    } else if (temp["precipitation"]) {
                        temp_values.push(parseInt(temp["precipitation"].replace(",", "")))
                    } else if (temp["ssm"]) {
                        moist_values.push(parseFloat(temp["ssm"]))
                    }
                })

                if (temp_values.length > 0) {
                    prepTempData.push({
                        type: Object.keys(data_[0])[1] === 'precipitation' ? 'bar' : 'scatter',
                        mode: 'lines',
                        line: { shape: 'spline' },
                        name: Object.keys(data_[0])[1] === 'precipitation' ? 'precipitation' : 'rainfall',
                        yaxis: `y${index + 1}`,
                        x: dates_[Object.keys(data_[0])[1]],
                        y: temp_values
                    });
                }
                if (moist_values.length > 0) {
                    soilMoistureData.push({
                        type: 'scatter',
                        mode: 'lines',
                        line: { shape: 'spline' },
                        name: 'soil moisture',
                        yaxis: `y${index + 1}`,
                        x: dates_[Object.keys(data_[0])[1]],
                        y: moist_values
                    });
                }


            })
            if (soilMoistureData.length > 0) {
                chart_(soilMoistureData, dates_, `Soil Moisture for ${place_}`, 'moistureContainer')
            }
            if (prepTempData.length > 0) {
                chart_(prepTempData, dates_, `Temperature and Precipation for ${place_}`, 'prepTempContainer')
            }
        })
