import Vue from 'vue';
import Loading from './loading.vue';

Vue.extend(Loading);

interface LoadOptions {
  show: boolean
}

const install = () => {
  const getload = (options?: LoadOptions) => {
    let load = new Loading();
    load = load.$mount();
    document.body.appendChild(load.$el);
    return load
  };
  Vue.prototype.$loading = getload();
}

export default install
