import React, { useContext, useEffect, useState } from 'react';
import {
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SocketContext from '../../SocketContext';
import TempCard from './TempCard';
import Card from './Card';
import useTemp from '../../hooks/useTemps';

const useStyles = makeStyles({
  container: {
    margin: 20
  }
})

const toFarenheit = (celc) => {
  return (celc * (9/5) + 32).toFixed(2);
}

const Temperature = () => {
  const socket = useContext(SocketContext)
  const [temps, setTemps] = useState("--");
  const { count, dailyTemps, getTempCount, getDailyTemps } = useTemp();
  const classes = useStyles();

  useEffect(() => {
    socket.on("temps", data => {

      const formattedData = {}
      for(const [key, value] of Object.entries(data)) {
        formattedData[key] = toFarenheit(value);
      }
      setTemps(formattedData)
    })

    getTempCount();
    getDailyTemps();
  }, [socket])
  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item>
        <TempCard temp={temps.correctedTemp} title="Temperature" />
      </Grid>
      <Grid item>
        <TempCard temp={temps.temp} title="Sensor Temp" />
      </Grid>
      <Grid item>
        <TempCard temp={temps.cpuTemp} title="CPU Temp" />
      </Grid>
      <Grid item>
        <Card title="Total Data" value={count} />
      </Grid>
    </Grid>
  )
}

export default Temperature;