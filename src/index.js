import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import SocketContext, { socket } from './SocketContext';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: amber
  }
});

const app = (
  // <SocketContext.Provider value={socket}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  // </SocketContext.Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();