
new Chart(document.getElementById("farmPerformance"), {
"type": "farmPerformance",
"data": {
    "labels": ["Pivot 1", "Pivot 2", "Pivot 3", "Pivot 4", "Pivot 5", "Pivot 6", "Pivot 7", "Pivot 8"],
    "datasets": [{
    "label": "Start Date",
    "data": [0.2, 0.53, 0.6, 1.2, 0.6, 0.3, 0.4, 0.1],
    "fill": false,
    "backgroundColor": ["rgba(255, 0, 0, 0.2)", "rgba(255, 0, 0, 0.2)",
        "rgba(255, 0, 0, 0.2)", "rgba(255, 0, 0, 0.2)", "rgba(255, 0, 0, 0.2)",
        "rgba(255, 0, 0, 0.2)", "rgba(255, 0, 0, 0.2)", "rgba(255, 0, 0, 0.2)"
    ],
    "borderColor": ["rgb(255, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 0, 0)",
        "rgb(255, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 0, 0)"
    ],
    "borderWidth": 1
    },
    {
    "label": "End Date",
    "data": [0.5, 0.3, 0.5, 0.1, 0.8, 0.9, 0.6, 0.7],
    "fill": false,
    "backgroundColor": ["rgba(54, 162, 235, 0.2)", "rgba(54, 162, 235, 0.2)",
        "rgba(54, 162, 235, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(54, 162, 235, 0.2)",
        "rgba(54, 162, 235, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(54, 162, 235, 0.2)"
    ],
    "borderColor": ["rgb(54, 162, 235)", "rgb(54, 162, 235)", "rgb(54, 162, 235)",
        "rgb(54, 162, 235)", "rgb(54, 162, 235)", "rgb(54, 162, 235)", "rgb(54, 162, 235)", "rgb(54, 162, 235)"
    ],
    "borderWidth": 1
    }
    ],
},
"options": {
    "scales": {
    "xAxes": [{
        "ticks": {
        "beginAtZero": true
        }
    }]
    }
}
});
