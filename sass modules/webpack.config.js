const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const PORT = 3000;
const sourceMap = true;

//
const cssLoaderWithModules = {
  loader: 'css-loader',
  options: {
    sourceMap,
    importLoaders: 1,
    modules: {
      mode: 'local',
      localIdentName: '[name]_[local]__[contenthash]',
    },
  },
};

const cssModulesTypescriptLoader = {
  loader: 'css-modules-typescript-loader',
  options: {
    sourceMap,
    importLoaders: 1,
    localsConvention: 'camelCase',
  },
};

const config = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].bundle.js', // the name of the bundle
    path: path.join(__dirname, 'dist'), // the bundle output path
  },
  plugins: [
    // to import index.html file inside index.js
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
  ],
  devServer: {
    port: PORT, // you can change the port
    open: {
      target: 'http://localhost:' + PORT,
      app: { name: 'Google Chrome' },
    },
    client: {
      overlay: true,
    },
  },
  stats: {
    errorDetails: true,
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.sass$/i,
        use: ['style-loader', cssModulesTypescriptLoader, cssLoaderWithModules, 'sass-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: 'url-loader',
        options: { limit: false },
      },
    ],
  },
};

module.exports = (args) => {
  console.log(args);

  switch (true) {
    case args.dev:
      return { mode: 'development', ...config };

    case args.prod:
      return { mode: 'production', ...config };

    default:
      throw new Error('unexpected --env arg');
  }
};
