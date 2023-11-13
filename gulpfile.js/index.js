const { src, dest, watch, series } = require('gulp');
const named = require('vinyl-named');
const compiler = require('webpack');
const webpack = require('webpack-stream');
const livereload = require('gulp-livereload');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const jsxScript = () =>
  src('src/js/index.js')
    .pipe(named())
    .pipe(
      webpack(
        {
          devtool: 'eval-cheap-module-source-map',
          mode: 'development',
          module: {
            rules: [
              {
                test: /\.js$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['babel-plugin-styled-components'],
                  },
                },
                exclude: /node_modules/,
              },
              {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
              {
                test: /\.(s(a|c)ss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
              },
            ],
          },
        },
        compiler
      )
    )
    .pipe(dest('dist/'))
    .pipe(livereload());

const jsxBuildScript = () =>
  src('src/js/index.js')
    .pipe(named())
    .pipe(
      webpack(
        {
          devtool: 'source-map',
          mode: 'production',
          module: {
            rules: [
              {
                test: /\.js$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['babel-plugin-styled-components'],
                  },
                },
                exclude: /node_modules/,
              },
              {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
              {
                test: /\.(s(a|c)ss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
              },
            ],
          },
          plugins: [new BundleAnalyzerPlugin({ analyzerMode: 'static', generateStatsFile: true })],
        },
        compiler
      )
    )
    .pipe(dest('dist/'));

const vanillaScript = () =>
  src('src/admin-js/clinic-finder-options.js')
    .pipe(named())
    .pipe(
      webpack(
        {
          devtool: 'eval-cheap-module-source-map',
          mode: 'development',
          module: {
            rules: [
              {
                test: /\.js$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  },
                },
                exclude: /node_modules/,
              },
            ],
          },
        },
        compiler
      )
    )
    .pipe(dest('dist/'))
    .pipe(livereload());

const vanillaBuildScript = () =>
  src('src/admin-js/clinic-finder-options.js')
    .pipe(
      webpack(
        {
          devtool: 'source-map',
          mode: 'production',
          module: {
            rules: [
              {
                test: /\.js$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  },
                },
                exclude: /node_modules/,
              },
            ],
          },
          plugins: [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
            }),
          ],
        },
        compiler
      )
    )
    .pipe(dest('dist/'));

function watchFiles() {
  livereload.listen();
  const mainWatch = 'src/js/**/*';

  const adminWatch = 'src/admin-js/**/*';

  watch([mainWatch], () => jsxScript(true));
  watch([adminWatch], () => vanillaScript(true));
}

const build = series(jsxBuildScript, vanillaBuildScript);
exports.build = build;
exports.watch = watchFiles;
