import axios from 'axios';

import injector from 'vue-inject';


function getParameterByName(name) {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


injector.constant('axios', axios);

injector.constant('apiRoot', process.env.VUE_APP_API_URL);
injector.constant('staticsPrefix', window.STATICS_PREFIX || '/');

injector.constant('utm', {
    source: getParameterByName('utm_source'),
    medium: getParameterByName('utm_medium'),
    campaign: getParameterByName('utm_campaign')
});
