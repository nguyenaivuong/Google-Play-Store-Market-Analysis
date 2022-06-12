
function free_paid_bar(data, div_id) {
    var paid = 0,
        free = 0;

    data.forEach(function (d) {
        if (d.Type == "Paid") paid += 1;
        else free += 1;
    });

    var yValue = [free, paid];
    var dataset = [
        {
            x: ["Free App", "Paid App"],
            y: [free, paid],
            type: "bar",
            text: yValue.map(String),
            textposition: "auto",
        },
    ];

    var layout = {
        title: {
            // text: "Comparison between Free apps and Paid apps",
            font: {
                size: 20,
            },
        },
        barmode: "stack",
    };

    return Plotly.newPlot(div_id, dataset, layout);
}

function free_paid_pie(data, div_id) {
    var paid = 0,
        free = 0;

    data.forEach(function (d) {
        if (d.Type == "Paid") paid += 1;
        else free += 1;
    });

    var dataset = [
        {
            labels: ["Free App", "Paid App"],
            values: [free, paid],
            type: "pie",
        },
    ];
    return Plotly.newPlot(div_id, dataset);
}

