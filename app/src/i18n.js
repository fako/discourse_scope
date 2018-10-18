import Vue from 'vue'
import VueI18n from 'vue-i18n'


Vue.use(VueI18n);


const messages = {
    en: {
        message: {
            explore_which_discourse: 'Which discourse would you like to research?',
            add_discourse: 'Add a discourse',
            go_to_discourse: 'go to discourse',
            discourse: 'discourse',
            back: 'back'
        }
    },
    nl: {
        message: {
            explore_which_discourse: 'Welk debat wil je onderzoeken?',
            add_discourse: 'Voeg een debat toe',
            go_to_discourse: 'ga naar het debat',
            discourse: 'debat',
            back: 'terug'
        }
    }
};


const i18n = new VueI18n({
    locale: 'en',
    messages
});


export default i18n;
