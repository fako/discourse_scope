let Url = require('url-parse');
import _ from 'lodash'

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
            select_sources: 'Select sources',
            select_words: 'Select important words',
            select_people: 'Select important people',
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
            cancel_label: 'Cancel'
        },
        desktopGuard: {
            header: 'Desktop only',
            message: 'We\'re sorry but this application is desktop only for the moment. Please come back to the same address on a desktop.',
            screenRequirement: 'If you are working on a desktop make sure you screen is at least {minimalWidth} x {minimalHeight}.',
            screenActual: 'Currently your screen is only {innerWidth} x {innerHeight}.'
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
            select_sources: 'Selecteer bronnen',
            select_words: 'Selecteer belangrijke woorden',
            select_people: 'Selecteer belangrijke mensen',
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
        },
        desktopGuard: {
            header: 'Alleen voor desktop',
            message: 'Het spijt ons, maar deze applicatie is alleen geschikt voor de desktop op dit moment. Bezoek alsjeblieft hetzelfde adres op een desktop.',
            screenRequirement: 'Als je nu werkt op een desktop zorg dan dat je scherm minimaal {minimalWidth} x {minimalHeight} is.',
            screenActual: 'Momenteel is je scherm {innerWidth} x {innerHeight}.'
        }
    }
};


function getCurrentLanguage(languageDefault) {

    let languages = _.keys(messages);
    let language = languageDefault;

    // Check browser preference
    let locale = navigator.language;
    let browserLanguage = locale.split('-')[0];
    browserLanguage = browserLanguage.toLowerCase();
    if(browserLanguage && languages.indexOf(browserLanguage) >= 0) {
        language = browserLanguage;
    }

    // Override language with request language
    let url = new Url(window.location, true);
    let requestLanguage = url.query.lang;
    if(requestLanguage && languages.indexOf(requestLanguage) >= 0) {
        language = requestLanguage
    }

    return language;

}


const i18n = new VueI18n({
    locale: getCurrentLanguage('nl'),
    messages
});


export default i18n;
