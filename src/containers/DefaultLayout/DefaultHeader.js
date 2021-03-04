import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloudIcon from '@material-ui/icons/Cloud';
import useApi from '../../hooks/useApi';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(3)
  },
  title: {
    flexGrow: 1
  }
}));

const DefaultHeader = ({ title }) => {
  const { dbSize, getDbSize } = useApi();
  const classes = useStyles();
  useEffect(() => {
    getDbSize();
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CloudIcon className={classes.icon} />
          <Typography className={classes.title}>{title}</Typography>
          <Typography>{dbSize}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default DefaultHeader;