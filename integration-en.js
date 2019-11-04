 // Load the Visualization API and the corechart package.
google.charts.load('current', {
  'packages': ['corechart'],
  'language': 'en'
});


// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.

function drawChart(periodFilter) {
  //parse the CSV
  d3.csv('data.csv')
    .then(makeChart);
  // parse the csv and build the SVG
  function makeChart(prices) {

    //grab the length of the file step1
    var length = prices.map(function(d) {
      return d.length;
    });
    //grab the Date
    var labels = prices.map(function(d) {
      return d.Date
    });
    //grab the Price
    var values = prices.map(function(d) {
      return d.Price
    });

    // Create the data table.
    var data = new google.visualization.DataTable();
    // Columns
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Stock price');
    //add rows dynamically
    if (periodFilter == 0) {
      for (var i = periodFilter; i < length.length; i++) {
        data.addRow([new Date(labels[i]), parseFloat(values[i])]);
      };
    } else {
      for (var i = length.length - periodFilter; i < length.length; i++) {
        data.addRow([new Date(labels[i]), parseFloat(values[i])]);
      };
    };

    // Set chart options
    var options = {
      title: 'Stock price evolution',
      //'width': 1000,
      //'height': 600,
      series: {
        0: {
          color: '#020f5e'
        }
      },
      /*  animation:{
        startup: true,
        duration: 1000,
        easing: 'Out'
      },*/
      //curveType: 'function',
      legend: 'none',
      crosshair: { trigger: 'both' },
      hAxis: {
      title: 'Period'
    },
    vAxis: {
    title: 'Price ($)',
  },
      explorer: {
        axis: 'horizontal',
        //  actions: ['dragToZoom', 'rightClickToReset'],
        keepInBounds: true,
        //maxZoomIn: .005,
        maxZoomOut: 1,
        zoomDelta: 1.1,

      }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    //draw the chart
    chart.draw(data, options);
  };

};

//Buttons callbacks
function initialZoom() {
  var periodFilter = 0;
  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart(periodFilter));
  $('button').removeClass("gButtonClicked");
  $('#All').addClass("gButtonClicked");
};

$(function() {

  $("#All").click(function() {
    $('button').removeClass("gButtonClicked");
    $('#All').addClass("gButtonClicked");
    var periodFilter = 0;
    google.charts.setOnLoadCallback(drawChart(periodFilter));
  });
});

$(function() {

  $("#fiveYears").click(function() {
    $('button').removeClass("gButtonClicked");
    $('#fiveYears').addClass("gButtonClicked");
    var periodFilter = 252 * 5;
    google.charts.setOnLoadCallback(drawChart(periodFilter));
  });
});

$(function() {

  $("#threeYears").click(function() {
    $('button').removeClass("gButtonClicked");
    $('#threeYears').addClass("gButtonClicked");
    var periodFilter = 252 * 3;
    google.charts.setOnLoadCallback(drawChart(periodFilter));
  });
});

$(function() {

  $("#oneYear").click(function() {
    $('button').removeClass("gButtonClicked");
    $('#oneYear').addClass("gButtonClicked");
    var periodFilter = 252;
    google.charts.setOnLoadCallback(drawChart(periodFilter));
  });
});

$(function() {

  $("#sixMonths").click(function() {
    $('button').removeClass("gButtonClicked");
    $('#sixMonths').addClass("gButtonClicked");
    var periodFilter = 252 / 2;
    google.charts.setOnLoadCallback(drawChart(periodFilter));
  });
});

$(function() {

  $("#threeMonths").click(function() {
    $('button').removeClass("gButtonClicked");
    $('#threeMonths').addClass("gButtonClicked");
    var periodFilter = 252 / 4;
    google.charts.setOnLoadCallback(drawChart(periodFilter));
  });
});

$(function() {

  $("#oneMonth").click(function() {
    $('button').removeClass("gButtonClicked");
    $('#oneMonth').addClass("gButtonClicked");
    //$('#oneMonth').removeClass("gButton");

    var periodFilter = 252 / 12;
    google.charts.setOnLoadCallback(drawChart(periodFilter));
  });
});
