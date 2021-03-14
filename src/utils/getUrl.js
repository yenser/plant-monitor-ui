import config from '../config';

export default (path = '') => {
  return `http://${config.server.ip}:${config.server.port}${path}`;
}