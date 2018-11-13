<template>
    <v-ons-page id="home">

        <v-ons-toolbar>
            <div class="left"><h1>{{ $t("message.explore_which_discourse") }}</h1></div>
            <div class="center"></div>
            <div class="right">
                <ons-button @click="addDiscourse">{{ $t("message.add_discourse") }}</ons-button>
                <ons-select>
                    <select title="switchLanguage" v-model="$i18n.locale">
                        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
                    </select>
                </ons-select>
            </div>
        </v-ons-toolbar>

        <discourse-list/>

        <personal-permissions-dialogue ref="personalPermissions"/>

    </v-ons-page>
</template>

<script>

    import DiscourseList from './components/discourse-list';
    import PersonalPermissionsDialogue from './components/personal-permissions-dialogue';

    export default {
        name: 'home',
        dependencies: ['$log', 'Discourses'],
        components: {DiscourseList, PersonalPermissionsDialogue},
        data() {
            return {
                langs: ['en', 'nl']
            }
        },
        methods: {
            addDiscourse() {

                let self = this;

                self.$log.customEvent('Order', 'open');

                this.$refs.personalPermissions.ask()
                    .then(function(personalContext) {
                        self.Discourses.order(personalContext).then(function(){
                            self.$ons.notification.alert(self.$t("message.thank_you_contact"));
                        });
                    })
                    .catch(function(error) {
                        if(!error) {
                            self.$log.customEvent('Order', 'cancel');
                        } else {
                            self.$log.error('Order dialogue failed', error);
                            self.$log.customEvent('Order', 'fail');
                        }
                    });
            }
        }
    }

</script>

<style>

</style>
