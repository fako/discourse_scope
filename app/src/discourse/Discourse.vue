<template>
    <v-ons-page id="discourse">
        <v-ons-toolbar>
            <div class="left">
                <v-ons-back-button>{{ discourse.title }}</v-ons-back-button>
            </div>
            <div class="center">{{ $t("message.discourse") }}</div>
        </v-ons-toolbar>
        <ul>
            <li v-for="word in discourse.most_important_words" v-bind:key="word">{{ word}}</li>
        </ul>
    </v-ons-page>
</template>

<script>

    export default {
        name: 'discourse',
        dependencies : ['$log', 'Discourses'],
        data() {
            return {
                discourse: {}
            }
        },
        created() {
            this.discourse = this.Discourses.find(this.$route.params.id);
            let self = this;
            this.Discourses.get(this.$route.params.id, true)
                .then(function(discourse) {
                    self.discourse = discourse;
                })
                .catch(function(error) {
                    self.$log(error);
                });
        }
    }

</script>

<style>

</style>
