/*
* Project 1
* App component JavaScript source code
*
* Author: Denis Gracanin
* Version: 1.0
*/

import './App.css';
import React, { useState } from 'react';
import Item from './Item.js';
import MenuBar from './MenuBar';
import BarChart from './BarChart';
import { Box, Container } from "@mui/system";
import Editor from './Editor';
import './load.js';


const App = (props) => {
  
  const [file, setFile] = useState('pr1.json');
  const [data, setData] = useState(JSON.parse(localStorage.getItem('pr1.json')).data);
  const [title, setTitle] = useState(JSON.parse(localStorage.getItem('pr1.json')).title);
  const [labels, setLabels] = useState(Object.keys(data[0]));

  const handleChange = (event) => {
    let newData = structuredClone(data);
    let pointIndex = event.target.attributes.pointId.value;
    if (pointIndex == "caption") {
      newData.title = event.target.value;
    }
    else {
      let keys = Object.keys(newData.data[0]);
      let attributeIndex = event.target.attributes.id.value;
      if (pointIndex == "header") {
        let newKey = event.target.value;
        newData.data.forEach((item, index) => {
          let tmp = {};
          console.log(keys);
          keys.forEach((attribute, index1) => {
            console.log(attribute + " " + attributeIndex);
            if (index1 == attributeIndex) {
              tmp[newKey] = item[attribute];
            }
            else {
              tmp[attribute] = item[attribute];
            }
          });
          newData.data[index] = structuredClone(tmp);
        });
      }
      else {
        newData.data[pointIndex][keys[attributeIndex]] =
          parseInt(event.target.value);
      }
    }
    setData(newData);
  };
  return (
    <Container className="App" >
      <MenuBar></MenuBar>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }} >
        <Item> 
         <Editor
         title={title}
         setTitle={setTitle}
         labels={labels}
         setLabels={setLabels}
         data={data}
         setData={setData}
         >

         </Editor>
        </Item> 

        <Item>
          <BarChart
            title={title}
            labels={labels}
            data={data}
            min={0}
            dataset={data}
            sx={{ bgcolor: 'white', width: '100%', height: '100%' }}
          >
          </BarChart>
        </Item>
       
      </Box>
    </Container>
  );
}
export default App;