const path = require('path'); // CommonJS

module.exports = {
  mode: 'production',
  entry: './frontend/main.js',
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      },
      {
        test: /\.css$/i, // Para processar arquivos CSS
        use: ['style-loader', 'css-loader'], // Loaders que serão usados
      }
    ]
  },
  devtool: 'source-map'
};
