import injector from 'vue-inject';


class Api {

    constructor($log, axios, apiRoot) {
        this.axios = axios;
        this.apiRoot = apiRoot;
        $log(apiRoot);
    }

    _getUrl() {
        return this.apiRoot + 'discourse-search/' + Array.prototype.slice.call(arguments).join('/') + '/';
    }

    listDiscourses() {
        let url = this._getUrl('discourses');
        return this.axios.get(url);
    }

}

injector.service('Api', ['$log', 'axios', 'apiRoot'], Api);
