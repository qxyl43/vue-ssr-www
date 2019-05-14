// app.js
import Vue from 'vue';
import { sync } from 'vuex-router-sync'; // 把当VueRouter状态同步到Vuex中
import Element from 'element-ui';
import App from './App.vue';
import { createRouter } from './router/index';
import { createStore } from './store/index';
import * as filters from './filters';
import * as utils from './utils';
import '@/styles';

Vue.use(Element);

// 创建 router 实例
const router = createRouter();
// 创建 store 实例
const store = createStore();

// 添加全局变量
Vue.prototype.$globalConfig = require('../config');

// 全局注入公共方法
Vue.prototype.$utils = utils;

// filter过滤器全局过滤
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
// 将路由状态添加到vuex中
sync(store, router);

const app = new Vue({
  // 注入 router store 到根 Vue 实例
  router,
  store,
  render: h => h(App),
});

/**
 * 导出 router and store.
 */
export { app, router, store };
