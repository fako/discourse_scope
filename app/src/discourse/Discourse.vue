<template>
    <v-ons-page id="discourse">
        <v-ons-toolbar>
            <div class="left" @click="goBack()">
                <div class="back-chevron"></div>
                <h1 class="back-button">{{ discourse.title }}</h1>
            </div>
        </v-ons-toolbar>
        <h2 class="page-title">{{ $t("message.these_web_pages_best_fit_this_debate") }}</h2>
        <div class="filters">
            <ons-row>
                <ons-col class="search">
                    <v-ons-input class="input-search" placeholder="Search something"
                                 v-model="query" v-on:keyup.enter="search(query)" >
                    </v-ons-input>
                    <font-awesome-icon class="search-icon" icon="search" @click="search(query)"/>
                </ons-col>
            </ons-row>
        </div>
        <div class="results">
            <div class="header">
                <ons-row>
                    <ons-col width="55%">{{ $t("message.webpage_title") }}</ons-col>
                    <ons-col>{{ $t("message.webpage_source") }}</ons-col>
                    <ons-col>{{ $t("message.webpage_author") }}</ons-col>
                    <ons-col>{{ $t("message.webpage_argument_score") }}</ons-col>
                </ons-row>
            </div>
            <div class="row-wrapper" v-for="result in results" v-bind:key="result._id">
                <ons-row @click="openLink(result.url)">
                    <ons-col width="55%">{{ result.title }}</ons-col>
                    <ons-col>{{ result.source }}</ons-col>
                    <ons-col>{{ result.author }}</ons-col>
                    <ons-col>{{ result.argument_score }}</ons-col>
                </ons-row>
            </div>
        </div>
    </v-ons-page>
</template>

<script>

    export default {
        name: 'discourse',
        dependencies : ['$window', '$log', 'Discourses'],
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
            },
            openLink(url) {
                this.$window.open(url)
            },
            search(query) {
                let keywords = query.split(' ');
                let self = this;
                this.Discourses.scope(this.$route.params.name, this.$i18n.locale, keywords)
                    .then(function(results) {
                        self.results = results;
                    })
                    .catch(function(error) {
                        self.$log(error);
                    })
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

            height: 50px;
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

            .input-search {
                width: 90%;
                margin-left: 10px;
            }
        }
        .search-icon {
            width: 20px;
            height: 20px;
            margin: 5px;
            color: $gray;
            float: right;
        }

        .header {
            padding: 10px $page-margin;
            border: none;
            color: $gray;
        }

        .row-wrapper {
            padding: 20px $page-margin;
            border-top: 8px solid $gray-light;
        }
        .row-wrapper:hover {
            background: black;
            color: white;
        }
        div.results {
            background: white;
            margin-bottom: 100px;

            ons-col {
                margin-right: 30px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

    }

</style>
