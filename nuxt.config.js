import pkg from './package';
import config from './config/latest';
import axios from 'axios';
import webpack from 'webpack';

if (config.env === 'development') {
	process.env.DEBUG = 'nuxt:*';
}

module.exports = {
	mode: 'universal',
	env: {
		environment: config.env || 'production'
	},

	/*
	 ** Headers of the page
	 */
	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},

	/*
	 ** Customize the progress bar color
	 */
	loading: {
		color: '#000000' //,
		// failedColor: '#000000'
	},

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [{ src: '~/plugins/vuex-persist', ssr: false }],

	/*
	 ** Nuxt.js modules
	 */
	modules: ['nuxt-rfg-icon', '@nuxtjs/google-analytics', '@nuxtjs/axios', '@nuxtjs/pwa'],

	/*
	 ** GoogleAnalytics module configuration
	 */
	'google-analytics': {
		id: 'UA-456653-7',
		disabled: false
	},

	/*
	 ** Axios module configuration
	 */
	axios: {
		retry: {
			retries: 3
		},
		baseURL: config.api
	},

	generate: {
		routes: function() {
			return axios
				.get('https://raw.githubusercontent.com/silvandiepen/passport-data/master/country-names.json')
				.then((res) => {
					return res.data.map((country) => {
						return '/country/' + country.id;
					});
				});
		}
	},

	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** Build plugins
		 */
		plugins: [
			new webpack.ProvidePlugin({
				_: 'lodash'
			})
		],

		// babel: {
		// 	babelrc: true,
		// 	cacheDirectory: undefined
		// },
		transpile: [], // Name of NPM packages to be transpiled

		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {
			// Define toolset shortcut
			config.resolve.alias['~tools'] = 'assets/scss/tools.scss';
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				});
			}
		}
	},

	/*
	 ** Global CSS
	 */
	css: [
		{
			src: '~assets/scss/app.scss',
			lang: 'scss'
		}
	]
};
