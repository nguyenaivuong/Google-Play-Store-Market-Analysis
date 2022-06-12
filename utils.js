var category_map_total, total_category = 0;

function clearDiv(divName) {
    var div = document.getElementById(divName);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function visualize_category_bar() {
    clearDiv('category');
    category_bar(dataApp, "category");
}

function visualize_category_pie() {
    clearDiv('catetory_pie');
    // free_paid_pie(dataApp, "category");
    for (const [key, value] of category_map_total.entries()) {
        console.log(key, value);
        create_category_pie("#catetory_pie", key, value, total_category);
    }

}
function custom_category_pie(category_name) {
    // clearDiv('catetory_pie');
    create_category_pie("catetory_pie", category_name, category_map_total.get(category_name),
        total_category);

}
function top10_category(data, category_name) {
    /*
        This function will filter the map with category name.
        It also sort the map with rating.
    */
    var new_data = data.filter(dt => dt.Category == category_name);
    for (let i = 0; i < new_data.length; i += 1) {
        if (new_data[i].Rating == "NaN") {
            new_data[i].Rating = 0;
        }
    }

    // new_data.sort((a, b) =>
    //     (parseFloat(a.Rating.replace(/./g, '')) < parseFloat(b.Rating.replace(/./g, '')) ? 1 : -1));
    new_data.sort((a, b) =>
        (parseFloat(a.Rating) < parseFloat(b.Rating) ? 1 : -1));

    // console.log("Debaaug", new_data);
    var top10_app = new Map();
    var count = 0;
    console.log(new_data.length);
    for (let i = 0; i < new_data.length; i += 1) {
        console.log(new_data[i].Reviews);
        if (new_data[i].Reviews < 100000) continue;
        count += 1;
        console.log()
        if (count == 10) break;
        top10_app.set(new_data[i].App, new_data[0].Rating);
    }

    return top10_app;
}

function get_category_sum_install(data) {
    var category_map = new Map();
    for (let i = 0; i < data.length; i++) {
        var _category_name = data[i].Category;
        if (category_map.has(_category_name) == false) {
            category_map.set(_category_name, [0, 0]);
        }
        var _install = category_map.get(_category_name)[0];
        var _total_app = category_map.get(_category_name)[1];
        _install +=  parseFloat(data[i].Installs.replace(/,/g, ''));

        _total_app += 1;
        category_map.set(_category_name, [_install, _total_app]);
    }
    var _cate = [], install_arr = [], total_arr = [];
    for (const [key, value] of category_map.entries()) {
        // arr_data.push([key, value[0], value[1]])
        _cate.push(key);
        install_arr.push(value[0]);
        total_arr.push(value[1]);
    }
    return [_cate, install_arr, total_arr];
}
function calulate_category_sum(data) {
    console.log(data[0]);
    install = parseFloat(data[0].Installs.replace(/,/g, ''))
    console.log(install)
    console.log(data[0].Category)
    var category_map = new Map()
    for (let i = 0; i < data.length; i++) {
        let category_name = data[i].Category;
        if (category_map.has(category_name) == false) {
            category_map.set(category_name, 0);
        }
        let count = category_map.get(category_name);
        count += parseFloat(data[i].Installs.replace(/,/g, ''));
        total_category += parseFloat(data[i].Installs.replace(/,/g, ''));
        category_map.set(category_name, count);
    }
    console.log(category_map)
    category_map_total = category_map;
}
