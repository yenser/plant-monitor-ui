import { useState, useCallback } from 'react';
import axios from 'axios';
import config from '../config';

const getUrl = (path = '') => {
  return `http://${config.server.ip}:${config.server.port}${path}`;
}

const useDevices = (defaultLoading = false) => {
  const [ state, setState] = useState({
    loading: defaultLoading,
    devices: []
  });

  const setLoading = (loadingState) => {
    setState({
      ...state,
      loading: loadingState
    });
  }

  const getDevices = () => {
    setLoading(true);
    axios.get(getUrl('/devices')).then(res => {
      setState({
        ...state,
        loading: false,
        devices: res.data
      });
      
    }).catch(err => {
      console.error(err.message);
      setLoading(false);
    });
  }

  const createDevice = (name, type, ipAddress, port) => {
    axios.post(getUrl('/devices'), { name, type, ipAddress, port }).then(res => {
      setState({
        ...state,
        loading: false,
        devices: devices.push({name, type, ip_address: ipAddress, port})
      })
    }).catch(err => {
      console.error(err.message);
      setLoading(false);
    });
  }

  return {
    ...state,
    getDevices: useCallback(getDevices, []),
    createDevice: useCallback(createDevice, [])
  }

}

export default useDevices;