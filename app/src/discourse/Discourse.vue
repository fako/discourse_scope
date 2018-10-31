<template>
    <v-ons-page id="discourse">
        <v-ons-toolbar>
            <div class="left" @click="goBack()">
                <div class="back-chevron"></div>
                <h1 class="back-button">{{ discourse.title }}</h1>
            </div>
        </v-ons-toolbar>
        <h2 class="page-title">{{ $t("message.these_web_pages_best_fit_your_exploration") }}</h2>
        <div class="filters">
            <ons-row>
                <ons-col>
                    <v-ons-input class="search" placeholder="Search something" v-model="query"></v-ons-input>
                </ons-col>
            </ons-row>
            <ons-row>
                <ons-col>
                    Source
                </ons-col>
                <ons-col>
                    Author
                </ons-col>
                <ons-col>
                    Argument coefficient
                </ons-col>
            </ons-row>
        </div>
        <div class="results">
            <div class="row-wrapper">
                <ons-row class="header">
                    <ons-col width="40%">{{ $t("message.webpage_title") }}</ons-col>
                    <ons-col>{{ $t("message.webpage_source") }}</ons-col>
                    <ons-col>{{ $t("message.webpage_author") }}</ons-col>
                    <ons-col>{{ $t("message.webpage_argument_score") }}</ons-col>
                    <ons-col></ons-col>
                </ons-row>
            </div>
            <div class="row-wrapper" v-for="result in results" v-bind:key="result._id">
                <ons-row>
                    <ons-col width="40%">{{ result.title }}</ons-col>
                    <ons-col>{{ result.source }}</ons-col>
                    <ons-col>{{ result.author }}</ons-col>
                    <ons-col>{{ result.argument_score }}</ons-col>
                    <ons-col>AND ACTION!</ons-col>
                </ons-row>
            </div>
        </div>
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
                discourse: {},
                results: [],
                query: ''
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
            this.Discourses.scope(this.$route.params.name, this.$i18n.locale)
                .then(function(results) {
                    self.results = results;
                })
                .catch(function(error) {
                    self.$log(error);
                })
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

        .left {
            margin-left: -45px;
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

    .page__content {

        h2.page-title {
            margin: 0 $page-margin;
            height: 150px;

            line-height: 150px;
            font-size: 24px;
        }

        .filters {

            height: 150px;
            background: white;

            ons-row {
                padding: 0 $page-margin
            }
        }

        .search {
            margin: -24px 0 25px;
            display: block;
            background: white;
            border: 1px solid $gray;
            padding: 5px;
        }

        .row-wrapper:first-child {
            padding: 10px $page-margin;
            border: none;

        }
        .row-wrapper {
            padding: 20px $page-margin;
            border-top: 8px solid $gray-light;
        }
        div.results {
            background: white;

            ons-col {
                margin-right: 30px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

    }

</style>
