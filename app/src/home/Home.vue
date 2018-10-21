<template>
    <v-ons-page id="home">

        <v-ons-toolbar>
            <div class="left"><h1>{{ $t("message.explore_which_discourse") }}</h1></div>
            <div class="center"></div>
            <div class="right">
                <ons-button>{{ $t("message.add_discourse") }}</ons-button>
                <ons-select>
                    <select title="switchLanguage" v-model="$i18n.locale">
                        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
                    </select>
                </ons-select>
            </div>
        </v-ons-toolbar>

        <discourse-list/>

    </v-ons-page>
</template>

<script>

    import DiscourseList from './components/discourse-list'

    export default {
        name: 'home',
        dependencies : ['Api'],
        components: {DiscourseList},
        data() {
            return {
                langs: ['en', 'nl']
            }
        }
    }

</script>

<style>

</style>
