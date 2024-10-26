/*
* Project 1 template
* Editor component JavaScript source code
*
* Author: Denis Gracanin
* Version: 1.0
*/
import './MenuBar.css';
import React, { useState } from "react";
import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from
  "@mui/material";

  
const MenuBar = (props) => {
  const [anchorElFile, setAnchorElFile] = useState(null);
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
            <MenuItem onClick={handleCloseFile}>New</MenuItem>
            <MenuItem onClick={handleCloseFile}>Load</MenuItem>
            <MenuItem onClick={handleCloseFile}>Save</MenuItem>
            <MenuItem onClick={handleCloseFile}>Save As</MenuItem>
          </Menu>
          <Typography variant="h6" component="div" align="center"
            width="100%">
            Project 1
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default MenuBar;