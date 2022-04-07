

let xhttp = new XMLHttpRequest();

xhttp.addEventListener("load",success);
xhttp.addEventListener("error",error);
xhttp.open("GET", "/dataViewout", true);
xhttp.send();

function success(){
  let data = JSON.parse(xhttp.response);
  var mapped = data.map(d => {
    return {
      district: Object.keys(d)[0],
      count: d[Object.keys(d)[0]]
    }
  });

  console.log(data);

  // Set graph margins and dimensions
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // Set ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

  // Format data
  data.forEach(function(d) {
    d.count = +d.count;

  });

  x.domain(data.map(function(d) {return d.district; }));
  y.domain([0, d3.max(data, function(d) { return d.count + 400; })]) // y.domain = (0, max(count))
  
  // Append rectangles for bar chart
  svg.selectAll(".bar")
      .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.district); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.count); })
    .attr("height", function(d) { return height - y(d.count); });
 
  // Add x axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add y axis
  svg.append("g")
    .call(d3.axisLeft(y));
}
function error(){
  console.log(xhttp.readyState);
  console.log(xhttp.status);
}