import Vue from 'vue'
import VueI18n from 'vue-i18n'


Vue.use(VueI18n);


const messages = {
    en: {
        message: {
            explore_which_discourse: 'Which discourse would you like to research?',
            add_discourse: 'Add a discourse',
            start_research: 'Start research',
            these_web_pages_best_fit_this_debate: 'These web pages best fit this debate',
            webpage_title: 'Title',
            webpage_source: 'Source',
            webpage_author: 'Author',
            webpage_argument_score: 'Opinion coefficient'
        }
    },
    nl: {
        message: {
            explore_which_discourse: 'Welk debat wil je onderzoeken?',
            add_discourse: 'Voeg een debat toe',
            start_research: 'Start onderzoek',
            these_web_pages_best_fit_this_debate: 'Deze webpaginas passen het beste bij dit debat',
            webpage_title: 'Titel',
            webpage_source: 'Bron',
            webpage_author: 'Auteur',
            webpage_argument_score: 'Opinie coefficient'
        }
    }
};


const i18n = new VueI18n({
    locale: 'en',
    messages
});


export default i18n;
