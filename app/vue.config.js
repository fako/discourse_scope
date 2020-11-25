module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/app/'
        : '/',
    devServer: {
        proxy: 'http://localhost:8000'
    }
};
