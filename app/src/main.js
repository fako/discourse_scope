import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from 'vue'
import injector from 'vue-inject';
import VueOnsen from 'vue-onsenui';

import router from './router'
import i18n from './i18n'
require('./bootstrap');

import App from './App.vue';


Vue.use(injector);

Vue.use(VueOnsen);
VueOnsen.platform.select('chrome');

Vue.config.productionTip = false;


new Vue({
    router,
    i18n,
    render: h => h(App),
}).$mount('#app');
