import Vue from 'vue'
import VueI18n from 'vue-i18n'


Vue.use(VueI18n);


const messages = {
    en: {
        message: {
            app_title: 'Discourse Scope',
            explore_which_discourse: 'Which discourse would you like to research?',
            add_discourse: 'Add a discourse',
            thank_you_contact: 'Thank you for getting in touch. We\'ll respond shortly.',
            start_research: 'Start research',
            these_web_pages_best_fit_this_debate: 'These web pages best fit this debate',
            search_placeholder: 'Search something',
            webpage_title: 'Title',
            webpage_source: 'Source',
            webpage_author: 'Author',
            webpage_argument_score: 'Opinion score',
            select_authors: 'Select authors',
            no_results: 'No results. Try broadening your exploration by selecting less items.'
        },
        ppd: {  // personal permissions dialogue
            title: 'Let\'s talk',
            description: 'If you write down the debate topic that interests you and leave your email address. Then I can help you to add that debate or do it for you.',
            topic_label: 'Topic',
            name_label: 'Name',
            email_label: 'Email',
            permission_checkbox_text: 'I agree to be contacted once through my email address.',
            ok_label: 'Ok',
            cancel_label: 'Cancel',

        }
    },
    nl: {
        message: {
            app_title: 'Debat Kijker',
            explore_which_discourse: 'Welk debat wil je onderzoeken?',
            add_discourse: 'Voeg een debat toe',
            thank_you_contact: 'Bedankt voor het contact opnemen. We zullen spoedig reageren.',
            start_research: 'Start onderzoek',
            these_web_pages_best_fit_this_debate: 'Deze webpaginas passen het beste bij dit debat',
            search_placeholder: 'Zoek naar iets',
            webpage_title: 'Titel',
            webpage_source: 'Bron',
            webpage_author: 'Auteur',
            webpage_argument_score: 'Opinie score',
            select_authors: 'Selecteer auteurs',
            no_results: 'Geen resultaten. Probeer je exploratie te verbreden door minder te selecteren.'
        },
        ppd: {  // personal permissions dialogue
            title: 'Keertje babbelen',
            description: 'Als je het debat onderwerp en een email adres achterlaat dan kan ik helpen het debat toe te voegen of het voor je doen.',
            topic_label: 'Onderwerp',
            name_label: 'Naam',
            email_label: 'Email',
            permission_checkbox_text: 'Ik stem in met eenmalig contact opnemen via mijn emailadres.',
            ok_label: 'Ok',
            cancel_label: 'Annuleren'
        }
    }
};


const i18n = new VueI18n({
    locale: 'en',
    messages
});


export default i18n;
