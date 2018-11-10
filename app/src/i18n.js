import Vue from 'vue'
import VueI18n from 'vue-i18n'


Vue.use(VueI18n);


const messages = {
    en: {
        message: {
            app_title: 'Discourse Scope',
            explore_which_discourse: 'Which discourse would you like to research?',
            add_discourse: 'Add a discourse',
            start_research: 'Start research',
            these_web_pages_best_fit_this_debate: 'These web pages best fit this debate',
            search_placeholder: 'Search something',
            webpage_title: 'Title',
            webpage_source: 'Source',
            webpage_author: 'Author',
            webpage_argument_score: 'Opinion score',
            select_authors: 'Select authors',
            no_results: 'No results. Try broadening your exploration by selecting less items.'
        }
    },
    nl: {
        message: {
            app_title: 'Debat Kijker',
            explore_which_discourse: 'Welk debat wil je onderzoeken?',
            add_discourse: 'Voeg een debat toe',
            start_research: 'Start onderzoek',
            these_web_pages_best_fit_this_debate: 'Deze webpaginas passen het beste bij dit debat',
            search_placeholder: 'Zoek naar iets',
            webpage_title: 'Titel',
            webpage_source: 'Bron',
            webpage_author: 'Auteur',
            webpage_argument_score: 'Opinie score',
            select_authors: 'Selecteer auteurs',
            no_results: 'Geen resultaten. Probeer je exploratie te verbreden door minder te selecteren.'
        }
    }
};


const i18n = new VueI18n({
    locale: 'en',
    messages
});


export default i18n;
