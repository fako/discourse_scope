<template>
    <ons-row id="desktop-guard" align="center" v-show="visible">
        <ons-col>
            <h2>{{ $t('desktopGuard.header', { msg: 'hello' }) }}</h2>
            <p>
                {{ $t('desktopGuard.message') }}
                {{ $t('desktopGuard.screenRequirement', { minimalWidth, minimalHeight}) }}
                {{ $t('desktopGuard.screenActual', { innerWidth: $window.innerWidth, innerHeight: $window.innerHeight }) }}
            </p>
        </ons-col>
    </ons-row>
</template>

<script>

    import _ from 'lodash';

    export default {
        name: 'desktop-guard',
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

<style lang="scss">

    #desktop-guard {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;

        background: white;
        text-align: center;

        h2, p {
            margin: 0 auto;
            padding: 5px 20px;
            max-width: 450px;
            font-weight: 400;
        }

        p {
            font-size: 17px;
            line-height: 25px;
        }
    }

</style>
