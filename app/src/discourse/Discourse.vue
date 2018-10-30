<template>
    <v-ons-page id="discourse">
        <v-ons-toolbar>
            <div class="left" @click="goBack()">
                <div class="back-chevron"></div>
                <h1 class="back-button">{{ discourse.title }}</h1>
            </div>
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
        },
        methods: {
            goBack() {
                document.querySelector('ons-navigator').popPage();
            }
        }
    }

</script>

<style lang="scss" scoped>

    @import "../variables";

    .toolbar {
        background: black;

        h1 {
            color: white;
            vertical-align: middle;
        }
    }


    .back-chevron {
        display: inline-block;
        width: 45px;
        height: 45px;
        vertical-align: middle;
        border: 2px solid #FFFFFF;
        border-left: none;
        border-top: none;
        transform: rotate(135deg);
    }

</style>
