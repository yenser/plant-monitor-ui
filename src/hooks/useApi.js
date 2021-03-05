import { useState, useCallback } from 'react';
import axios from 'axios';
import config from '../config';

const getUrl = (path = '') => {
  return `http://${config.server.ip}:${config.server.port}${path}`;
}

const useApi = (defaultLoading = false) => {
  const [ state, setState] = useState({
    loading: false,
    dbSize: ''
  });

  const setLoading = (loadingState) => {
    setState({
      ...state,
      loading: loadingState
    });
  }

  const getDbSize = () => {
    setLoading(true);
    axios.get(getUrl('/dbsize')).then(res => {
      setState({
        ...state,
        loading: false,
        dbSize: res.data.size
      })
      
    }).catch(err => {
      console.error(err.message);
      setLoading(false);
    });
  }

  return {
    ...state,
    getDbSize: useCallback(getDbSize, [])
  }

}

export default useApi;