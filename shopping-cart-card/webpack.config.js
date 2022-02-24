const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  mode: "development",
  devServer: {
    port: 3002,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shoppingCartCard",
      filename: "remoteEntry.js",
      exposes: {
        "./Module": "./src/bootstrap",
      },
      shared: [
        {
          "event-store": {
            requiredVersion: "1.0.0",
            singleton: true,
          },
        },
      ],
    }),
  ],
};
