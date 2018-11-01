<template>
    <div id="api-loader" v-show="loading" :style="{height: height + 'px'}">
        <div class="icon-wrapper" :style="{'margin-top': height / 2 - 25 + 'px'}">
            <font-awesome-icon v-if="loading" icon="spinner" spin width="50px" height="50px"/>
        </div>
    </div>
</template>

<script>

    import _ from 'lodash';

    export default {
        name: 'api-loader',
        dependencies: ['$window'],
        data() {
            return {
                height: 0,
                loading: false
            }
        },
        mounted () {
            this.$window.addEventListener('resize', _.debounce(this.handleResize, 100));
            this.handleResize();
            let self = this;
            this.$window.addEventListener('api-loading', function () { self.loading = true }, false);
            this.$window.addEventListener('api-done', function () { self.loading = false }, false);
        },
        methods: {
            handleResize () {
                this.height = this.$window.innerHeight - 150;
            }
        }
    }

</script>

<style lang="scss">

    #api-loader {
        position: absolute;
        top: 150px;
        left: 0;
        width: 100%;
        z-index: 1000;

        background: white;
        opacity: .8;
    }

    .icon-wrapper {
        width: 50px;
        height: 50px;
        margin: 0 auto;

        .svg-inline--fa.fa-w-16 {
            width: 100%;
            height: 100%;
        }
    }

</style>
