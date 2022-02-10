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
            import: "../event-store",
            requiredVersion: require("../event-store/package.json").version,
            singleton: true,
          },
        },
      ],
    }),
  ],
};
