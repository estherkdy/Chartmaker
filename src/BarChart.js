/*
 * Project 1
 * BarChart component JavaScript source code
 * 
 * Version: 1.0
 */

import './BarChart.css';
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Box } from "@mui/system";

const BarChart = (props) => {
    let myReference = React.createRef();
    const [tooltip, setTooltip] = useState({ display: false, data: {}, color: '', position: { left: 0, top: 0 } });
    let dataset = props.data;

    // let keys = Object.keys(dataset[0]);
    let settings = {
        viewBox: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        },
        title: {
            x: 0,
            y: 0,
            width: 100,
            height: 10,
            baseline: 5
        },
        xLabels: {
            x: 5,
            y: 90,
            width: 95,
            height: 5,
            baseline: 2,
        },
        yLabels: {
            x: 3,
            y: 10,
            width: 5,
            height: 90,
            baseline: 9.5
        },
        lines: {
            margin: 1.5
        },
        bars: {
            x: 5,
            y: 10,
            width: 95,
            height: 85,
            ratio: 0.7
        },
        data: {
            min: 0,
            // step: 0.5
        }
    };
    let svg = null;
    const init = () => {
        let container = d3.select(myReference.current);
        container
            .selectAll("*")
            .remove();
        svg = container
            .append("svg")
            .attr("viewBox", settings.viewBox.x + " " + settings.viewBox.y + " " + settings.viewBox.width + " " + settings.viewBox.height)
            .attr("preserveAspectRatio", "none");
            
    }

    const paint = () => {
        svg
            .selectAll("*")
            .remove();

        //title
        svg
            .append("g")
            .attr("id", "title")
            .append("text")
            .attr("x", (settings.title.x + settings.title.width) / 2)
            .attr("y", settings.title.y + settings.title.height - settings.title.baseline)
            .text(props.title);

        //x label text
        svg
            .append("g")
            .attr("id", "xLabel")
            .append("text")
            .attr("x", (settings.title.x + settings.title.width) / 2 + settings.yLabels.width / 2)
            .attr("y", settings.xLabels.y + settings.xLabels.height - settings.xLabels.baseline + 5)
            .text(props.labels[0]);

        //y label text
        svg
            .append("g")
            .attr("id", "yLabel")
            .append("text")
            .attr("x", settings.yLabels.x / 2)
            .attr("y", settings.viewBox.height / 2)
            .text(props.labels[1])
            .attr("transform", `rotate(-90, ${settings.yLabels.x / 2}, ${settings.viewBox.height / 2})`);




        //bar chart if there is at least one dataset
        if (dataset.length > 0)
            paintData();
    }
    const paintData = () => {
        //set steps (defaults to 0.5 in do-while loop)
        let step = 0.5;


        //get the max data to set the range / number of lines / step
        let yArray = dataset.map(item => isNaN(parseFloat(item[props.labels[1]])) ? 0 : parseFloat(item[props.labels[1]]))
        let max = Math.max(...yArray);

        let lineCount;
        let dataRange;


        do {
            // increment 0.5 until the number of lines is less than 20
            max = step - (max % step) + max;
            dataRange = max - settings.data.min;
            lineCount = dataRange / step;

        } while (lineCount > 20 && (step *= 2));

        svg
            .append("g")
            .attr("id", "lines")
            .selectAll("line")
            .data(d3.range(lineCount))
            .enter()
            .append("line")
            .attr("x1", settings.yLabels.x + settings.yLabels.width)
            .attr("x2", settings.yLabels.x + settings.yLabels.width + settings.bars.width - settings.lines.margin)
            .attr("y1", (item, index) => {
                return settings.xLabels.y - index * settings.bars.height / lineCount;
            })
            .attr("y2", (item, index) => {
                return settings.xLabels.y - index * settings.bars.height / lineCount;
            });

        //if y value is not a number, set data to 0
        svg
            .append("g")
            .attr("id", "bars")
            .selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("fill", "dodgerblue")
            .on("click", function () {
                // d3.select(this).classed('clicked', !d3.select(this).classed('clicked'));
                const currentColor = d3.select(this).attr("fill");
                const newColor = currentColor === "dodgerblue" ? "red" : "dodgerblue"; // Toggle color
                d3.select(this).attr("fill", newColor); // Change the bar color
            })
            .attr("x", (item, index) => {
                return settings.bars.x + (1 - settings.bars.ratio + index) * settings.bars.width / (dataset.length + 1 - settings.bars.ratio);
            })
            .attr("y", (item, index) => {
                return settings.xLabels.y - ((isNaN(Object.values(item)[1]) ? 0 : Object.values(item)[1]) - settings.data.min) * settings.bars.height / dataRange;
            })
            .attr("width", settings.bars.ratio * settings.bars.width / (dataset.length + 1 - settings.bars.ratio))
            .attr("height", (item, index) => {
                return ((isNaN(Object.values(item)[1]) ? 0 : Object.values(item)[1]) - settings.data.min) * settings.bars.height / dataRange;
            })
            .on("mousemove", function(event, d) {
                const [x, y] = d3.pointer(event);
                const rect = myReference.current ? myReference.current.getBoundingClientRect() : null;
                // const rect = d3.select(myReference.current).node().getBoundingClientRect();
                const tooltipX = (rect ? rect.left : 700) + x + 10; // Adjust left position
                const tooltipY = (rect ? rect.top : 500) + y - 30; // Adjust top position
                const tooltipText = (
                    <div className='tooltip-text'>
                        <div>Label: {d[props.labels[0]]}</div>
                        <div>Value: {d[props.labels[1]]}</div>
                    </div>
                );
                const color = d3.select(this).attr("fill"); // Get the color of the current bar
                setTooltip({
                    display: true,
                    data: { value: tooltipText,
                     },
                    position: { left: tooltipX, top: tooltipY },
                    color: color
                });
            })
            .on("mouseout", () => {
                setTooltip({ display: false, data: {}, color: '', position: {} });
            });


        let xLabels = svg
            .append('g')
            .attr('id', 'xLabels');
        xLabels
            .selectAll('text')
            .data(dataset)
            .enter()
            .append('text')
            .attr('x', (item, index) => {
                return settings.xLabels.x + (1 - settings.bars.ratio + index + settings.bars.ratio / 2) * settings.bars.width / (dataset.length + 1 - settings.bars.ratio);
            })
            .attr('y', settings.xLabels.y + settings.xLabels.height - settings.xLabels.baseline)
            .text((item, index) => {
                return Object.values(item)[0];
            });
        xLabels
            .selectAll('line')
            .data(dataset)
            .enter()
            .append('line')
            .attr("y1", settings.xLabels.y)
            .attr("y2", settings.xLabels.y + settings.xLabels.length)
            .attr("x1", (item, index) => {
                return settings.xLabels.x + (1 - settings.bars.ratio + index + settings.bars.ratio / 2) * settings.bars.width / (dataset.length + 1 - settings.bars.ratio);
            })
            .attr("x2", (item, index) => {
                return settings.xLabels.x + (1 - settings.bars.ratio + index + settings.bars.ratio / 2) * settings.bars.width / (dataset.length + 1 - settings.bars.ratio);
            });

        svg
            .append("g")
            .attr("id", "yLabels")
            .selectAll("text")
            .data(d3.range(lineCount))
            .enter()
            .append("text")
            .attr("x", settings.yLabels.x + settings.yLabels.width / 2)
            .attr("y", (item, index) => {
                return settings.yLabels.y + settings.yLabels.height - settings.yLabels.baseline - index * settings.bars.height / lineCount;
            })
            .text((item, index) => {
                return (settings.data.min + item * step).toFixed(1);
            });
    }

    useEffect(() => {
        init();
        paint();
    }, [props.data, props.title, props.labels[0], props.labels[1]]);

    return (
        <Box ref={myReference} width="100%" height="100%">
            {tooltip.display && tooltip.position && (
                <div
                    style={{
                        position: 'absolute',
                        left: tooltip.position.left,
                        top: tooltip.position.top,
                        backgroundColor: tooltip.color, // Use the bar's color
                        border: '1px solid #ccc',
                        padding: '5px',
                        color: '#fff', // Text color
                        pointerEvents: 'none',
                        zIndex: 10,
                    }}
                >
                    {tooltip.data.value} 
                </div>
            )}
        </Box>
    );

}

export default BarChart;
