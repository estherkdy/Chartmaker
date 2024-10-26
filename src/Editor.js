/*
* Project 1 template
* Editor component JavaScript source code
*
* Author: Denis Gracanin
* Version: 1.0
*/
import './Editor.css';
import React, { useEffect, useState } from 'react';
import { Button, Box, Select, MenuItem, TextField } from '@mui/material/';


// define inputs for one line, define the data that gets rendered ina loop

const editor_style = {
  item_style: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textfield_style: {
    my: '8px',
    mx: '2%',
    maxWidth: '250px',
    width: '40%',
  },
  button_style: {
    fontSize: 15,
    minWidth: 'unset',
    width: '50px',
  },
}

const Editor = (props) => {
  const { title, setTitle, setLabels, labels, data, setData } = props;
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  let keys = [];
  if (data.length > 0) {
    keys = Object.keys(data[0]);
  }
  //   updatedData: [
  //       { year: '1950', population: 2.525 },
  //       { year: '1960', population: 3.018 },
  //       { year: '1970', population: 3.682 },
  //       { year: '1980', population: 14.440 },
  //       { year: '1990', population: 5.310 },
  //       { year: '2000', population: 6.127 },
  //       { year: '2010', population: 6.930 },
  //       { year: '2020', population: 6.930 },
  //       { year: '2030', population: 20 }
  //   ]
  // };

  // onChange={e => dataChangeHandler(i, keys[0], e.target.value)}
  const dataChangeHandler = (index, key, newData) => {
    const updatedData = data.slice();
    updatedData[index][key] = newData;
    setData(updatedData);
  };

  const addHandler = () => {
    const newData = { [keys[0]]: x, [keys[1]]: y }; // x added to year and y added to population for ex
    setData([...data, newData]); // adds newdata to the existing data

    // resets the x and y fields
    setX("");
    setY("");
  };


  const deleteHandler = index => {
  const updatedData = [...data];
  updatedData.splice(index, 1); // removing the object at that index from the array
  setData(updatedData);
  };

  return (
    <div>

      {/* the first row containing x and y input fields and add button */}
      <div>
        <TextField
          value={x}
          onChange={e => setX(e.target.value)}
          label={"x-value"}
          size={'small'}
          sx={{ ...editor_style.textfield_style }}
        />
        <TextField
          value={y}
          onChange={e => setY(e.target.value)}
          label={"y-value"}
          size={'small'}
          sx={{ ...editor_style.textfield_style }}
        />
        <Button
          disabled={x === '' || y === ''}
          onClick={() => addHandler(x, y)}
          sx={
            {
              ...editor_style.button_style, border: 2,
              borderColor: 'rgb(25, 117, 210)',
              color: 'rgb(25, 117, 210)',
            }
          }
        >{'ADD'}</Button>

      </div>

      {/* the second row containing field for the title */}
      <div>
        <TextField
          value={title}
          onChange={e => setTitle(e.target.value)}
          label={"Title"}
          size={'small'}
          sx={{ ...editor_style.textfield_style }}
        />

      </div>

      <div>
        <TextField
          value={labels[0]}
          onChange={e => setLabels([e.target.value, labels[1]])}
          label={"x-label"}
          size={'small'}
          sx={{ ...editor_style.textfield_style }}
        />
        <TextField
          value={labels[1]}
          onChange={e => setLabels([labels[0], e.target.value])}
          label={"y-label"}
          size={'small'}
          sx={{ ...editor_style.textfield_style }}
        />
      </div>
      <div>
        Data:
      </div>

      {/*  going through the data array */}
      <div className='data-group'>
        {data.map((datum, i) =>
          <div key={'datum ' + i}>
            <TextField
              value={datum[keys[0]]}
              onChange={e => dataChangeHandler(i, keys[0], e.target.value)}
              size={'small'}
              sx={{ ...editor_style.textfield_style }}
            />
            <TextField
              value={datum[keys[1]]}
              onChange={e => dataChangeHandler(i, keys[1], e.target.value)}
              size={'small'}
              sx={{ ...editor_style.textfield_style }}
            />
            <Button
              onClick={() => deleteHandler(i)}
              sx={
                {
                  ...editor_style.button_style, border: 2,
                  borderColor: 'rgb(25, 117, 210)',
                  color: 'rgb(25, 117, 210)',
                }
              }
            >{'DEL'}</Button>

          </div>
        )}

      </div>
    </div>

  );
};
export default Editor;