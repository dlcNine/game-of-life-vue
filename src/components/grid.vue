<template>
    <div class="grid">
        <row 
            v-for="(rows, index) in this.rows"
            v-bind:key="index"
            v-bind:index="index"
        />
        <p>grid-props-rows: {{rows}}</p>
        <p>grid-props-columns: {{columns}}</p>
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