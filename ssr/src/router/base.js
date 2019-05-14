export default [
  {
    path: '/500',
    component: r => require.ensure([], () => r(require('@/pages/base/500')), 'base'),
    meta: {
      title: '服务器出错，请稍后再试',
    },
  },
  {
    path: '/404',
    component: r => require.ensure([], () => r(require('@/pages/base/404')), 'base'),
    meta: {
      title: '资源未找到',
    },
  },
];
