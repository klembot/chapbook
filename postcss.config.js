module.exports = {
	plugins: [
		require('postcss-import'),
		require('cssnano'),
		require('autoprefixer')('IE 10', '> 10%')
	]
};