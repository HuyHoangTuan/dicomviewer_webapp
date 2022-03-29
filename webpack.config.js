const webpack = require("webpack");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = 
{
      mode: "development",
      entry: 
      {
            bundle:
            [
                  path.resolve(__dirname,"src/js/index.js")
            ]
      
      },
      module: 
      {
            rules: 
            [
                  {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        include: path.resolve(__dirname,"src/js"),
                        use: ["babel-loader"],
                  },
                  {
                        test: /\.css$/,
                        include: path.resolve(__dirname,"src/css"),
                        use: ["style-loader", "css-loader"],
                  },
                  {
                        test: /\.html$/,
                        include: path.resolve(__dirname,"src/dist"),
                        use: "html-loader"
                  },
                  {
                        test: /\.scss$/,
                        include: path.resolve(__dirname,"src/sass"),
                        use:[
                          "style-loader",
                          "css-loader",
                          "sass-loader"
                        ],
                  },
            ],
      },
      resolve: {
            extensions: ["*", ".js", ".jsx"],
      },
      output: 
      {
            path: path.resolve(__dirname, "src/dist"),
            filename: "bundle.js",
            publicPath: '/'
      },
      plugins: 
      [
            new webpack.ProvidePlugin({
                  Buffer: ['buffer', 'Buffer'],
              }),

            new HTMLWebpackPlugin(
                  {
                        template: "./src/dist/index.html"
                  }
            )
      ],
      devServer: 
      {
            historyApiFallback: true,
            static: path.resolve(__dirname, "src/dist"),
            hot: true,
            port: 6969,
      },
};