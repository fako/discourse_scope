import _ from 'lodash';

import injector from 'vue-inject';


class Storage {

    constructor() {
        this.storage = {};
    }

    set(name, value) {
        this.storage[name] = value;
    }

    get(name, def) {
        let value = this.storage[name];
        return _.isUndefined(value) ? def : value;
    }

}

injector.service('Storage', [], Storage);
