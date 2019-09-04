import Vue from 'vue';
import Loading from './loading.vue';

Vue.extend(Loading);

type loadOptions = {
  show: boolean
}

const install = () => {
  const getload = (options ?:loadOptions) => {
    let load = new Loading();
    load = load.$mount();
    document.body.appendChild(load.$el);
    return load
  };
  Vue.prototype.$loading = getload();
}

export default install;