import axios from 'axios';

export default axios.create({
  /*
  If using the local server, then type: 
    ~$ ipconfig 
  and copy the IPv4 Address, and paste it in baseURL.
  */

  // baseURL: `http://192.168.10.6:8080`
  baseURL: `https://digi-mart-server.herokuapp.com`
});
