import axios from 'axios';
import REACT_NATIVE_TMDB_TOKEN from '../utils/config';

const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = REACT_NATIVE_TMDB_TOKEN;

const headers = {
  Authorization: 'Bearer ' + TMDB_TOKEN,
};

export const fethchDataFromAPI = async (url, params) => {
  try {
    const {data} = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.log(`error from api: ${error}`);
    return error;
  }
};
