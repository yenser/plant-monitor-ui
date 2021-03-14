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
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../containers/Image';
import useImages from '../../hooks/useImages';
import useDevices from '../../hooks/useDevices';
import useToggle from '../../hooks/useToggle';
import ImageModal from './ImageModal';
import getUrl from '../../utils/getUrl'

const useStyles = makeStyles(theme => ({
  image: {
    padding: 10
  },
  paper: {
    padding: 10
  },
  camera: {
    paddingTop: 5,
    paddingBottom: 5
  },
  buttons: {
    margin: theme.spacing(5)
  }
}));

const Rows = ({ classes, rows, selectImage, deleteImage }) => {

  const handleDeleteColumn = (e, id) => {
    e.stopPropagation();
    deleteImage(id);
  }

  const stopPropagation = (e) => e.stopPropagation();

  return rows.map((row) => (
    <TableRow hover={true} key={row.id} onClick={() => selectImage(row.id)}>
      <TableCell component="th" scope="row">
        <Button
          variant="contained"
          color="default"
          component="a"
          download={row.name}
          href={getUrl(`/images/${row.id}`)}
          onClick={stopPropagation}
          startIcon={<GetAppIcon />}
        >Download</Button>
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell align="right">

        <CloseIcon style={{ color: red[400], cursor: 'pointer' }} onClick={(e) => handleDeleteColumn(e, row.id)} />
      </TableCell>
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
                <TableCell>Download</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right" styles={{ width: 20 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Rows classes={classes} rows={images} selectImage={selectImage} deleteImage={deleteImage} />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item lg={4}>
        <Paper className={classes.paper}>
          <Typography variant="h3">Cameras</Typography>

          {devices.map(srv => {
            return (
              <div key={srv.id} className={classes.camera}>
                <Typography variant="h6">{srv.name}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!srv.online}
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