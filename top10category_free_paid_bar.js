function top10category_free_paid_bar(data, div_id) {
    console.log(data);
    var data_filter_type;
    data_filter_type = filter_type(data);
    var free_rating = calulate_avg_rating(data_filter_type['Free']);
    var paid_rating = calulate_avg_rating(data_filter_type['Paid']);
    var name_paid = [], name_free = [],
        rating_paid = [], rating_free = [];
    var idx = 0;
    console.log(paid_rating);
    for (const [key] of free_rating.entries()) {
        name_paid.push(key);
        name_free.push(key);
        console.log(paid_rating[key]);
        rating_paid.push(paid_rating.get(key));
        rating_free.push(free_rating.get(key));
        if (++idx > 10) break;
    }
    console.log(free_rating);
    visualize_bar_chart(name_free, rating_free, name_paid, rating_paid, div_id);
}
function filter_type(data) {
    var paid_category = new Set();
    var categories = new Set();
    data.forEach(element => {
        if (element['Type'] == 'Paid' && element['Reviews'] > 10000) {
            paid_category.add(element['Category']);
        }
    });
    data.forEach(element => {
        if (element['Type'] == 'Paid' && element['Reviews'] > 10000) {
            if (paid_category.has(element['Category'])) {
                categories.add(element['Category']);
            };
        }
    });
    var type = new Map();
    var Paid = [], Free = [];
    data.forEach(element => {
        if (categories.has(element['Category']) == true && element['Reviews'] > 10000) {
            if (element['Type'] == 'Paid') {
                Paid.push(element);
            } else {
                Free.push(element);
            }
        }
    });
    type['Paid'] = Paid;
    type['Free'] = Free;
    // console.log(type['Paid']);
    return type;
}
function calulate_avg_rating(data) {
    /*
        This function will calculate average rating of each category

        Input:
            data: array

        Ouput: Map, key: name of category,
                         value: avg ratings
               this map is sorted in decs value
    */
    var category_list = new Map();
    var ratings =  new Map();
    data.forEach(element => {
        var category = element['Category'];
        if (category_list.has(category) == false) {
            category_list.set(category);
            category_list[category] = [];
        }
        var rating = parseFloat(isNaN(element['Rating']) ? 0 : element['Rating']);
        category_list[category].push(rating);
    });
    console.log("debug");
    // console.log(category_list);
    // category_list.forEach(element => {
    //     console.log(category_list[element]);
    // });
    for (const [key] of category_list.entries()) {
        ratings.set(key, (d3.sum(category_list[key]) /
            category_list[key].length));
        // console.log(d3.sum(category_list[key]));
    }
    const mapSort1 = new Map([...ratings.entries()].sort((a, b) => b[1] - a[1]));
    console.log(mapSort1);
    return ratings;
}

function get_category(paid, free) {
    /*
        This function will get all categories that occurs
            in paid and fee

        Input: paid: array(2xN)
               fee: array(2xN)
    */
    var category_paid = new Set();
    paid.forEach(element => {
        category_paid.add(element[0]);
    });
    var categories = []
    free.forEach(element => {
        if (category_paid.has(element[0]))
            categories.push(element[0])
    });
    return categories;
}
function visualize_bar_chart(name_free, rating_free, name_paid, rating_paid, div_id) {
    console.log(rating_free);
    var trace1 = {
        x: name_free,
        y: rating_free,
        name: 'Free',
        marker: { color: 'rgb(55, 83, 109)' },
        type: 'bar'
    };

    var trace2 = {
        x: name_paid,
        y: rating_paid,
        name: 'Paid',
        marker: { color: 'rgb(26, 118, 255)' },
        type: 'bar'
    };

    var data = [trace1, trace2];

    var layout = {
        title: 'Top 10 Category rating of Free Apps vs Paid Apps',
        xaxis: {
            tickfont: {
                size: 15,
                color: 'rgb(107, 10, 117)',
            },
            automargin: true,
        },
        yaxis: {
            title: 'Rating',
            titlefont: {
                size: 30,
                color: 'rgb(107, 107, 107)'
            },
            automargin: true,
        },
        legend: {
            x: 0,
            y: 1.20,
            bgcolor: 'rgba(255, 255, 255, 0)',
            bordercolor: 'rgba(255, 255, 255, 0)'
        },
        barmode: 'group',
        bargap: 0.15,
        bargroupgap: 0.1
    };

    Plotly.newPlot(div_id, data, layout);

}
