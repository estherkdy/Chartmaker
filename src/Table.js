/*
* CS 3744 Fall 2022
* Project 1
* Table component JavaScript code
*
* Author: Denis Gracanin
* Version: 1.0
*/
import React, { useEffect } from 'react';
import './Table.css';
import * as d3 from "d3";
import { Box } from "@mui/system";


// table element
let table = null;
// Indicator of the didMount stage
let didMount = true;
const Table = (props) => {
    // Create the reference to the Box container
    let myReference = React.createRef();
    // Sets the reference and creates the svg element
    const init = () => {
        let container = d3.select(myReference.current);
        table = container
            .append("table")
    }
    useEffect(() => {
        // ComponentDidMount check
        if (didMount) {
            didMount = false;
            init();
            window.addEventListener('resize', () => {
                paint();
            })
        }
        if (props.dataset == null) {
            return;
        }
        paint();
    });
    const paint = () => {
        if (props.dataset.data.length === 0) {
            return;
        }
        const keys = props.dataset.data.length > 0 ?
            Object.keys(props.dataset.data[0]) : null;
        table
            .selectAll("*")
            .remove();
        // Creates and initializes the table body.
    }
    return (
        <Box ref={myReference} sx={props.sx}>
        </Box>
    );
}
export default Table;