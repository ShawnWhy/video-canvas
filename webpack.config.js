const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')


module.exports = {
        mode : 'development', //production
        entry:{
                main:path.resolve(__dirname, "src/index.js"),

        },

        output:{

                path: path.resolve(__dirname, 'dist'),
                filename: '[name].[contenthash].js',
                assetModuleFilename: '[name][ext]',
                clean:true
                },
        //loaders
        devtool : 'inline-source-map',
        devServer:{
        static: path.resolve(__dirname, 'dist'),
        port:8011, //default 8080,
        open: true,
        hot: true,
        },
        module:{
                rules:[
                        {test: /\.css$/, use: ['style-loader', 'css-loader']},
                        {test: /\.(svg|ico|png|svg|webg|jpg|gif|jpeg|mp4)$/, type: 'asset/resource'},
                        // {test: /\.mp4$/,use: 'file-loader?name=videos/[name].[ext]',},
                        
                        ]
},
        //  rules: [
        // {test: /\.html$/,}

        // ],
        //plugins
        plugins:[new HtmlWebPackPlugin({
                 title:"Das boot",
                 filename:'index.html',
                 template: path.resolve(__dirname, "./src/index.html"),
                 
                 clean:true
                })
                ],
                }


// module.exports={
//         module:{
//           rules:[
//              {test: /\.html$/,
//               use: [ 
//                         { loader:"html-loader",
//                           options:{minimize:true}
//                         }
//                         ]

//                 }


//         ]




// },

// plugins:[
//         new HtmlWebPackPlugin({
//         template:"./src/index.html",
//         filename: "./index.html"

// })


// ]




// }