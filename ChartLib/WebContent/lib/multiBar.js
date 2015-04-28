d3.csv("lib/data.csv", function(err, data) {

	//get each key of the data that is not date
	//these will be our key in the key/value pair
	//the values x and y will be month and the value
	var dataToPlot = Object.keys(data[0]).filter(function(k) {
		return k != "port"
	}).map(function(k) {
		return {
			"key" : k,
			"values" : data.map(function(d) {
				return {
					//let's make this a real date
					"x" : d.port,
					"y" : +d[k]
				}
			})
		}
	})

	nv.addGraph(function() {
		var chart = nv.models.multiBarChart().transitionDuration(350)
				.reduceXTicks(true) //If 'false', every single x-axis tick label will be rendered.
				.rotateLabels(0) //Angle to rotate x-axis labels.
				.showControls(true) //Allow user to switch between 'Grouped' and 'Stacked' mode.
				.groupSpacing(0.1) //Distance between each group of bars.
				/*.tooltip(function(key, y, e, graph) {
					var myvalues = [ 10, 8, 5, 7, 4, 4, 1, 4, 4, 7, 5, 9, 10 ];
					$("#dummy").sparkline(myvalues)[0].html;
					return $("#dummy").html()
				})*/;

		chart.xAxis.tickFormat(d3.format(',f'));

		chart.yAxis.tickFormat(d3.format(',f'));

		d3.select('#chart1 svg').datum(dataToPlot).call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	});

})

function tooltipContent(key, y, e, graph) {
	return '<h3>' + key + '</h3>' + '<p>' + y + '</p>';
}


/*nv.addGraph(function() {
 var chart = nv.models.multiBarChart()
 .transitionDuration(350)
 .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
 .rotateLabels(0)      //Angle to rotate x-axis labels.
 .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
 .groupSpacing(0.1)	//Distance between each group of bars.
 .width(800).height(400);
 ;

 chart.xAxis
 .tickFormat(d3.format(',f'));

 chart.yAxis
 .tickFormat(d3.format(',.1f'));

 d3.select('#chart1 svg')
 .datum(exampleData())
 .call(chart);

 nv.utils.windowResize(chart.update);

 return chart;
 });

 //Generate some nice data.
 function exampleData() {
 return stream_layers(3,10+Math.random()*100,.1).map(function(data, i) {
 return {
 key: 'Stream #' + i,
 values: data
 };
 });
 }
 */