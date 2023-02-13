const path = require("path")
const HtmlPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")

module.exports = {
    entry:{
        path:"./src/index.js"
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"main.js",
        publicPath:"/"
    },
    plugins:[
        new HtmlPlugin({template:path.resolve(__dirname,"src/index.html")}),
        new Dotenv({path:"./.env",safe:true})],
    devServer:{
        port:process.env.REACT_APP_PORT,
        host:"localhost",
        open:true,
        historyApiFallback: true
    },
    module:{
        rules:[
            {
                test:/\.js/,
                exclude:path.resolve(__dirname,"node_modules"),
                include:path.resolve(__dirname,"src"),
                use:{
                        loader:"babel-loader",
                        options:{
                            presets:["@babel/preset-env","@babel/preset-react"]
                        }
                }
            },
            {
                test:/\.css/,
                use:["style-loader", "css-loader"]
            },
            {
                test:/\.(png|jpg|jpe?g|gif)/,
                use:["file-loader"]
            },
            {
                test:/\.json/,
                use:["json-loader"]
            }
        ]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
      },
    mode:"development"
}