/*
* CS 3744 Fall 2022
* Homework 6
* BarChart component JavaScript source code
*
* Author: Denis Gracanin
* Version: 1.0
*/
import './BarChart.css';
import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import * as d3 from 'd3';


// svg element
let svg = null;
// Indicator of the didMount stage
let didMount = true;
// Settings and constants used in the code
let settings = {
  bars: { // Bars
    height: 80,
    heightZero: 0.15,
    ratio: 0.7,
    width: 90,
    x: 10,
    y: 10
  },
  labels: { // Labels: x-axis
    baseline: 7,
    baselineName: 2,
    height: 10,
    width: 90,
    x: 10,
    y: 90,
  },
  lines: { // Lines
    margin: 1.5
  },
  title: { // Title
    baseline: 5,
    height: 10,
    width: 95,
    x: 0,
    y: 0
  },
  tooltip: { // Tooltip
    height: 8,
    padding: 2,
    spacing: "1.2em",
    width: 24
  },
  values: { // Values: y-axis
    baseline: 9.5,
    baselineName: 2,
    height: 90,
    min: null,
    max: null,
    step: null,
    width: 5,
    x: 5,
    y: 10
  },
  viewBox: { // svg container
    height: 100,
    width: 100,
    x: 0,
    y: 0
  }
  
};
const BarChart = (props) => {
  // Create the reference to the Box container
  let myReference = React.createRef();
  let dataset = props.data;


  // Sets the reference and creates the svg element
  const init = () => {
    let container = d3.select(myReference.current);
    svg = container
      .append("svg")
      .attr("viewBox", settings.viewBox.x + " " + settings.viewBox.y + " " +
        settings.viewBox.width + " " + settings.viewBox.height)
      .attr("preserveAspectRatio", "none");
  }
  useEffect(() => {
    // ComponentDidMount check
    if (didMount) {
      didMount = false;
      init();
    }
    // If dataset not provided then return
    if (props.dataset == null) {
      return;
    }
 // Prepare scales
 const xScale = d3.scaleBand()
 .domain(props.dataset.map(d => d.year))
 .range([settings.bars.x, settings.bars.width])
 .padding(0.1);

const yScale = d3.scaleLinear()
 .domain([settings.values.min, settings.values.max])
 .range([settings.bars.height, settings.bars.y]);  // Reverse for y-axis

// Clear any previous SVG elements
svg.selectAll("*").remove();

// Draw Title
svg.append("text")
 .attr("x", settings.title.width / 2)
 .attr("y", settings.title.y + settings.title.baseline)
 .attr("text-anchor", "middle")
 .style("font-family", "Arial")
 .style("font-size", "16px")  // Adjusted font size for the title
 .style("fill", "black")
 .style("font-weight", "normal")  // Adjust font weight to normal
 .text(props.title);

// Draw y-axis (population values)
const yAxis = d3.axisLeft(yScale).ticks((settings.values.max - settings.values.min) / settings.values.step);
svg.append("g")
 .attr("transform", `translate(${settings.values.x}, 0)`)
 .call(yAxis)
 .style("font-size", "10px");  // Reduced font size for y-axis labels

// Draw x-axis (year labels)
const xAxis = d3.axisBottom(xScale);
svg.append("g")
 .attr("transform", `translate(0, ${settings.bars.height})`)
 .call(xAxis)
 .selectAll("text")  // To control x-axis labels
 .style("text-anchor", "middle")
 .style("font-size", "10px")  // Reduced font size to avoid overlap
 .attr("transform", "rotate(-40)")  // Rotate labels to fit better
 .style("font-weight", "normal");  // Adjust font weight

// Draw bars
svg.selectAll(".bar")
 .data(props.dataset)
 .enter()
 .append("rect")
 .attr("class", "bar")
 .attr("x", d => xScale(d.year))
 .attr("y", d => yScale(d.population))
 .attr("width", xScale.bandwidth())
 .attr("height", d => settings.bars.height - yScale(d.population))
 .attr("fill", "dodgerblue");

// Add x-axis label (Years)
svg.append("text")
 .attr("text-anchor", "middle")
 .attr("x", settings.bars.width / 2)
 .attr("y", settings.bars.height + 40)  // Adjust this based on axis position
 .style("font-family", "Arial")
 .style("font-size", "-5px")  // Font size for axis label
 .text("Years");

// Add y-axis label (Population)
svg.append("text")
 .attr("text-anchor", "middle")
 .attr("x", -settings.bars.height / 2)
 .attr("y", settings.values.x - 40)  // Adjust this based on axis position
 .attr("transform", "rotate(-90)")
 .style("font-family", "Arial")
 .style("font-size", "-5px")  // Font size for axis label
 .text("Population (Billions)");





    // Get the values of the second attribute in data points
    let values = [];
    for (const item of props.dataset) {
      values.push(Object.values(item)[1]);
    }
    // Calculate min and max values of the second attribute
    let min = Math.floor(Math.min(...values));
    let max = Math.ceil(Math.max(...values));
    // Determine the step size based on the range of values of the second attribute
    let step = 0.5 * Math.pow(10, (max - min).toString().length - 1);
    if ((max - min) / step < 10) {
      step *= 0.4;
    }
    // Use props values for settings' min, max, and step values if props values are numbers greater than (or equal) zero
    settings.values.min = isNaN(props.min) || props.min < 0 ? min : props.min;
    settings.values.max = isNaN(props.max) || props.max <= 0 ? max : props.max;
    settings.values.step = isNaN(props.step) || props.step <= 0 ? step :
      props.step;
    // If settings max is smaller or equal to settings min, revert to calculated values
    if (settings.values.max <= settings.values.min) {
      settings.values.min = min;
      settings.values.max = max;
    }
    // Draw the bar chart
  }, [props.dataset, props.title, props.labels, settings]);
  // Returns the Box container
  return (
    <Box ref={myReference} 
    sx={props.sx}
    >
      <div>
      {props.title}

      </div>
     <div>
     {props.labels[0]}
     
     </div>
     <div>
     {props.labels[1]}
     </div>
     
     <div>
     {JSON.stringify(props.dataset)}
     </div>
      
    </Box>
  );
}
export default BarChart;