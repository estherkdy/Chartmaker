/*
* Project 1 template
* Editor component JavaScript source code
*
* Author: Denis Gracanin
* Version: 1.0
*/
import './MenuBar.css';
import React, { useState } from "react";
import {
  AppBar,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  List
} from '@mui/material';

const MenuBar = (props) => {
  const [anchorElFile, setAnchorElFile] = useState(null);
  //when new filename is necessary
  const [newOpen, setNewOpen] = useState(false);
  //to distinuish if it's "save as" or "new"
  const [save, setSave] = useState(false);
  //when load button is clicked 
  const [loadOpen, setLoadOpen] = useState(false);

  const openFile = Boolean(anchorElFile);
  const handleClickFile = (event) => {
    setAnchorElFile(event.currentTarget);
  };
  const handleCloseFile = () => {
    setAnchorElFile(null);
  };
  return (
    <Box sx={{ flexGrow: 1, m: 0.5 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            id="file-button"
            aria-controls={openFile ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openFile ? 'true' : undefined}
            onClick={handleClickFile}
            sx={{ bgcolor: 'white', color: 'blue', m: 0.5 }}
          >
            File
          </Button>
          <Menu
            id="file-menu"
            MenuListProps={{
              'aria-labelledby': 'file-button',
            }}
            anchorEl={anchorElFile}
            open={openFile}
            onClose={handleCloseFile}
          >
            {/* when menu items are clicked,their functions are called*/}
            <MenuItem id={'new'} onClick={handleNewOpen}>New</MenuItem>
            <MenuItem onClick={handleLoadOpen}>Load</MenuItem>
            <MenuItem onClick={handleSave}>Save</MenuItem>
            <MenuItem id={'saveAs'} onClick={handleNewOpen}>Save As</MenuItem>
          </Menu>
          <Typography variant="h6" component="div" align="center"
            width="100%">
            Project 1
          </Typography>
          <NewFile
            open={newOpen}
            handleCloseFile={save ? handleSaveAsClose : handleNewClose}
          />
          <LoadFile
            open={loadOpen}
            handleCloseFile={handleLoadClose}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );

  function handleSave() {
    props.handleSave();
    handleCloseFile();
  }

  /*
   * when a new file is needed
   * it opens the NewFile component 
   */
  function handleNewOpen(e) {
      //this will help set the onClick handle component
      if (e.target.id === 'new')
          setSave(false)
      else
          setSave(true)

      setNewOpen(true);
  }

  /*
  * when a new file is needed for empty data
  * it closes the NewFile component 
  */
  function handleNewClose(file, cancel) {
      setNewOpen(false);
      if (cancel) {
          props.handleNew(file);
      }
      handleCloseFile();
  }

  /*
   * opens the LoadFile component
   */
  function handleLoadOpen() {
      setLoadOpen(true);
  }

  /*
   * when the file is needed to be loaded get the file name and loads new data
   */
  function handleLoadClose(file) {
      setLoadOpen(false);
      if (file !== '') {
          props.handleLoad(file);
      }
      handleCloseFile();
  }

  /*
   * when a new file needs to be saved for existing data
   * it closes the NewFile component 
   */
  function handleSaveAsClose(file, cancel) {
      setNewOpen(false);
      if (cancel) {
          props.handleSaveAs(file);
      }
      handleCloseFile();
  }
};


//gets the file name for new file
function NewFile(props) {
  let [file, setFile] = useState('');

  //close component if pressing cancel
  function handleCancel() {
      props.handleClose(file, false);
  };

  //isn't able to create new data if no file name is included
  function handleCreate() {
      if (file !== '')
          props.handleCloseFile(file, true);
      setFile('');
  }

  //sets the file name
  function fileName(e) {
      setFile(e.target.value)
  }

  // const handle
  return (
      <Dialog
          open={props.open}
          onClose={handleCancel}
          maxWidth="sm"
      >
          <DialogTitle>New</DialogTitle>
          <DialogContent>
              <TextField
                  value={file}
                  onChange={fileName}
                  margin="dense"
                  label="File Name"
                  helperText="Enter file name (*.json)"
                  variant="standard"
              />
          </DialogContent>
          <DialogActions>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleCreate}>Create</Button>
          </DialogActions>
      </Dialog>
  );
}

function LoadFile(props) {
  //if no file is selected 
  const handleCloseFile = () => {
      props.handleCloseFile('');
  }

  // if the file is selected
  const handleListItemClick = (e) => {
      props.handleCloseFile(e);
  }

  return (
      <Dialog
          open={props.open}
          onClose={handleCloseFile}
          fullWidth
          maxWidth="xs"
      >
          <DialogTitle>Load</DialogTitle>
          <List sx={{ pt: 0 }}>
              {
                  Object.keys(localStorage).map((key, i) => (
                      <ListItem disableGutters key={i}>
                          <ListItemButton
                              onClick={() => handleListItemClick(key)}
                          >
                              <ListItemText primary={key} />
                          </ListItemButton>
                      </ListItem>
                  ))
              }
          </List>
      </Dialog>
  );
}
export default MenuBar;