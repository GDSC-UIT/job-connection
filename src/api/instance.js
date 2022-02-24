import axios from 'axios';

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, url: '/api' });

export const setToken = (token) => {
  console.log('set Token', token);
  instance.defaults.headers['Authorization'] = token;
};

instance.interceptors.request.use(
  (config) => {
    const url = getUrl(config);
    console.log(`%c ${config.method?.toUpperCase()} - ${url}:`, 'color: #0086b3; font-weight: bold', config);
    return config;
  },
  (error) => {
    console.log(`%c ${error.response?.status}  :`, 'color: red; font-weight: bold', error.response.data);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log(` %c ${response.status} - ${getUrl(response.config)}:`, 'color: #008000; font-weight: bold', response);
    // response.data.status = 'success';
    return response;
  },
  (error) => {
    if (error.response) {
      // server trả response về là lỗi code đã handle
      console.log(`%c ${error.response.status}  :`, 'color: red; font-weight: bold', error.response.data);
      error.message = error.response.data.message || error.message;
      return Promise.reject(error);
    } else if (error.request) {
      // request mãi mãi ko thấy response
      // `error.request` là XMLHttpRequest trong website còn nodejs là http.ClientRequest
      // console.log(error.request);
      // console.log(`%c ${JSON.stringify(error)}  :`, 'color: red; font-weight: bold', error.response.data);
      return Promise.reject(error);
    } else {
      // có gì đó sai sai, hình như là hàm request sai
      console.log(`%c ${JSON.stringify(error)}  :`, 'color: red; font-weight: bold', 'có gì đó sai sai, hình như là setting sai');
      return Promise.reject(error);
    }
  }
);

function getUrl(config) {
  if (config.baseURL) {
    return config.url?.replace(config.baseURL, '').split('?')[0];
  }
  return config.url;
}

export default instance;
