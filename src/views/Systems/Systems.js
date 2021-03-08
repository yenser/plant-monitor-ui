import React, { useEffect, useContext, useState } from 'react';
import { socket } from '../../SocketContext';
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { red, green, yellow } from '@material-ui/core/colors';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const getTempColor = (temp) => {
  if (temp) {
    if (temp >= 80) {
      return red[300];
    } else if (temp >= 70) {
      return yellow[600];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

const mapSystemsRows = (rows) => {
  return rows.map((row) => (
    <TableRow key={row.name}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right" style={{ color: getTempColor(row.temperature) }}>
        {Number.parseFloat(row.temperature).toFixed(2)} &deg;C
      </TableCell>
      <TableCell align="right">
        {
          row.status
            ? <CheckCircleIcon style={{ color: green[300] }} />
            : <ErrorIcon style={{ color: red[300] }} />
        }
      </TableCell>
    </TableRow>
  ));
}

const Systems = () => {

  const [systems, setSystems] = useState([]);

  useEffect(() => {
    socket.on('systems', (res) => {
      setSystems(res);
    });

    socket.emit('getSystems');

    return () => socket.off('systems');
  }, []);


  console.log('systems', systems);
  return (
    <Grid item xs={12} md={6}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Temperature</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mapSystemsRows(systems)}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default Systems;