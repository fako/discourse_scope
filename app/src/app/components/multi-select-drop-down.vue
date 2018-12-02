<template>
    <div class="multi-select-drop-down" :class="{'has-selection': selection.length}">
        <v-select multiple :onChange="onChange" :options="getOptions()" :value="selection"
                  >
            <template slot="option" slot-scope="option">
                <div @click="optionClick">{{ option.label }}</div>
            </template>
        </v-select>
        <div @click="toggleDropDown" class="title">{{ title }}</div>
    </div>
</template>

<script>

    import _ from 'lodash';

    export default {
        name: 'multi-select-drop-down',
        props: {
            options: Array,
            title: String,
            onChange: Function
        },
        data() {
            return {
                selection: []
            }
        },
        methods: {
            getSelectElement() {
                return this.$children[0];
            },
            getOptions() {
                let nonSelected = _.difference(this.options, this.selection);
                return _.concat(this.selection, nonSelected);
            },
            optionClick(event) {
                let label = event.target.textContent;
                if(this.selection.indexOf(label) >= 0) {
                    let select = this.getSelectElement();
                    select.deselect(label);
                }
            },
            toggleDropDown() {
                let select = this.getSelectElement();
                if (!select.disabled) {
                    select.open = true;
                    select.$refs.search.focus()
                }
            }
        }
    }

</script>

<style lang="scss">

    @import "../../variables";

    .multi-select-drop-down {
        position: relative;
        margin-right: 20px;

        .v-select.searchable .dropdown-toggle {
            border-left: none;
            border-right: none;
            border-radius: 0;
        }

        &.has-selection .v-select.searchable .dropdown-toggle {
            border-bottom: 2px solid $orange;
        }

        .v-select .selected-tag {
            display: none;
        }
        .title {
            position: absolute;
            left: 10px;
            top: 9px;
            color: gray;
        }
        .v-select.open + .title {
            display: none;
        }
    }
</style>
