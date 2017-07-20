
import { resolve } from 'path';
import { DefinePlugin, EnvironmentPlugin, optimize } from 'webpack';
import WXAppWebpackPlugin from 'wxapp-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin'

const { NODE_ENV, LINT, NO_LINT } = process.env;
const isDev = NODE_ENV !== 'production';
const shouldLint = (!isDev || (!!LINT && LINT !== 'false')) && !NO_LINT;

export default {
	entry: {
		app: [
			`es6-promise/dist/es6-promise.auto${isDev ? '.min' : ''}.js`,
			// './src/utils/bomPolyfill.js',
			'./src/app.js',
		],
	},
	output: {
		filename: '[name].js',
		publicPath: '/',
		path: resolve('dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: /src/,
				use: [
					'babel-loader',
					// shouldLint && 'eslint-loader',
				].filter(Boolean),
			},
			{
				test: /\.json$/,
				include: /src/,
				use: [
					{
						loader: 'file-loader',
						options: {
							useRelativePath: true,
							name: '[name].[ext]',
						},
					},
					{
						loader: 'webpack-comment-remover-loader',
						options: {
							includePaths: [
								resolve('src'),
							]
						}
					}
				].filter(Boolean),
			},
			{
				test: /\.(png|jpg|gif)$/,
				include: /src/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			},
			{
				test: /\.scss$/,
				include: /src/,
				use: [
					{
						loader: 'file-loader',
						options: {
							useRelativePath: true,
							name: '[name].wxss'
						}
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: [
								resolve('src', 'styles'),
								resolve('src')
							]
						}
					}
				],
			},
			{
				test: /\.wxss$/,
				include: /src/,
				use: [
					{
						loader: 'file-loader',
						options: {
							useRelativePath: true,
							name: '[name].wxss'
						}
					}
				]
			},
			{
				test: /\.wxml$/,
				include: /src/,
				use: [
					{
						loader: 'file-loader',
						options: {
							useRelativePath: true,
							name: '[name].wxml',
						},
					}
					// ,
					// {
					// 	loader: 'wxml-loader',
					// 	options: {
					// 		root: resolve('src'),
					// 	},
					// },
				]
			}
		]
	},
	plugins: [
		new EnvironmentPlugin({
			NODE_ENV: 'development',
		}),
		new DefinePlugin({
			__DEV__: isDev,
		}),
		new CopyWebpackPlugin([
			{ from: 'src/images', to: 'images' },
			{ from: 'src/wxParse', to: 'wxParse' },
			{ from: 'src/components', to: 'components' },
		],
		{

			ignore: [
				// Doesn't copy any files with a txt extension
				'**/*.scss',
				'**/*.js',
				// Doesn't copy any file, except if they start with a dot
				// { glob: '**/*', dot: false }
			],

			// By default, we only copy modified files during
			// a watch or webpack-dev-server build. Setting this
			// to `true` copies all files.
			// copyUnmodified: true
		}),
		// 图片压缩 production 开启
		// new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),

		/**
		 * 	new WXAppWebpackPlugin(options)
			options
			clear (Boolean): 在启动 webpack 时清空 dist 目录。默认为 true
			commonModuleName (String): 公共 js 文件名。默认为 common.js
		 */
		new WXAppWebpackPlugin({
			commonModuleName: 'common2.js'
		}),
		// shouldLint && new StylelintPlugin(),
	],

	// devtool: isDev ? 'source-map' : false,

	resolve: {
		modules: [resolve(__dirname, 'src'), 'node_modules'],
		alias: {
			'src': resolve(__dirname, './src'),
			'components': resolve(__dirname, './src/components')
		}
	},

	watchOptions: {
		ignored: /dist|manifest/,
		aggregateTimeout: 300,
	},
};
