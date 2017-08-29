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

    }
};
</script>

<style>
    div.row {
        margin: 0px;
        line-height: 1px;
    }
</style>