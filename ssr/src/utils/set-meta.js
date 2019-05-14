import metaConfig from '~/meta-config.js';

const isServer = process.env.VUE_ENV === 'server';

/**
 * 解决 IOS Webview 中动态修改 document.title 不生效的问题
 */
function refreshWebviewTitle() {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = `/favicon.ico?_t=${Math.random()}`;
  iframe.onload = () => {
    setTimeout(() => {
      document.documentElement.removeChild(iframe);
    }, 0);
  };
  document.documentElement.appendChild(iframe);
}

/**
 * 设置页面标题
 * @param {Object} context 服务端渲染上下文，客户端渲染为 null
 * @param {String} title 页面标题
 */
export const setTitle = (context = null, title = metaConfig.title) => {
  if (isServer) {
    context.title = title;
  } else {
    document.title = title;
    document.head.querySelector('title').innerText = title;

    const userAppTag = 'MWYBrowser';
    const doctorAppTag = 'MWYSBrowser';
    const isUserApp = navigator.userAgent.indexOf(userAppTag) > -1;
    const isDoctorApp = navigator.userAgent.indexOf(doctorAppTag) > -1;
    if (!(isUserApp || isDoctorApp)) {
      setTimeout(() => {
        refreshWebviewTitle();
      }, 0);
    }
  }
};

/**
 * 设置页面 keywords
 * @param {Object} context 服务端渲染上下文，客户端渲染为 null
 * @param {String} keywords
 */
export const setKeywords = (context = null, keywords = metaConfig.keywords) => {
  if (isServer) {
    context.keywords = keywords;
  } else {
    document.head.querySelector('meta[name=keywords]').content = keywords;
  }
};

/**
 * 设置页面 description
 * @param {Object} context 服务端渲染上下文，客户端渲染为 null
 * @param {String} description
 */
export const setDescription = (context = null, description = metaConfig.description) => {
  if (isServer) {
    context.description = description;
  } else {
    document.head.querySelector('meta[name=description]').content = description;
  }
};

/**
 * 页面强制刷新
 * @param {Object} context 服务端渲染上下文，客户端渲染为 null
 * @param {Number} needReload
 */
export const setNeedReload = (context = null, needReload = metaConfig.needReload) => {
  if (isServer) {
    context.needReload = needReload;
  } else {
    document.head.querySelector('meta[name=needReload]').content = needReload;
  }
};
