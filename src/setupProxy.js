const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Replace '/api' with the path that should be proxied
    createProxyMiddleware({
      target: 'https://amused-gray-rooster.cyclic.app', // Replace with your backend domain
      changeOrigin: true,
    })
  );
};
