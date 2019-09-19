import Axios from 'axios';
import { VM } from '../main';

const baseUrl = '';
// const baseUrl = 'http://192.168.2.116:9100';
// const baseUrl = 'http://hhlqr.whcewei.com';


Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    alert(error);
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    if (response.data.code && response.data.code === 501) {
      // VM.$loading.hide();
      return response.data;
    };
    if (response.data.code && response.data.code === 200) {
      // VM.$loading.hide();
      return response.data.data ? response.data.data : response.data.msg;
    } else {
      // VM.$loading.hide();
      alert(response.data.msg);
      return null;
    }
  },
  (error) => {
    // VM.$loading.hide();
    alert(error);
    return Promise.reject(error);
  }
);

function post (url: string, data: any, isloading: boolean = true) {
  (isloading && VM) && VM.$loading.show();
  return Axios({
    url: baseUrl + url,
    method: 'post',
    data: JSON.stringify(data),
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=utf-8',
    }
  }).then(
    (response: any) => {
      (isloading && VM) && VM.$loading.hide();
      return response;
    },
    (error: any) => {
      (isloading && VM) && VM.$loading.hide();
      return null;
    }
  );
}

function get (url: string, data?: object, isloading: boolean = true) {
  (isloading && VM) && VM.$loading.show();
  return Axios({
    url: baseUrl + url,
    method: 'get',
    data: JSON.stringify(data),
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    }
  }).then(
    (response: any) => {
      (isloading && VM) && VM.$loading.hide();
      return response;
    },
    (error: any) => {
      (isloading && VM) && VM.$loading.hide();
      return null;
    }
  );
}

function upload (url: string, data?: object, isloading: boolean = true) {
  (isloading && VM) && VM.$loading.show();
  return Axios({
    url: baseUrl + url,
    method: 'post',
    data: data,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': '',
    }
  }).then(
    (response: any) => {
      (isloading && VM) && VM.$loading.hide();
      return response;
    },
    (error: any) => {
      (isloading && VM) && VM.$loading.hide();
      return null;
    }
  );
}

export { post, get, upload }
