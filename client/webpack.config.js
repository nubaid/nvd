const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/"),
    filename: "assets/js/bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new CopyWebpackPlugin([{ from: "./assets", to: "assets" }])
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    // host: '192.168.0.134',3
    port: 4001,
    historyApiFallback: true, // resolves error while refresh or access directly
    // from browser. Error GET /someroot
    proxy: {
      "/": {
        target: "http://localhost:4000",
        secure: false
      }
    }
  }
};
