<template>
    <v-ons-page id="home">
        <v-ons-toolbar>
            <div class="center">{{ $t("message.home") }}</div>
            <div class="right">
                <select title="switchLanguage" v-model="$i18n.locale">
                    <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
                </select>
            </div>
        </v-ons-toolbar>
        <div><router-link :to="{name: 'debate'}">{{ $t("message.go_to_debate") }}</router-link></div>
    </v-ons-page>
</template>

<script>

    export default {
        name: 'home',
        dependencies : ['Api'],
        components: {},
        data() {
            return {
                langs: ['en', 'nl']
            }
        }
    }

</script>

<style>

</style>
