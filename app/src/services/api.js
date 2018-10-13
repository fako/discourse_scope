import injector from 'vue-inject';


class Api {
    constructor($log, axios, apiRoot) {
        this.axios = axios;
        this.apiRoot = apiRoot;
        $log(apiRoot);
    }
}

injector.service('Api', ['$log', 'axios', 'apiRoot'], Api);
