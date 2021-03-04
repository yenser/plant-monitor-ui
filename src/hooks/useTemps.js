import { useState, useCallback } from 'react';
import axios from 'axios';
import config from '../config';

const getUrl = (path = '') => {
  return `http://${config.server.ip}:${config.server.port}${path}`;
}

const useTemps = (defaultLoading = false) => {
  const [ dailyTemps, setDailyTemps] = useState([]);
  const [ count, setCount ] = useState(0);
  const [ loading, setLoading ] = useState(defaultLoading);
  const [ dbSize, setDbSize ] = useState('');

  const getTempCount = async () => {
    setLoading(true);
    axios.get(getUrl('/temp/count')).then(res => {
      setCount(res.data.count)
      setLoading(false);
    }).catch(err => {
      console.error(err.message);
      setLoading(false);
    });
  }
  
  const getDailyTemps = () => {
    setLoading(true);
    axios.get(getUrl('/temp/daily')).then(res => {

      setDailyTemps(res.data)
      setLoading(false);
    }).catch(err => {
      console.error(err.message);
      setLoading(false);
    });
  }

  const getDbSize = () => {
    setLoading(true);
    axios.get(getUrl('/temp/size')).then(res => {
      setDbSize(res.data.size)
      setLoading(false);
    }).catch(err => {
      console.error(err.message);
      setLoading(false);
    });
  }

  return {
    loading,
    count,
    dailyTemps,
    dbSize,
    getTempCount: useCallback(getTempCount, []),
    getDailyTemps: useCallback(getDailyTemps, []),
    getDbSize: useCallback(getDbSize, [])
  }

}

export default useTemps;