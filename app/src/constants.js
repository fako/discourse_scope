import axios from 'axios';

import injector from 'vue-inject';


injector.constant('axios', axios);

injector.constant('apiRoot', process.env.VUE_APP_API_URL);
