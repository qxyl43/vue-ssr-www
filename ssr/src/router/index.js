// router.js
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from './home';
import Base from './base';

/* eslint-disable */
export function createRouter() {
  return new Router({
    mode: 'history', // SSR必须使用history模式
    routes: [...Home, ...Base],
  });
}
