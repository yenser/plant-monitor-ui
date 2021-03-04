import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../containers/Image'

const useStyles = makeStyles({
  container: {
    margin: 20
  }
})

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.container} container spacing={3}>
      <Typography variant="h1">Dashboard</Typography>
      <Image id={12} />
    </Grid>
  )
}

export default Dashboard;