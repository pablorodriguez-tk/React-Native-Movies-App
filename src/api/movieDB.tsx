import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {api_key: 'ff81dadd872e3afe4267c0b819e1c4ad', language: 'es-Es'},
});

export default movieDB;
