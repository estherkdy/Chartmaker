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
  
  const [file, setFile] = useState('');
  const [dataFile, setDataFile] = useState({});
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [labels, setLabels] = useState(["", ""]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
      // This block runs on mount
      if (!hasMounted) {
          console.log('Component did mount');
          const initialDataFile = JSON.parse(localStorage.getItem('pr1.json'));
          setFile('pr1.json');
          setDataFile(initialDataFile);
          setData(initialDataFile.data);
          setTitle(initialDataFile.title);
          setLabels(Object.keys(initialDataFile.data[0]));
          setHasMounted(true); // Set the mounted flag
      } else {
          // This block runs on updates
          setData(dataFile.data);
          setTitle(dataFile.title);
          setLabels(dataFile.data.length > 0 ? Object.keys(dataFile.data[0]) : ["", ""]);
          console.log('Component did update:', file, data, title, labels);
      }

      // Optional cleanup function (if needed)
      return () => {
          // Cleanup logic can go here if necessary
          console.log('Cleaning up');
      };
  }, [dataFile]); // Runs on mount and when count changes

  const handleSave = () => {
    localStorage.setItem(file, JSON.stringify({title, data}));
  };
  const handleNew = (fileName) => {
    setFile(fileName);
    setDataFile({
      title: "",
      data: []
    });
  };
  const handleLoad = (fileName) => {
    const fileData = JSON.parse(localStorage.getItem(fileName)); 
    setFile(fileName);
    setDataFile(fileData);
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
      <div className='filename'>
        {file}
      </div>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }} >
        <Item> 
         <Editor
         title={title}
         setTitle={setTitle}
         data={data}
         setData={setData}
         labels={labels}
         setLabels={setLabels}
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