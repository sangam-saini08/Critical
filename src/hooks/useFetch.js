import {useState, useEffect} from 'react';
import {fethchDataFromAPI} from '../utils/Api';

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading('loading...');
    setError(null);
    setData(null);
    fethchDataFromAPI(url)
      .then(response => {
        setData(response);
        setLoading(false);
      })
      .catch(error => {
        setError('Something went wrong');
        setLoading(false);
      });
  }, [url]);

  return {data, loading, error};
};
export default useFetch;
