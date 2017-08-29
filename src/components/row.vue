<template>
    <div class="row">
        <cell 
            v-for="(cell, index) in columns"
            v-bind:key="index"
            v-bind:index="index"
        />
    </div>
</template>

<script>
import Cell from "./cell.vue";

export default {
    components: { Cell },
    props: ["columns"],
    data: function() {
        return {
        };
    },
    methods: {
        GetArrayOfCells: function() {
            // console.log(this.$children);
            return this.$children;
        }
    }
};
</script>

<style>
    div.row {
        margin: 0px;
        line-height: 1px;
    }
</style>