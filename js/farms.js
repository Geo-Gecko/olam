
  window.onload = function() {

    var chart = new CanvasJS.Chart("chartContainer", {
      backgroundColor: "#fff",
      fontFamily: "Rubix",
      animationEnabled: true,
      theme: "light2",
      title: {},
      axisX: {
        valueFormatString: "DD MMM",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "NDVI",
        crosshair: {
          enabled: true
        }
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        verticalAlign: "bottom",
        horizontalAlign: "left",
        dockInsidePlotArea: true,
        itemclick: toogleDataSeries
      },
      data: [{
          type: "spline",
          lineThickness: 1,
          showInLegend: true,
          name: "Isanya",
          markerType: "circle",
          xValueFormatString: "DD MMM, YYYY",
          color: "red",
          dataPoints: [{
              x: new Date(2019, 7, 4),
              y: 0.6
            },
            {
              x: new Date(2019, 7, 9),
              y: 0.7
            },
            {
              x: new Date(2019, 7, 14),
              y: 0.1
            },
            {
              x: new Date(2019, 7, 19),
              y: 0.8
            },
            {
              x: new Date(2019, 7, 24),
              y: -1
            },
            {
              x: new Date(2019, 7, 29),
              y: 0.9
            },
            {
              x: new Date(2019, 8, 3),
              y: 0.4
            },
            {
              x: new Date(2019, 8, 13),
              y: 0.53
            },
            {
              x: new Date(2019, 8, 18),
              y: 0.69
            }
          ]
        },
        {
          type: "spline",
          lineThickness: 1,
          showInLegend: true,
          name: "Kateshi",
          markerType: "circle",
          xValueFormatString: "DD MMM, YYYY",
          color: "#808080",
          dataPoints: [{
              x: new Date(2019, 7, 4),
              y: 0.50
            },
            {
              x: new Date(2019, 7, 9),
              y: 0.7
            },
            {
              x: new Date(2019, 7, 14),
              y: 0.71
            },
            {
              x: new Date(2019, 7, 19),
              y: 0.9
            },
            {
              x: new Date(2019, 7, 24),
              y: 0.34
            },
            {
              x: new Date(2019, 7, 29),
              y: 1
            },
            {
              x: new Date(2019, 8, 3),
              y: 0.8
            },
            {
              x: new Date(2019, 8, 13),
              y: 0.57
            },
            {
              x: new Date(2019, 8, 18),
              y: 0.79
            }
          ]
        },
        {
          type: "spline",
          lineThickness: 1,
          showInLegend: true,
          name: "Lukulu",
          markerType: "circle",
          xValueFormatString: "DD MMM, YYYY",
          color: "#808080",
          dataPoints: [{
              x: new Date(2019, 7, 4),
              y: 0.4
            },
            {
              x: new Date(2019, 7, 9),
              y: 0.2
            },
            {
              x: new Date(2019, 7, 14),
              y: 0.4
            },
            {
              x: new Date(2019, 7, 19),
              y: 0.8
            },
            {
              x: new Date(2019, 7, 24),
              y: 0.2
            },
            {
              x: new Date(2019, 7, 29),
              y: 0.5
            },
            {
              x: new Date(2019, 8, 3),
              y: 0.7
            },
            {
              x: new Date(2019, 8, 13),
              y: 0.1
            },
            {
              x: new Date(2019, 8, 18),
              y: 0.3
            }
          ]
        },
        {
          type: "spline",
          lineThickness: 1,
          showInLegend: true,
          name: "Luombe",
          markerType: "circle",
          xValueFormatString: "DD MMM, YYYY",
          color: "#808080",
          dataPoints: [{
              x: new Date(2019, 7, 4),
              y: 0.9
            },
            {
              x: new Date(2019, 7, 9),
              y: 0.4
            },
            {
              x: new Date(2019, 7, 14),
              y: 0.71
            },
            {
              x: new Date(2019, 7, 19),
              y: 0.2
            },
            {
              x: new Date(2019, 7, 24),
              y: 0.4
            },
            {
              x: new Date(2019, 7, 29),
              y: 0.9
            },
            {
              x: new Date(2019, 8, 3),
              y: 0.8
            },
            {
              x: new Date(2019, 8, 13),
              y: 0.5
            },
            {
              x: new Date(2019, 8, 18),
              y: 0.2
            }
          ]
        },
        {
          type: "spline",
          lineThickness: 1,
          showInLegend: true,
          name: "Ngoli",
          markerType: "circle",
          xValueFormatString: "DD MMM, YYYY",
          color: "#808080",
          dataPoints: [{
              x: new Date(2019, 7, 4),
              y: 0.7
            },
            {
              x: new Date(2019, 7, 9),
              y: 0.4
            },
            {
              x: new Date(2019, 7, 14),
              y: 1.0
            },
            {
              x: new Date(2019, 7, 19),
              y: -1.3
            },
            {
              x: new Date(2019, 7, 24),
              y: 0.9
            },
            {
              x: new Date(2019, 7, 29),
              y: 0.06
            },
            {
              x: new Date(2019, 8, 3),
              y: 0.4
            },
            {
              x: new Date(2019, 8, 13),
              y: 0.6
            },
            {
              x: new Date(2019, 8, 18),
              y: 0.4
            }
          ]
        },
        {
          type: "spline",
          lineThickness: 1,
          showInLegend: true,
          name: "Nsuzu",
          markerType: "circle",
          xValueFormatString: "DD MMM, YYYY",
          color: "#808080",
          dataPoints: [{
              x: new Date(2019, 7, 4),
              y: 0.5
            },
            {
              x: new Date(2019, 7, 9),
              y: 0.10
            },
            {
              x: new Date(2019, 7, 14),
              y: 0.2
            },
            {
              x: new Date(2019, 7, 19),
              y: 0.9
            },
            {
              x: new Date(2019, 7, 24),
              y: 0.01
            },
            {
              x: new Date(2019, 7, 29),
              y: 0.9
            },
            {
              x: new Date(2019, 8, 3),
              y: 0.6
            },
            {
              x: new Date(2019, 8, 13),
              y: 0.3
            },
            {
              x: new Date(2019, 8, 18),
              y: 0.06
            }
          ]
        }
      ]
    });
    chart.render();

    function toogleDataSeries(e) {
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }

  }
