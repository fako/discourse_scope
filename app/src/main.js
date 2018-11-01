import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Vue from 'vue'
import injector from 'vue-inject';
import VueOnsen from 'vue-onsenui';
import vSelect from 'vue-select/src/components/Select';

import router from './router'
import i18n from './i18n'
require('./bootstrap');

import App from './app/App.vue';


Vue.use(injector);

Vue.use(VueOnsen);
VueOnsen.platform.select('chrome');

library.add(faSearch);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.component('v-select', vSelect);

Vue.config.productionTip = false;


new Vue({
    router,
    i18n,
    render: h => h(App),
}).$mount('#app');
