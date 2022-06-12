function line_bar(dataset, div_id) {
    var trace1 = {
        x: dataset[0],
        y: dataset[1],
        name: 'Installs',
        type: 'bar'
    };
    var trace2 = {
        x: dataset[0],
        y: dataset[2],
        name: 'Total apps',
        yaxis: 'y2',
        type: 'line'
    };

    var data = [trace1, trace2];

    var layout = {
        yaxis: { title: 'The number of installs',titlefont: {size:30},  automargin: true, tickfont: {size: 20} },
        yaxis2: {
            title: 'The number of apps',
            titlefont: { color: 'rgb(148, 103, 189)',  size:30},
            tickfont: { color: 'rgb(148, 103, 189)', size:20  },
            overlaying: 'y',
            side: 'right',
            automargin: true,
        },

        xaxis:{automargin: true, tickfont: {size: 20}},

        legend: {
            x: 1,
            xanchor: 'left',
            y: 1,
            font: {size: 20}
          }
    };

    Plotly.newPlot(div_id, data, layout);

}
