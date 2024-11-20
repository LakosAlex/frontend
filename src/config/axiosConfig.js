import axios from 'axios';
import getRejectedResponseHandler from 'src/utils/getRejectedResponseHandler';

function Axios() {
  const axiosApi = axios.create({ baseURL: process.env.API_PATH });
  axiosApi.interceptors.response.use(undefined, getRejectedResponseHandler(axiosApi));
  return axiosApi;
}

export default Axios;