<template>
    <div class="grid">
        <row 
            v-for="(rows, index) in numRows" 
            v-bind:key="index"
            v-bind:index="index"
        />
    </div>
</template>

<script>
import Row from "./row.vue";

export default {
    components: { Row },
    data: function() {
        return {
            numRows: 25
        };
    },
    methods: {

    }
};
</script>

<style>
    div.grid {
        margin: auto;
    }
</style>