<template>
    <div class="row">
        <cell 
            v-for="(cell, index) in numCells" 
            v-bind:key="index"
            v-bind:index="index"
        />
    </div>
</template>

<script>
import Cell from "./cell.vue";

export default {
    components: { Cell },
    data: function() {
        return {
            numCells: 25
        };
    },
    methods: {

    }
};
</script>

<style>
    div.row {
        margin: 0px;
        line-height: 1px;
    }
</style>