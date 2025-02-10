import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:5001/clone-19120/us-central1/api',
  //  // Your backend base URL
  baseURL:'https://amazon-api-deploy2-q2jd.onrender.com/'
});
