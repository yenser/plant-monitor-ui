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
import { red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../containers/Image';
import useImages from '../../hooks/useImages';
import useDevices from '../../hooks/useDevices';
import useToggle from '../../hooks/useToggle';
import ImageModal from './ImageModal';

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

const mapRows = (rows, selectImage, deleteImage) => {

  const handleDeleteColumn = (e, id) => {
    e.stopPropagation();
    deleteImage(id);
  }

  return rows.map((row) => (
    <TableRow hover={true} key={row.id} onClick={() => selectImage(row.id)}>
      <TableCell component="th" scope="row">{row.id}</TableCell>
      <TableCell align="right">{row.name}</TableCell>
      <TableCell align="right"><CloseIcon style={{color: red[400], cursor: 'pointer'}} onClick={(e) => handleDeleteColumn(e, row.id)} /></TableCell>
    </TableRow>
  ));
}

const Images = () => {

  const [selectedImage, setSelectedImaged] = useState(null)
  const { images, getImages, deleteImage, captureImage } = useImages();
  const { devices, getDevices } = useDevices();
  const [modalOpen, toggleModal] = useToggle();
  useEffect(() => {
    getDevices();
    getImages();
  }, []);
  const classes = useStyles();

  const selectImage = (imageId) => {
    setSelectedImaged(imageId);
    toggleModal();
  }


  return (
    <>
      <Grid item xs={12} lg={8}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right" styles={{ width: 20 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mapRows(images, selectImage, deleteImage)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item lg={4}>
        <Paper className={classes.paper}>
          <Typography variant="h3">Cameras</Typography>

          {devices.map(srv => {
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
      <ImageModal imageId={selectedImage} open={modalOpen} toggle={toggleModal} />
    </>
  );
}

export default Images;