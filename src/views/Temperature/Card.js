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
  }
});

const TempCard = ({ title, value }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h1">{value}</Typography>
      </CardContent>
    </Card>
  )
}

export default TempCard;