import { useState, useCallback } from 'react';
import axios from 'axios';
import getUrl from '../utils/getUrl';

const useApi = (defaultLoading = false) => {
  const [ state, setState] = useState({
    loading: defaultLoading,
    dbSize: '',
    systems: []
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
      });
      
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