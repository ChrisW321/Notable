module.exports = {
    context: __dirname + '/client',
    entry: './index.jsx',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'env']
          },
        },      
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ],
      
    },
    output: {
      path: __dirname + '/public',
      filename: 'bundle.js',
    }
  };