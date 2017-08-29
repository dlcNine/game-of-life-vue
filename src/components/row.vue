<template>
    <div class="row">
        <cell 
            v-for="(cell, index) in columns"
            v-bind:key="index"
            v-bind:index="index"
        />
        <button v-on:click.prevent="FlipFirstChild">Flip first child</button>
        <button v-on:click.prevent="GetArrayOfCells">Get Array of Cells</button>
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
        },

        FlipFirstChild: function() {
            this.$children[0].FlipIsAlive();
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