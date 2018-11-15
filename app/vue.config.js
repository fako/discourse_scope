module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/app/'
        : '/',
    transpileDependencies: ['vue-select']
};
