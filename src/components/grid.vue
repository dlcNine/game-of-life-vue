<template>
    <div class="grid">
        <row 
            v-for="(row, index) in rows"
            v-bind:key="index"
            v-bind:index="index"
            v-bind:columns="columns"
        />
    </div>
</template>

<script>
import Row from "./row.vue";

export default {
    components: { Row },
    props: ["rows", "columns"],
    data: function() {
        return {
        };
    },
    methods: {

    },
    computed: {

    }
};
</script>

<style>
    div.grid {
        margin: auto;
    }
</style>