import _ from 'lodash'
let Url = require('url-parse');

import injector from 'vue-inject';


class Discourses {

    constructor($window, $promise, $log, axios, apiRoot, utm) {
        this.$window = $window;
        this.$promise = $promise;
        this.$log = $log;
        this.axios = axios;
        this.apiRoot = apiRoot;
        this.utm = utm;
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
        return this.axios.get(url)
            .then(function(response) {
                self.details[response.data.id] = response.data;
                return response.data;
            })
            .catch(function(error) {
                self.$log.error('Error getting discourse details', error);
            });
    }

    scope(name, language, keywords, authors, sources) {

        if(this.loading['scope']) {
            return this.loading['scope'];
        }

        keywords = keywords || [];
        authors = authors || [];
        sources = sources || [];
        let url = this._getUrl('search', name);
        url += '?language=' + language;
        let postData = {
            action: 'scope',
            config: {
                'keywords': keywords,
                'author': authors.join('|'),
                'source': sources.join('|')
            }
        };
        let self = this;

        function formatResults(result) {
            let url = new Url(result['url']);
            let hostname = url.hostname;
            result.source =  (!hostname.startsWith('www.')) ? hostname : hostname.replace('www.', '');
            result.argument_score = (_.isNumber(result.argument_score)) ? _.round(result.argument_score, 3) : 0;
            return result
        }

        this.startLoading();
        this.loading.scope = (!keywords.length && !authors.length && !sources.length) ?
            this.axios.get(url) : this.axios.post(url, postData);

        return this.loading.scope
            .then(function handleResponse(response) {
                return _.map(response.data.results, formatResults);
            })
            .catch(function(error) {
                self.$log.error('Error getting scope', error);
            })
            .finally(function() {
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

    order(data) {

        data = data || {};
        let self = this;
        let url = this._getUrl('order');
        delete data.processing_permission;
        if(this.utm.campaign) {
            data.name += " (" + this.utm.campaign + ")"
        }

        return this.axios.post(url, data)
            .then(function() {
                self.$log.customEvent('Order', 'done');
            })
            .catch(function(error) {
                self.$log.error('Failed to push order', error);
                self.$log.customEvent('Order', 'fail');
            });
    }
}

injector.service('Discourses', ['$window', '$promise', '$log', 'axios', 'apiRoot', 'utm'], Discourses);
