import React from 'react';
import config from '../config';

const getUrl = (path = '') => {
  return `http://${config.server.ip}:${config.server.port}/images/${path}`;
}

const Image = ({ id }) => {
  if(id === null) {
    return null;
  }
  return <img src={getUrl(id)}></img>
}

export default Image;