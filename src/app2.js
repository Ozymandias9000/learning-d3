// let linearScale = d3
//   .scaleLinear()
//   .domain([0, 100])
//   .range([0, 160])
//   .clamp(true);

// console.log(linearScale(1));
// console.log(linearScale(50));
// console.log(linearScale.invert(100));

// let timeScale = d3
//   .scaleTime()
//   .domain([new Date(1000, 0, 1), new Date()])
//   .range([0, 100]);

// console.log(timeScale.invert(50));

// let quantizeScale = d3
//   .scaleQuantize()
//   .domain([0, 100])
//   .range([0, 80, 160]);

// console.log(quantizeScale(50));
// console.log(quantizeScale(99));
// console.log(quantizeScale(20));

// let ordinalScale = d3
//   .scaleOrdinal()
//   .domain(["poor", "good", "great"])
//   .range([0, 80, 160]);

// console.log(ordinalScale("good"));
// console.log(ordinalScale("poor"));
// console.log(ordinalScale("great"));

// getPosts = async () => {
//   let res = await fetch("https://jsonplaceholder.typicode.com/posts/");
//   let data = await res.json();
//   let set = await d3.set(data, d => d.id);

//   let scale = d3
//     .scaleLinear()
//     .domain(extent)
//     .range([0, 600]);

//   console.log(set.values());
// };
// getPosts();

// let link = d3
//   .select(".title")
//   .append("button")
//   .style("color", "black")
//   .html("Inventory <b>SALE</b>");

// console.log(link.nodes());

var scores = [
  { name: "Bob", score: 96 },
  { name: "Joe", score: 66 },
  { name: "Alice", score: 78 },
  { name: "Sally", score: 89 },
  { name: "Jim", score: 45 }
];

var bar = d3
  .select(".chart")
  .append("svg")
  .attr("width", 225)
  .attr("height", 600)
  .selectAll("rect")
  .data(scores)
  .enter()
  .append("g")
  .attr("transform", (d, i) => `translate(0, ${i * 53} )`);

function scaleBar(selection, scale) {
  selection.style("transform", `scaleX(${scale})`);
}

function fade(selection, opacity) {
  selection.style("fill-opacity", opacity);
}

bar
  .append("rect")
  .style("width", d => d.score)
  .attr("class", "bar")
  .on("mouseover", function(d, i, elements) {
    d3.select(this).call(scaleBar, 1.5);
    d3.selectAll(elements)
      .filter(":not(:hover)")
      .call(fade, 0.5);
  })
  .on("mouseout", function(d, i, elements) {
    d3.select(this).call(scaleBar, 1);
    d3.selectAll(elements).call(fade, 1);
  });

bar
  .append("text")
  .attr("y", 30)
  .text(d => d.name);
