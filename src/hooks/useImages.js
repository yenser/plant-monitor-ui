import { useState, useCallback } from 'react';
import axios from 'axios';
import getUrl from '../utils/getUrl';

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

  const captureImage = (device, name = undefined) => {
    const  body = {
      name
    }
    axios.post(getUrl(`/images/capture/${device.id}`), body).then(res => {
      getImages();
    }).catch(err => {
      console.error(err.message);
      setLoading(false);
    });
  }

  const deleteImage = (imageId) => {
    axios.delete(getUrl(`/images/${imageId}`)).then(res => {
      getImages();
    }).catch(err => {
      console.error(err.message);
      setLoading(false);
    });
  }

  return {
    ...state,
    getImages: useCallback(getImages, []),
    captureImage: useCallback(captureImage, []),
    deleteImage: useCallback(deleteImage, [])
  }

}

export default useImages;