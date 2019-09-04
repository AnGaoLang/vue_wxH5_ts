import Vue from 'vue';
import Loading from './loading.vue';

Vue.extend(Loading);

type loadOptions = {
  show: boolean
}

const install = () => {
  // 返回一个vue子组件实例
  const getload = (options ?:loadOptions) => {
    // 实例化一个子组件实例
    let load = new Loading();
    // 对load组件进行挂载
    load = load.$mount();
    // 获取组件实例的dom根节点，插入body
    document.body.appendChild(load.$el);
    // 返回当前组件实例
    return load
  };
  // 通过赋予vue原型 $loading 以 load组件实例，
  // 可以直接通过 vm.$loading调用组件内部的方法
  Vue.prototype.$loading = getload(); // 全局仅有一个组件实例

  // 赋予原型上的 $loading 以一个函数，每次 this.$loading.getload() 都将生成一个新的组件实例
  // Vue.prototype.$loading = getload();
}

export default install;