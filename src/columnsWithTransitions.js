var scores = [
  { name: "Bob", math: 96, science: 34, language: 88 },
  { name: "Joe", math: 66, science: 45, language: 78 },
  { name: "Alice", math: 78, science: 39, language: 67 },
  { name: "Sally", math: 189, science: 45, language: 24 },
  { name: "Billy Bob", math: 50, science: null, language: 100 },
  { name: "Jim", math: 45, science: 55, language: null }
];

var margin = { top: 20, right: 40, bottom: 60, left: 40 };
var width = 500 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var fullWidth = width + margin.left + margin.right;
var fullHeight = height + margin.top + margin.bottom;

var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", fullWidth)
  .attr("height", fullHeight)
  .call(responsivefy)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var yScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([height, 0]);

var yAxis = svg.append("g").call(d3.axisLeft(yScale));

var xScale = d3
  .scaleBand()
  .padding(0.2)
  .domain(scores.map(d => d.name))
  .range([0, width]);

var xAxis = d3
  .axisBottom(xScale)
  .ticks(d3.timeMinute.every(30))
  .tickSize(10)
  .tickPadding(10);

svg
  .append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("transform", "rotate(-25)");

function render(subject = "math") {
  var t = d3.transition().duration(1000);

  var update = svg
    .selectAll("rect")
    .data(scores.filter(d => d[subject]), d => d.name);

  update
    .exit()
    .transition(t)
    .attr("y", height)
    .attr("height", 0)
    .remove();

  yScale.domain([0, d3.max(scores, d => d[subject])]);
  yAxis
    .transition(t)
    .delay(1000)
    .call(d3.axisLeft(yScale));

  update
    .transition(t)
    .delay(1000)
    .attr("y", d => yScale(d[subject]))
    .attr("height", d => height - yScale(d[subject]));

  update
    .enter()
    .append("rect")
    .attr("y", height)
    .attr("height", 0)
    .attr("x", d => xScale(d.name))
    .attr("width", d => xScale.bandwidth())
    .transition(t)
    .delay(update.exit().size() ? 2000 : 0)
    .attr("y", d => yScale(d[subject]))
    .attr("height", d => height - yScale(d[subject]))
    .style("fill", "steelblue");
}

render();

function responsivefy(svg) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style("width")),
    height = parseInt(svg.style("height")),
    aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("perserveAspectRatio", "xMinYMid")
    .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
    var targetWidth = parseInt(container.style("width"));
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
  }
}
