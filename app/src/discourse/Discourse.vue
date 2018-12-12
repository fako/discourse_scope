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
                    <v-ons-input class="input-search" v-bind:placeholder="$t('message.search_placeholder')"
                                 v-model="query" v-on:keyup.enter="search(query)" >
                    </v-ons-input>
                    <font-awesome-icon class="search-icon" icon="search" @click="search(query)"/>
                </ons-col>
            </ons-row>
            <ons-row class="content-filters" v-if="discourse.most_important_words && discourse.most_important_words.length">
                <ons-col width="400px">
                    <multi-select-drop-down :options="discourse.most_important_words" :title=" $t('message.select_words')"
                                            :onChange="wordsSelect"/>
                </ons-col>
            </ons-row>
            <ons-row class="metadata-filters">
                <ons-col width="200px" v-if="discourse.authors && discourse.authors.length">
                    <multi-select-drop-down :options="discourse.authors" :title=" $t('message.select_authors')"
                                            :onChange="authorSelect"/>
                </ons-col>
                <ons-col width="200px" v-if="discourse.sources && discourse.sources.length">
                    <multi-select-drop-down :options="discourse.sources" :title=" $t('message.select_sources')"
                                            :onChange="sourceSelect"/>
                </ons-col>
            </ons-row>
        </div>
        <div v-show="results.length" class="results">
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
        <div v-show="!results.length" class="no-results">
            <p>{{ $t("message.no_results") }}</p>
        </div>
    </v-ons-page>
</template>

<script>

    import _ from 'lodash';
    import MultiSelectDropDown from '../app/components/multi-select-drop-down';

    export default {
        components: {MultiSelectDropDown},
        name: 'discourse',
        dependencies : ['$window', '$log', 'Discourses'],
        data() {
            return {
                discourse: {},
                results: [],
                query: '',
                authors: null,
                keywords: []
            }
        },
        created() {
            this.discourse = this.Discourses.find(this.$route.params.id);
            let self = this;
            this.Discourses.get(this.$route.params.id, true)
                .then(function(discourse) {
                    self.discourse = discourse;
                    if(discourse.most_important_words) {
                        discourse.most_important_words = _.map(discourse.most_important_words, function(topicInfo) {
                            return (_.isArray(topicInfo)) ?topicInfo[0] : topicInfo;
                        });
                    }
                    self.$i18n.locale = discourse.language;
                })
                .catch(function(error) {
                    self.$log(error);
                });
            this.getResults()
        },
        methods: {
            goBack() {
                document.querySelector('ons-navigator').popPage();
            },
            openLink(url) {
                this.$log.customEvent('Research', 'open-link', url);
                this.$window.open(url)
            },
            getResults(useFilters) {
                let resultPromise = (useFilters) ?
                    this.Discourses.scope(this.$route.params.name, this.$i18n.locale,
                        this.keywords, this.authors, this.sources) :
                    this.Discourses.scope(this.$route.params.name, this.$i18n.locale);
                let self = this;
                resultPromise
                    .then(function(results) {
                        if(!results.length) {
                            let params = self.keywords.concat(self.authors);
                            let label = self.$route.params.name + ' + ' + params.join('&');
                            self.$log.customEvent('Research', 'no-results', label);
                        }
                        self.results = results;
                    })
                    .catch(function(error) {
                        self.$log(error);
                    })
            },
            search(query) {
                this.$log.customEvent('Research', 'search', query);
                this.keywords = query.toLowerCase().split(' ');
                this.getResults(true);
            },
            authorSelect(selection) {
                if(this.authors === null) {
                    this.authors = [];
                    return;
                }
                this.$log.customEvent('Research', 'author', selection.join(', '));
                this.authors = selection;
                this.getResults(true);
            },
            sourceSelect(selection) {
                if(this.sources === null) {
                    this.sources = [];
                    return;
                }
                this.$log.customEvent('Research', 'source', selection.join(', '));
                this.sources = selection;
                this.getResults(true);
            },
            wordsSelect(selection) {
                if(!selection.length) {
                    return;
                }
                this.search(selection.join(' '));
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

        .content-filters + .metadata-filters {
            margin-top: 20px;
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
            cursor: pointer;
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

        .no-results {
            text-align: center;
            margin-top: 20px;

            p {
                font-size: 16px;
            }
        }

    }

</style>
