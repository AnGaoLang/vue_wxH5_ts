import Axios from 'axios';

// const baseUrl = 'http://192.168.2.110:9100';
const baseUrl = '';


Axios.interceptors.request.use(
  config => {
    // // 调用成功
    // Vue.$vux.loading.show({
    //   text: '加载中'
    // });
    // document.body.style.overflow = 'hidden';
    return config;
  },
  error => {
    // 调用失败
    // Vue.$vux.loading.show({
    //   text: '请求调用失败'
    // });
    // document.body.style.overflow = 'hidden';
    // setTimeout(() => {
    //   Vue.$vux.loading.hide();
    //   document.body.style.overflow = 'auto';
    // }, 1000);
    return Promise.reject(error);
  }
);

// 请求返回后的拦截器
Axios.interceptors.response.use(
  response => {
    // 请求成功
    if (response.data.code && response.data.code == 200) {
      // Vue.$vux.loading.hide();
      // document.body.style.overflow = 'auto';
      return response.data.data;
    } else {
      alert(response.data.data.msg);
      // Vue.$vux.loading.hide();
      // document.body.style.overflow = 'auto';

      // let errorMsg = '';
      // if (response.data.error.message) {
      //   errorMsg = response.data.error.message;
      // }
      // if (response.data.error.validationErrors) {
      //   response.data.error.validationErrors.forEach((item: object) => {
      //     errorMsg += item.message + ',';
      //   });
      //   errorMsg = errorMsg.substring(0, errorMsg.length - 1);
      // }

      // Vue.$vux.loading.show({
      //   text: `请求调用失败：${errorMsg}`
      // });
      // setTimeout(() => {
      //   Vue.$vux.loading.hide();
      // }, 1000);
      return null;
    }
  },
  error => {
    // 请求失败
    // Vue.$vux.loading.show({
    //   text: `请求调用失败：${error}`
    // });
    // setTimeout(() => {
    //   Vue.$vux.loading.hide();
    // }, 1000);
    return Promise.reject(error);
  }
);

function post (url: string, data: object) {
  return Axios({
    url: baseUrl + url,
    method: 'post',
    data: data,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; application/x-www-form-urlencoded; charset=utf-8',
    }
  }).then(
    (response: any) => {
      return response;
    },
    (error: any) => {
      return null;
    }
  );
}

function get (url: string, data?: object) {
  return Axios({
    url: baseUrl + url,
    method: 'get',
    data: data,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; application/x-www-form-urlencoded; charset=utf-8',
    }
  }).then(
    (response: any) => {
      return response;
    },
    (error: any) => {
      return null;
    }
  );
}

export { post, get };