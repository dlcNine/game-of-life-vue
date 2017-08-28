<template>
    <div class="row">
        <cell v-for="(cell, index) in numCells" key="index" />
    </div>
</template>

<script>
import Cell from "./cell.vue";

export default {
    components: { Cell },
    data: function() {
        return {
            numCells: 10
        };
    },
    methods: {
        
    }
};
</script>

<style>

</style>