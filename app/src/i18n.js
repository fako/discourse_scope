import Vue from 'vue'
import VueI18n from 'vue-i18n'


Vue.use(VueI18n);


const messages = {
    en: {
        message: {
            home: 'home',
            go_to_debate: 'go to debate',
            debate: 'debate',
            back: 'back'
        }
    },
    nl: {
        message: {
            home: 'home',
            go_to_debate: 'ga naar het debat',
            debate: 'debat',
            back: 'terug'
        }
    }
};


const i18n = new VueI18n({
    locale: 'en',
    messages
});


export default i18n;
