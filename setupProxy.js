const { application } = require("express");
const proxyMidleware = require("http-proxy-middleware");

module.exports = function(app){
    app.use("/api",proxyMidleware.createProxyMiddleware({
        target:"http://localhost:5000",
        changeOrigin:true
    }));
}