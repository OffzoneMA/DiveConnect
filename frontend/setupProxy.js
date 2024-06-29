const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://dive-connect.vercel.app",
      changeOrigin: true,
      followRedirects: true, // This will likely fix the redirect issue
    })
  );
};
