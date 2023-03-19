const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://newsdata.io',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/1/news'
      }
    })
  );
};
