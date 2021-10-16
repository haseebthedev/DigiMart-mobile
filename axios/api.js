import axios from 'axios';

export default axios.create({
  baseURL: `http://192.168.10.5:8080`
});
