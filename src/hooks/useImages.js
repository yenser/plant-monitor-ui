import { useState, useCallback } from 'react';
import axios from 'axios';
import config from '../config';

const getUrl = (path = '') => {
  return `http://${config.server.ip}:${config.server.port}${path}`;
}

const createUrlFromComputerDetails = (details) => {
  return `http://${details.ip}:${details.port}/capture`
}

const useImages = (defaultLoading = false) => {
  const [ state, setState] = useState({
    loading: defaultLoading,
    images: []
  });

  const setLoading = (loadingState) => {
    setState({
      ...state,
      loading: loadingState
    });
  }

  const getImages = () => {
    setLoading(true);
    axios.get(getUrl('/images')).then(res => {
      setState({
        ...state,
        loading: false,
        images: res.data
      });
      
    }).catch(err => {
      console.error(err.message);
      setLoading(false);
    });
  }

  const captureImage = (device) => {
    axios.get(getUrl(`/images/capture/${device.id}`)).then(res => {
      getImages();
    }).catch(err => {
      console.error(err.message);
      setLoading(false);
    });
  }

  return {
    ...state,
    getImages: useCallback(getImages, []),
    captureImage: useCallback(captureImage, [])
  }

}

export default useImages;