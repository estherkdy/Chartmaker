/*
* Project 1
* App component JavaScript source code
*
* Author: Denis Gracanin
* Version: 1.0
*/

import './App.css';
import React, { useState, useEffect } from 'react';
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
  const [labels, setLabels] = useState(Object.keys(fileData.data[0]));

  const handleSave = () => {
    localStorage.setItem(file, JSON.stringify({title, data}));
  };
  const handleNew = (fileName) => {
    setFile(fileName);
    setData([]);
    setTitle("");
    setLabels(['', '']);

  };
  const handleLoad = (fileName) => {
    const fileData = JSON.parse(localStorage.getItem(fileName)); 
    setFile(fileName);
    setData(fileData.data);
    setTitle(fileData.title);
    setLabels(Object.keys(fileData.data[0] ?? ['','']));
  };
  const handleSaveAs = (fileName) => {
    setFile(fileName);
    localStorage.setItem(fileName, JSON.stringify({ title, data }));
  };
  
  return (
    <Container className="App" >
      <MenuBar
        handleSave={handleSave}
        handleNew={handleNew}
        handleLoad={handleLoad}
        handleSaveAs={handleSaveAs}
      />
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