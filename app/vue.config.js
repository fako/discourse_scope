const BundleTracker = require("webpack-bundle-tracker");
const packageJSON = require('./package.json');

const appDirectory = packageJSON.name + '/' + packageJSON.version + '/';
const djangoPublicPath = '/static/builds/' + appDirectory;
const distDirectory = './dist/' + packageJSON.version + '/';
const webpackStatsFile = packageJSON.name + '-' + packageJSON.version + '.webpack-stats.json';


module.exports = {
    publicPath: (process.env.NODE_ENV === 'production' && process.env.npm_package_config_mode === 'django') ?
        djangoPublicPath : '/',
    outputDir: distDirectory,
    devServer: {
        proxy: 'http://localhost:8000'
    },

    chainWebpack: config => {

        config
            .plugin('BundleTracker')
            .use(BundleTracker, [{filename: webpackStatsFile, path: distDirectory}]);

        config.output.filename('[name].[hash:8].js')

    }
};
