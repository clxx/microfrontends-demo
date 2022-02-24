const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 3000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        shoppingCartBadge: "shoppingCartBadge@http://localhost:3001/remoteEntry.js",
        shoppingCartCard: "shoppingCartCard@http://localhost:3002/remoteEntry.js",
        productList: "productList@http://localhost:3003/remoteEntry.js",
        tracking: "tracking@http://localhost:3004/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
