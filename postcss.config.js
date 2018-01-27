let config = {plugins: [require('postcss-import')]};

if (process.env.NODE_ENV === 'production') {
	config.plugins.push(require('cssnano'));
	config.plugins.push(require('autoprefixer')('IE 10', '> 10%'));
}

module.exports = config;