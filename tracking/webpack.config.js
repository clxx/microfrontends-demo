const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  mode: "development",
  devServer: {
    port: 3004,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "tracking",
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
