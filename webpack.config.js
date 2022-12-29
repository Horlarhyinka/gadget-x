const path = require("path")
const HtmlPlugin = require("html-webpack-plugin")

module.exports = {
    entry:{
        path:"./src/index.js"
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"main.js",
    },
    plugins:[new HtmlPlugin({template:"src/index.html"})],
    devServer:{
        port:3000
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
            }
        ]
    },
    mode:"development"

}