const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  mode: "development",
  devServer: {
    port: 3001,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "basketBadge",
      filename: "remoteEntry.js",
      exposes: {
        "./Module": "./src/bootstrap",
      },
      shared: [
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
