function create_category_pie(div_id, category_name, category_count, total) {

    var yValue = [category_count, total - category_count];
    var dataset = [
        {
            labels: [category_name, "Total"],
            values: yValue,
            type: "pie",
            hoverinfo: 'label+percent+name',
        },
    ];
    var layout = {
        height: 400,
        width: 500,
     };
    return Plotly.newPlot(div_id, dataset, layout);
}
