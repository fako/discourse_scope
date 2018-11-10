<template>
    <v-ons-dialog v-bind:visible.sync="visible" cancelable>
        <v-ons-toolbar inline><div class="center">{{ $t("ppd.title") }}</div></v-ons-toolbar>
        <form v-on:submit="grant" action="#" method="post">
            <v-ons-list>
                <v-ons-list-item>
                    <p>{{ $t("ppd.description") }}</p>
                </v-ons-list-item>

                <v-ons-list-item>
                    <ons-row height="60px">
                        <ons-col width="30%" class="input-label">
                            <label for="topic">{{ $t("ppd.topic_label") }}:</label>
                        </ons-col>
                        <ons-col>
                            <v-ons-input input-id="topic" type="topic" name="topic" required v-model="topic">
                            </v-ons-input>
                        </ons-col>
                    </ons-row>
                </v-ons-list-item>
                <v-ons-list-item>
                    <ons-row height="60px">
                        <ons-col width="30%" class="input-label">
                            <label for="name">{{ $t("ppd.name_label") }}:</label>
                        </ons-col>
                        <ons-col>
                            <v-ons-input input-id="name" type="name" name="name" required v-model="name">
                            </v-ons-input>
                        </ons-col>
                    </ons-row>
                </v-ons-list-item>
                <v-ons-list-item>
                    <ons-row height="60px">
                        <ons-col width="30%" class="input-label">
                            <label for="email">{{ $t("ppd.email_label") }}:</label>
                        </ons-col>
                        <ons-col>
                            <v-ons-input input-id="email" type="email" name="email" required v-model="email">
                            </v-ons-input>
                        </ons-col>
                    </ons-row>
                </v-ons-list-item>
                <v-ons-list-item>
                    <ons-row>
                        <ons-col width="10%">
                            <v-ons-checkbox input-id="processingPermission" type="checkbox"
                                            name="processingPermission" required v-model="processingPermission">
                            </v-ons-checkbox>
                        </ons-col>
                        <ons-col>
                            <label for="processingPermission">{{ $t("ppd.permission_checkbox_text") }}</label>
                        </ons-col>
                    </ons-row>
                </v-ons-list-item>
                <v-ons-list-item>
                    <ons-row class="buttons">
                        <ons-col>
                            <input type="submit" class="button" :value="$t('ppd.ok_label')">
                        </ons-col>
                        <ons-col>
                            <v-ons-button v-on:click="cancel">{{ $t("ppd.cancel_label") }}</v-ons-button>
                        </ons-col>
                    </ons-row>
                </v-ons-list-item>
            </v-ons-list>
        </form>
    </v-ons-dialog>
</template>

<script>

    export default {
        name: 'personal-permissions-dialogue',
        dependencies: ['$promise', 'Storage'],
        data () {
            return {
                visible: false,
                topic: this.Storage.get('topic', null),
                name: this.Storage.get('name', null),
                email: this.Storage.get('email', null),
                processingPermission: this.Storage.get('processingPermission', false),
                permissions: Promise,
                deferred: {},
                empty: {
                    topic: null,
                    name: null,
                    email: null,
                    processingPermission: false
                }
            }
        },
        watch: {
            topic(value) {
                this.Storage.set('topic', value);
            },
            name(value) {
                this.Storage.set('name', value);
            },
            email(value) {
                this.Storage.set('email', value);
            },
            processingPermission(value) {
                this.Storage.set('processingPermission', value);
            }
        },
        methods: {
            set(info) {
                this.topic = info.topic;
                this.name = info.name;
                this.email = info.email;
                this.processingPermission = info.processingPermission;
            },
            grant(event) {
                event.preventDefault();
                this.resolve();
                this.visible = false;
            },
            cancel() {
                this.set(this.empty);
                this.deferred.reject();
                this.visible = false;
            },
            ask() {
                let self = this;
                this.permissions = new this.$promise(function(resolve, reject) {

                    self.deferred.resolve = resolve;
                    self.deferred.reject = reject;
                    self.visible = true;

                });
                return this.permissions;
            },
            resolve() {
                this.deferred.resolve({
                    topic: this.topic,
                    name: this.name,
                    email: this.email,
                    processing_permission: this.processingPermission
                });
            }
        }
    }

</script>

<style lang="scss">

    @import "../../variables";

    .dialog {
        max-width: 350px;

        .toolbar {
            height: 64px;
            line-height: 64px;
            padding: 0;
        }

        .toolbar__left, .toolbar__center, .toolbar__right {
            line-height: 64px;
        }

        :checked + .checkbox__checkmark:before {
            background-color: $orange;
        }

    }

    .input-label {
        line-height: 31px;
    }

    .buttons {
        ons-col {
            padding: 3px;
        }
        .button {
            width: 100%;
        }
    }

    .checkbox {
        line-height: 40px;

        .checkbox__checkmark {
            vertical-align: middle;
        }
    }

    .list .button {
        text-align: center;
    }

    ons-input {
        width: 100%
    }

</style>
