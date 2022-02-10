const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
  mode: 'development',
  devServer: {
    port: 3002
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'basketCard',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './src/bootstrap'
      },
      shared: [
        {
          'event-store': {
            import: '../event-store',
            requiredVersion: require('../event-store/package.json').version,
            singleton: true
          }
        }]
    })
  ]
};
