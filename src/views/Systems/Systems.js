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


const mapSystemsRows = (rows) => {
  return rows.map((row) => (
    <TableRow key={row.system}>
      <TableCell component="th" scope="row">
        {row.system}
      </TableCell>
      <TableCell align="right">{row.temp}</TableCell>
      <TableCell align="right">Yes</TableCell>
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