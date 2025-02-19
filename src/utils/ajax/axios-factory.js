import axios from "axios";

const CancelToken = axios.CancelToken;

class AxiosFactory {
  constructor(baseURL) {
    this.axios = axios;
    this.requestMap = {};
    axios.defaults.baseURL = baseURL;
    axios.interceptors.request.use((config) => {
      // if (this.requestMap[config.url]) {
      //   // 如果这个请求已经有在执行，则取消
      //   this.requestMap[config.url]();
      //   delete this.requestMap[config.url];
      // }
      config.cancelToken = new CancelToken((c) => {
        this.requestMap[config.url] = c;
      });
      return config;
    });
    axios.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        if (error.response && error.response.data && error.response.data.byteLength) {
          // 序列化数据的解析返回
          let array = new Uint8Array(error.response.data);
          let json = JSON.parse(new TextDecoder().decode(array));
          return Promise.reject(json.data);
        }
        if (error.response && error.response.data && error.response.data.data) {
          return Promise.reject(error.response.data.data);
        } else {
          return Promise.reject(error);
        }
      }
    );
  }
  getInstance() {
    return this.axios;
  }
}

export default AxiosFactory;
