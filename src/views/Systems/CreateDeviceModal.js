import ReactDOM from 'react-dom';
import {
  Button,
  Modal,
  MenuItem,
  Paper,
  Typography,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useInputValue from '../../hooks/inputHook';
import useDevices from '../../hooks/useDevices';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const isValid = (value) => {
  return value ? true : false;
}

const isIpAddress = (ip, allowEmpty = false) => {
  if (allowEmpty && ip === '') {
    return true;
  }
  var pattern = new RegExp(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/i);
  return pattern.test(ip);
};

const isPort = (port) => {
  return port ? !isNaN(port) : false;
}


const Types = [
  {
    value: 'camera',
    label: 'Camera'
  }
]

const CreateDeviceModal = ({ open, toggle }) => {
  const classes = useStyles();

  const { createDevice } = useDevices();

  const name = useInputValue('', isValid);
  const type = useInputValue(Types[0].value, isValid);
  const ipAddress = useInputValue('', isIpAddress);
  const port = useInputValue('', isPort);

  const canSubmit = () => {
    if(isValid(name.value) && isValid(type.value) && isIpAddress(ipAddress.value) && isPort(port.value)) {
      return true;
    } else {
      return false;
    }
  }

  const submit = () => {
    createDevice(name.value, type.value, ipAddress.value, port.value);
    toggle();
  }

  return ReactDOM.createPortal((
    <>
      <Modal
        className={classes.modal}
        open={open}
        onClose={toggle}
      >
        <Paper className={classes.paper}>
          <Typography>Create New Device</Typography>

          <TextField id="standard-basic" label="Name" {...name} />

          <TextField id="standard-basic" label="Type" select {...type}>
          {Types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>

          <TextField id="standard-basic" label="IP Address" {...ipAddress} />

          <TextField id="standard-basic" label="Port" {...port} />

          <Button variant="contained" color="primary" disabled={!canSubmit()} onClick={submit}>Create</Button>
        </Paper>
      </Modal>
    </>
  ), document.body);
}

export default CreateDeviceModal;