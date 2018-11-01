<template>
    <div>
        <v-ons-navigator id="app" swipeable swipe-target-width="200px"
            :page-stack="pageStack"
            :pop-page="goBack"
        ></v-ons-navigator>
        <screen-size-guard/>
        <api-loader/>
    </div>
</template>

<script>

    import ScreenSizeGuard from "./components/screen-size-guard";
    import ApiLoader from './components/api-loader'

    export default {
        components: {ScreenSizeGuard, ApiLoader},
        name: 'app',

        data() {
            return {
                pageStack: []
            }
        },

        methods: {
            /* Override default pop behavior and delegate it to the router */
            goBack() {
                // Go to the parent route component
                this.$router.push({ name: this.$route.matched[this.$route.matched.length - 2].name });

                // this.$router.go(-1); // Could work but might be misleading in some situations
            }
        },

        created() {
            /* Define how routes should be mapped to the page stack.
             * This assumes all the routes contain VOnsPage components
             * and are provided in the 'default' view.
             * For nested named routes or routes that for some reason
             * should not be mapped in VOnsNavigator, filter them out here.
             */
            const mapRouteStack = route => this.pageStack = route.matched.map(m => m.components.default);

            /* Set initial pageStack depending on current
             * route instead of always pushing 'Home' page
             */
            mapRouteStack(this.$route);

            /* On route change, reset the pageStack to the next route */
            this.$router.beforeEach((to, from, next) => mapRouteStack(to) && next());
        }
    }

</script>

<style lang="scss">

    @import "../variables";

    * {
        box-sizing: border-box;
    }

    .toolbar+.page__background, .toolbar+.page__background+.page__content {
        top: $toolbar-height;
    }
    .page__background {
        background: $gray-light;
    }

    .toolbar {
        height: $toolbar-height;
        background: white;
        padding: 0 $page-margin;

        .select-input {
            vertical-align: middle;
            border-top: 1px solid black;
            border-bottom: 2px solid $orange;
            height: 50px;
        }

        h1 {
            margin: 0;
            font-size: $h1-font-size;
            font-weight: 400;
        }

        .button {
            margin-right: 40px;
        }
    }
    .toolbar__left, .toolbar__center, .toolbar__right {
        line-height: $toolbar-height;
    }
    .page__content {
        h1 {
            font-size: $h1-font-size;
            font-weight: 400;
        }

        h2 {
            font-size: 17px;
        }

        p {
            font-size: 12px;
        }
    }

    .button {
        color: black;
        border: 1px solid black;
        background: white;
        line-height: 40px;
    }

</style>
