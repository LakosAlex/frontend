import axios from 'axios';
import getRejectedResponseHandler from 'src/utils/getRejectedResponseHandler';

function Axios() {
  const axiosApi = axios.create({ baseURL: "http://vps-5884ed77.vps.ovh.net:8080" });
  axiosApi.interceptors.response.use(undefined, getRejectedResponseHandler(axiosApi));
  return axiosApi;
}

export default Axios;