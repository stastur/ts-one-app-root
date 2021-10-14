/** @type  { import("webpack").Configuration } */
module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            context: __dirname,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
}
