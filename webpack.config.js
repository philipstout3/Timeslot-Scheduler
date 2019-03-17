const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, './client/Index.jsx'), // change me (points towards your index.jsx)
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/'), // change me (points towards folder containing bundle.js)
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        },
      }
    ],
  }
};
