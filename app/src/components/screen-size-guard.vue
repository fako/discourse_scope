<template>
    <ons-row id="screen-size-guard" align="center" v-show="visible">
        <ons-col>
            <h2>Screen to small</h2>
            <p>
                This application needs a screen that is at least {{ minimalWidth }} x {{ minimalHeight }}.
                Your screen is {{ $window.innerWidth }} x {{ $window.innerHeight }}.
                Please enlarge your screen.
                This message will disappear when your screen is big enough.
            </p>
        </ons-col>
    </ons-row>
</template>

<script>

    import _ from 'lodash';

    export default {
        name: 'screen-size-guard',
        dependencies: ['$window'],
        components: {},
        props: {
            minimalWidth: {
                type: Number,
                default: 1024
            },
            minimalHeight: {
                type: Number,
                default: 612
            }
        },
        data() {
            return {
                visible: false
            }
        },
        mounted () {
            this.$window.addEventListener('resize', _.debounce(this.handleResize, 100));
            this.handleResize();
        },
        methods: {
            handleResize () {
                this.visible = this.$window.innerWidth < this.minimalWidth ||
                    this.$window.innerHeight < this.minimalHeight;
            }
        }
    }

</script>

<style>

    #screen-size-guard {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;

        background: white;
        text-align: center;
    }

    h2, p {
        margin: 0 auto;
        padding: 5px 20px;
        max-width: 500px;
    }

</style>
