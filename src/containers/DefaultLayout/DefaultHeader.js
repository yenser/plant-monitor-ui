import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import useApi from '../../hooks/useApi';

const DefaultHeader = ({ classes, title, toggleDrawer }) => {
  const { dbSize, getDbSize } = useApi();
  useEffect(() => {
    getDbSize();
  }, [])

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography>{title}</Typography>
        <Typography>{dbSize}</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default DefaultHeader;