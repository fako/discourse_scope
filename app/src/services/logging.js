import * as Sentry from '@sentry/browser';

import injector from 'vue-inject';


if (process.env.NODE_ENV === 'production') {

    let pkg = require('../../package.json');
    Sentry.init({
        dsn: 'https://407d0ac6dc4542c9a60fb299e32e464d@sentry.io/241870',
        release: pkg.version,
        attachStacktrace: true,
        integrations: [
            new Sentry.Integrations.GlobalHandlers({
                onerror: true,
                onunhandledrejection: true
            }),
            new Sentry.Integrations.Vue({})
        ],
    });

}


injector.decorator('$log', function($log) {

    /***************************
     * CUSTOM METHODS
     ***************************/

    $log.pageView = function(page) {
        $log.info('Visiting: ' + page);
    };

    $log.customEvent = function(category, action, label) {
        if(!label) {
            $log.info('Trigger: ' + category + ' => ' + action);
        } else {
            $log.info('Trigger: ' + category + ' (' + label + ') => ' + action);
        }
    };

    /***************************
     * PRODUCTION
     ***************************/

    // In non-production we do nothing special after adding custom methods
    if (process.env.NODE_ENV !== 'production') {
        return $log;
    }

    /***************************
     * GOOGLE ANALYTICS
     ***************************/

    $log._pageView = $log.pageView;
    $log._customEvent = $log.customEvent;

    $log.pageView = function(page) {
        window.ga('send', 'pageview', page);
        $log._pageView(page);
    };

    $log.customEvent = function(category, action, label) {
        window.ga('send', 'event', category, action, label);
        $log._customEvent(category, action, label);
    };

    /***************************
     * SENTRY
     ***************************/

    $log._warn = $log.warn;
    $log._error = $log.error;

    $log.warn = function(message, context) {
        if(context) {
            $log._warn(message, context);
            Sentry.captureEvent({
                message: message,
                level: 'warning',
                extra: context
            })
        } else {
            $log._warn(message);
            Sentry.captureEvent({
                message: message,
                level: 'warning',
            })
        }
    };

    $log.error = function(message, context) {
        if(context) {
            $log._error(message, context);
            Sentry.captureEvent({
                message: message,
                level: 'error',
                extra: context
            })
        } else {
            $log._error(message);
            Sentry.captureEvent({
                message: message,
                level: 'error'
            });
        }
    };

    return $log;

});
