import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../containers/Image'

const useStyles = makeStyles({
  container: {
    // padding: 20
  }
})

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.container} container>
      <Grid item>
        <Typography variant="h1">Dashboard</Typography>
      </Grid>
      {/* <Image id={12} /> */}
    </Grid>
  )
}

export default Dashboard;