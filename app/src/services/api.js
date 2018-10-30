import _ from 'lodash'
let Url = require('url-parse');

import injector from 'vue-inject';


class Discourses {

    constructor($promise, $log, axios, apiRoot) {
        this.$promise = $promise;
        this.axios = axios;
        this.apiRoot = apiRoot;
        this.discourses = null;
        this.details = {};
    }

    _getUrl() {
        return this.apiRoot + 'discourse-search/' + Array.prototype.slice.call(arguments).join('/') + '/';
    }

    byLanguage() {
        if(this.discourses) {
            return this.$promise.resolve(this.discourses);
        }
        let url = this._getUrl('discourses');
        let self = this;
        return this.axios.get(url).then(function(response) {
            self.discourses = response.data;
            return response.data;
        });
    }

    find(id) {
        let result = {};
        _.forEach(this.discourses, function(discourses) {
            _.forEach(discourses, function(discourse) {
                if(discourse.id === id) {
                    result = discourse;
                }
            });
        });
        return result;
    }

    get(id, details) {
        details = details || false;
        if(this.details[id]) {
            return this.$promise.resolve(this.details[id]);
        } else if (!details) {
            let result = this.find(id);
            if(result) {
                return this.$promise.resolve(result);
            }
        }
        let url = this._getUrl('discourses', id);
        let self = this;
        return this.axios.get(url).then(function(response) {
            self.details[response.data.id] = response.data;
            return response.data;
        });
    }

    scope(name, language) {
        let url = this._getUrl('service', name);
        url += '?language=' + language;
        return this.axios.get(url).then(function(response) {
            return _.map(response.data.results, function(result) {
                let url = new Url(result['url']);
                result.source = url.hostname;
                result.argument_score = _.round(result.argument_score, 3);
                return result
            });
        });
    }
}

injector.service('Discourses', ['$promise', '$log', 'axios', 'apiRoot'], Discourses);
