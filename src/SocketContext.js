import React from 'react';
import io from "socket.io-client";
import config from './config';

export const socket = io(`ws://${config.server.ip}:${config.server.port}`, {
  reconnectionDelayMax: 10000
});

socket.on("connect", () => {
  console.log(`${socket.id} connected`);
});

socket.on("disconnect", () => {
  console.log(`${socket.id} disconnected`);
});

const context = React.createContext(socket); 

export default context;