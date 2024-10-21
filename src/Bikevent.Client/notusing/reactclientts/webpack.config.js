import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
const __dirname = path.resolve();

const config = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
    compress: true,
    port: 9000,
    // without this no react router!!!!
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // inject: "head",
      // title: "test page",
      // description: "a fing test",
      // if remove below will use in memory
      template: path.join(__dirname, "./public/index.html"),
      minify: {
        removeComments: false,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules)/,
        loader: "babel-loader",
        test: /\.[t]sx?$/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
        },
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jp(e*)g|gif|woff)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
  },
};

export default config;
