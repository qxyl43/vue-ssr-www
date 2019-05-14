export default [
  {
    path: '/',
    component: r => require.ensure([], () => r(require('@/pages/home/index')), 'home'),
    name: 'home',
    meta: {
      title: '首页',
    },
  },
];
