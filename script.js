// CHART INIT ------------------------------
let type = d3.select("#group-by").node().value;
let howToOrder = d3.select("#sort-by").node().value;
const margin = ({top: 20, right: 20, bottom: 20, left: 20})
    const width = 600 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    let svg = d3.select('#chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 

let xScale = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.1);
    
let yScale = d3.scaleLinear().range([height, 0]);
    
let xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(5);
    
let yAxis = d3.axisLeft().scale(yScale);
    
let xAxisGroup = svg.append("g").attr("class", "x-axis axis");
    
let yAxisGroup = svg.append("g").attr("class", "y-axis axis");

svg.select("text.y-axis-title").remove();

svg.append("text")
  .attr('x', 5)
  .attr('y', -8)
  .attr("class", "y-axis-title")

// CHART INIT ------------------------------



// CHART UPDATE FUNCTION -------------------
function update(data, type){
console.log(howToOrder);
console.log(type);
    xScale.domain(data.map(d=>d.company));
    yScale.domain([0, d3.max(data, function(d) { return d[type]; })]);
    if (howToOrder == "ascending"){
      data = data.sort(function (a, b) { return b[type] - a[type]; })
      console.log("hi")
    }
    else if (howToOrder == "descending"){
      data = data.sort(function (a, b) { return a[type] - b[type]; })
    }
  console.log(data);
  bars = svg
    .selectAll(".bar")
    .remove()
    .exit()
    .data(data);
  bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .transition()
    .duration(1000) 
    .attr("x", function(d) {
        return xScale(d.company);
      })
    .attr("y", function(d) {
        return yScale(d[type]);
      })
    .attr("height", function(d) {
        return height - yScale(d[type]);
      })
    .attr("width", xScale.bandwidth());

    xAxisGroup = svg
        .select(".x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    
    yAxisGroup = svg.select(".y-axis").call(yAxis);
    
    svg.select("text.y-axis-title").remove();

    svg.append("text")
        .attr("class", "y-axis-title")
        .attr("x", 35)
        .attr("y", -5)
        .attr("dy", ".1em")
        .style("text-anchor", "end")
        .text(type)
        .transition()
        .duration(1000);

}; 

// CHART UPDATES ---------------------------

// Loading data
d3.csv('coffee-house-chains.csv', d3.autoType).then(data=>{
var type = "stores";
data = data.sort(function (a, b) { return a[type] - b[type]; })
update(data, type);
    d3.select("#group-by").on("change", function(d) {
      var type = d3.select(this).property("value")
      update(data, type);
    })
    d3.select("#sort-by").on("change", function(d) {
      howToOrder = d3.select(this).property("value")
      update(data, type);
    })
  });
