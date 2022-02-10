const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  mode: "development",
  devServer: {
    port: 3003,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "productList",
      filename: "remoteEntry.js",
      exposes: {
        "./Module": "./src/bootstrap",
      },
      shared: [
        "nanoid",
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
