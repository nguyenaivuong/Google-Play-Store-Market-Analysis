function category_bar(data, div_id) {
    var category_install = {};
    var category_free ={}, category_paid={};

    data.forEach(function (d) {
        category_install[d.Category] =
            (category_install[d.Category] || 0) +
            parseFloat(
                d["Installs"].slice(0, -1).replaceAll(",", "")
            );
        if (d.Type == "Paid") {
            category_paid[d.Category] =
            (category_paid[d.Category] || 0) +
            parseFloat(
                d["Installs"].slice(0, -1).replaceAll(",", "")
            );
        } else {
            category_free[d.Category] =
            (category_free[d.Category] || 0) +
            parseFloat(
                d["Installs"].slice(0, -1).replaceAll(",", "")
            );
        }
    });

    // Show number of free and paid apps downloaded
    arr = Object.entries(category_install).sort((a, b) => a[1] - b[1]);
    var text = [];

    for (let i = 0; i < arr.length; ++i) {
        key = arr[i][0];
        if (!(key in category_paid)) category_paid[key] = 0;
        text.push(`<br><b>Free Apps Downloaded</b>: ${category_free[key]}<br><b>Paid Apps Downloaded</b>: ${category_paid[key]}`)
    }

    var dataset =
        {
            y: arr.map(d => d[0]),
            x: arr.map(d => d[1]),
            type: "bar",
            orientation: "h",
            text: text,
            name: "Number of downloads",
            marker: {
                color: 'rgba(55,128,191,0.6)',
                width: 1
              },
            hovertemplate: '<i><b>Total Downloads</b></i>: %{x}' + '%{text}',
        };


    var dataset = [dataset];

    var layout = {
        boxmode: "overlay",
        hovermode:'closest',
        yaxis: { automargin: true},
        barmode: 'stack',
    };

    Plotly.newPlot(div_id, dataset, layout);

    var myPlot = document.getElementById(div_id);
    myPlot.on('plotly_click', function (dataset) {
        var pts = '';
        pts = dataset.points[0].label;
        custom_category_pie(pts);
    });
}
