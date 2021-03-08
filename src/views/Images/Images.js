import React, { useEffect, useState } from 'react';
import config from '../../config';
import {
  Button,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../containers/Image';
import useImages from '../../hooks/useImages';

const useStyles = makeStyles({
  image: {
    padding: 10
  },
  paper: {
    padding: 10
  },
  camera: {
    paddingTop: 5,
    paddingBottom: 5
  }
})

const mapRows = (rows, setSelectedImaged) => {
  return rows.map((row) => (
    <TableRow hover={true} key={row.id} onClick={() => setSelectedImaged(row.id)}>
      <TableCell component="th" scope="row">{row.id}</TableCell>
      <TableCell align="right">{row.name}</TableCell>
    </TableRow>
  ));
}

const Images = () => {

  const [selectedImage, setSelectedImaged] = useState(null)
  const { images, getImages, captureImage } = useImages();
  useEffect(() => {
    getImages();
  }, []);
  const classes = useStyles();


  return (
    <>
      <Grid item xs={12} lg={8}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mapRows(images, setSelectedImaged)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item lg={4}>
        <Paper className={classes.paper}>
          <Typography variant="h3">Cameras</Typography>

          {config.cameraServers.map(srv => {
            return (
              <div key={srv.ip} className={classes.camera}>
                <Typography variant="h6">{srv.name}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => captureImage(srv)}
                >Take Photo</Button>
              </div>
            )
          })}
        </Paper>
      </Grid>

      {selectedImage ? <Grid item lg={12}>
        <Paper className={classes.image}>
          <Image id={selectedImage} />
        </Paper>
      </Grid>
        : null}

    </>
  );
}

export default Images;