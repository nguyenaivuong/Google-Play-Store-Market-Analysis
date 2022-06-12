var tabulate = function (data, columns, div_id) {
    var table = d3.select(div_id).append("table");
    var thead = table.append("thead");
    var tbody = table.append("tbody");


    // append the header row
    thead
        .append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .style("font-size", "2.1em")
        .text(function (column) {
            return column;
        });


    // create a row for each object in the data
    var rows = tbody
        .selectAll("tr")
        .data(data)
        .enter()
        .append("tr");


    // create a cell in each row for each column
    var cells = rows
        .selectAll("td")
        .data(function (row) {
            return columns.map(function (column) {
                return { column: column, value: row[column] };
            });
        })
        .enter()
        .append("td")
        .style("font-size", "1.9em")
        .text(function (d) {
            return d.value;
        });

    return table;
};

function top10app_table(data, div_id) {
    svg = data.sort(function (a, b) {
        return (
            parseFloat(
                b["Installs"].slice(0, -1).replaceAll(",", "")
            ) -
            parseFloat(
                a["Installs"].slice(0, -1).replaceAll(",", "")
            )
        );
    });

    var top10 = data.slice(0, 10); // Top 10 app installed
    var app_install = {};
    top10.forEach(function (d) {
        app_install[d.App] = parseFloat(
            d["Installs"].slice(0, -1).replaceAll(",", "")
        );
    });

    // console.log(app_install);
    var cateOftop10 = top10.map(function (d) {
        return { App: d.App, Category: d.Category };
    });

    var columns = ["App", "Category"];
    tabulate(cateOftop10, columns, div_id);
}
