

let xhttp = new XMLHttpRequest();

xhttp.addEventListener("load",success);
xhttp.addEventListener("error",error);
xhttp.open("GET", "/dataViewout", true);
xhttp.send();

function success(){
  let districts = {
    "A1" : "Downtown",
    "A15" : "Charlestown",
    "A7" : "East Boston",
    "B2" : "Roxbury",
    "B3" : "Mattapan",
    "C11" : "Dorchester",
    "C6" : "South Boston",
    "D14" : "Brighton",
    "D4" : "South End",
    "E13" : "Jamaica Plain",
    "E18" : "Hyde Park",
    "E5" : "West Roxbury",
  }
  let data = JSON.parse(xhttp.response);

  // Set graph margins and dimensions
  var margin = {top: 40, right: 40, bottom: 90, left: 90},
      width = 850 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // Set ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);
  var svg = d3.select("#graph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");
  
  svg.append("text")
  .attr("transform", "translate(100,0)")
  .attr("x", 50)
  .attr("y", 10)
  .attr("font-size", "24px")
  .text("Total Crimes by Police District ~ 2015-2021")

  // Format data
  data.forEach(function(d) {
    d.count = +d.count;

  });

  x.domain(data.map(function(d) {return d.district; }));
  y.domain([0, d3.max(data, function(d) { return d.count + 400; })]) // y.domain = (0, max(count))

  // Append rectangles for bar chart
  let bars = svg.selectAll(".bar")
      .data(data)
      .enter().append("g");

  bars.append('rect')
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.district); })
      .attr("y", function(d) { return y(d.count); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.count); });

  let xAxis = d3.axisBottom(x);


  // Add x axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("y", 35)
    .attr("x", 400)
    .attr("text-anchor", "end")

    .attr("fill", "black")
    .attr("font-size", "18px")
    .text("District")

  // Add y axis
  svg.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", -150)
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr("font-size", "18px")
    .text("Total Crimes");

  bars.append("text")
      .text(function(d){
        return d.count;
      })
      .attr("x", function(d){
        console.log(districts[d.district])
        return x(d.district) + x.bandwidth()/2;

      })
      .attr("y", function(d){
        return y(d.count) - 5;
      })
      .attr("font-family" , "sans-serif")
      .attr("font-size" , "14px")
      .attr("fill" , "black")
      .attr("text-anchor", "middle");

  var xxAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(function (d){
        return districts[d.district];
        });
}
function error(){
  console.log(xhttp.readyState);
  console.log(xhttp.status);
}