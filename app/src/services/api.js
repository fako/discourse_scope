import _ from 'lodash'
let Url = require('url-parse');

import injector from 'vue-inject';


class Discourses {

    constructor($window, $promise, $log, axios, apiRoot) {
        this.$window = $window;
        this.$promise = $promise;
        this.axios = axios;
        this.apiRoot = apiRoot;
        this.discourses = null;
        this.details = {};
        this.loading = {};
    }

    _getUrl() {
        return this.apiRoot + 'discourse-search/' + Array.prototype.slice.call(arguments).join('/') + '/';
    }

    startLoading() {
        let event = new CustomEvent('api-loading');
        this.$window.dispatchEvent(event);
    }

    stopLoading() {
        let event = new CustomEvent('api-done');
        this.$window.dispatchEvent(event);
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

    scope(name, language, keywords, authors) {

        if(this.loading['scope']) {
            return this.loading['scope'];
        }

        keywords = keywords || [];
        authors = authors || [];
        let url = this._getUrl('service', name);
        url += '?language=' + language;
        let postData = {
            action: 'scope',
            config: {
                'keywords': keywords,
                'author': authors.join('|')
            }
        };
        let self = this;

        function formatResults(result) {
            let url = new Url(result['url']);
            let hostname = url.hostname;
            result.source =  (!hostname.startsWith('www.')) ? hostname : hostname.replace('www.', '');
            result.argument_score = _.round(result.argument_score, 3);
            return result
        }

        this.startLoading();
        this.loading.scope = (!keywords.length && !authors.length) ?
            this.axios.get(url).then(function handleResponse(response) {
                return _.map(response.data.results, formatResults);
            }) :
            this.axios.post(url, postData).then(function handleResponse(response) {
                return _.map(response.data.results, formatResults);
            });

        return this.loading.scope.finally(function() {
            delete self.loading.scope;
            self.stopLoading();
        });
    }

    isLoading() {
        let calls = [];
        _.forEach(this.loading, function(promise, call) {
            calls.push(call);
        });
        return (calls.length) ? calls : null;
    }
}

injector.service('Discourses', ['$window', '$promise', '$log', 'axios', 'apiRoot'], Discourses);
