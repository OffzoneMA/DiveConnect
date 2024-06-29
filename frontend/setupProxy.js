const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://dive-connect-t1x9.vercel.app",
      changeOrigin: true,
    })
  );
};
