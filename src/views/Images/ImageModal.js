import ReactDOM from 'react-dom';
import {
  Modal,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../containers/Image';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: 5
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const ImageModal = ({ open, toggle, imageId }) => {
  const classes = useStyles();

  return ReactDOM.createPortal((
    <>
      <Modal
        className={classes.modal}
        open={open}
        onClose={toggle}
      >
        <Paper className={classes.paper}>
          {imageId ? <Image id={imageId} /> : null}
        </Paper>
      </Modal>
    </>
  ), document.body);
}

export default ImageModal;