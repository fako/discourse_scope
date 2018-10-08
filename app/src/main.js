import axios from 'axios';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from 'vue'
import VueOnsen from 'vue-onsenui';
import VueAxios from 'vue-axios';

import router from './router'
import i18n from './i18n'

import App from './App.vue';


Vue.use(VueOnsen);
VueOnsen.platform.select('chrome');

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;


new Vue({
    router,
    i18n,
    render: h => h(App),
}).$mount('#app');
