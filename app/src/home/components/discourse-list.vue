<template>
    <div class="discourse-list">
        <ons-row v-for="(row, index) in discourses[$i18n.locale]" v-bind:key="index">
            <ons-col v-for="discourse in row" v-bind:key="discourse.id">
                <div class="discourse" v-on:click="goToDiscourse(discourse)">
                    <div>
                        <img v-bind:src="'images/icon-' + discourse.id % 8 + '.svg'"/>
                    </div>
                    <div class="info-box">
                        <h2>{{ discourse.title }}</h2>
                        <p>{{ discourse.description }}</p>
                    </div>
                    <div class="button-box">
                        <ons-button>{{ $t("message.start_research") }}</ons-button>
                    </div>
                </div>
            </ons-col>
        </ons-row>
    </div>
</template>

<script>

    import _ from 'lodash';

    export default {
        name: 'discourse-list',
        dependencies : ['$log', 'Discourses'],
        data() {
            return {
                discourses: {}
            }
        },
        created() {
            let self = this;
            this.Discourses.byLanguage()
                .then(function(byLanguage) {
                    self.discourses = {};
                    _.forEach(byLanguage, function(discourses, language) {
                        self.discourses[language] = _.chunk(discourses, 3)
                    });
                })
                .catch(function(error) {
                    self.$log(error);
                });
        },
        methods: {
            goToDiscourse(discourse) {
                this.$router.push({
                    name: 'discourse',
                    params: {
                        id: discourse.id
                    }
                })
            }
        }
    }

</script>

<style lang="scss" scoped>

    $discourse-box-size: 300px;

    .discourse-list {
        max-width: 920px;
        margin: 0 auto;
    }

    ons-row {
        margin-top: 100px;
    }

    .discourse {
        position: relative;
        width: $discourse-box-size;
        height: $discourse-box-size;
        margin: 0 auto;

        text-align: center;
        background: white;

        img {
            width: 130px;
            margin-top: -50px;
        }

        .info-box {
            position: absolute;
            bottom: 0;
            padding: 20px;
        }
        .button-box {
            line-height: $discourse-box-size;
            display: none;
        }

        .button:active {
            background: white;
            opacity: 1;
        }
    }

    .discourse:hover {
        img {
            display: none;
        }
        .info-box {
            display: none
        }
        .button-box {
            display: inline-block;
        }
        background: black;
    }

</style>
