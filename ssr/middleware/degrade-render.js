const path = require('path');
const fs = require('fs');

const isProd = process.env.NODE_ENV === 'production';

// 如果是正式环境，从硬盘中取index.html
// 如果是开发环境，从devMiddleware里取index.html
const sendSpaHtml = (res, devFs) => {
  res.type('html');
  if (isProd) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  } else {
    const spaHtmlBuffer = devFs.readFileSync(path.join(__dirname, '../dist/index.html'));
    res.send(spaHtmlBuffer);
  }
};

module.exports.sendSpaHtml = sendSpaHtml;

module.exports.degradeMiddleware = devFs => function named(req, res, next) {
  if (req.query.degrade) {
    // 返回单页spa，并不再执行后面的中间件
    sendSpaHtml(res, devFs);
  } else {
    next();
  }
};
