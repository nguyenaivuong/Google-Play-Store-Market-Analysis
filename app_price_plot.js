function app_price_plot(data, div_id) {

  var price = {};
  var price_cate = {};
  data.forEach(function (d) {
    value = parseFloat(d["Price"].replaceAll("$", ""))
    if (value in price) {
      price[value] += 1;
      if (d.Category in price_cate[value]) price_cate[value][d.Category] += 1;
      else price_cate[value][d.Category] = 1;
    }
    else {
      price[value] = 1;
      price_cate[value] = {};
      if (d.Category in price_cate[value]) price_cate[value][d.Category] += 1;
      else price_cate[value][d.Category] = 1;
    }
  });


  arr = Object.entries(price).sort((a, b) => a[1] - b[1]);
  x = arr.map(d => d[0]); // price
  max_x = Math.max(...x), min_x = Math.min(...x);

  y = arr.map(d => d[1]); // number of apps
  max_y = Math.max(...y), min_y = Math.min(...y);


  var trace1 = {
    x: x,
    y: y,
    mode: 'markers',
    type: 'scatter',
    marker: { size: 10 }
  };


  var data = [ trace1 ];

  var layout = {
    xaxis: {
      range: [min_x, max_x]
    },
    yaxis: {
      range: [min_y, max_y]
    },
  };

  Plotly.newPlot(div_id, data, layout,{scrollZoom: true});
}
