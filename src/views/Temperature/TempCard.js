import React from 'react';
import {
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    minWidth: 150,
    minHeight: 150,
    textAlign: 'center'
  },
  temp: {
    fontSize: '9vh'
  }
});

const TempCard = ({ temp, title = "default title" }) => {
  const classes = useStyles();
  if(!temp) {
    temp = "--"
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4">{title}</Typography>
        <Typography className={classes.temp} variant="h1">{temp}&deg;</Typography>
      </CardContent>
    </Card>
  )
}

export default TempCard;