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
        GetArrayOfRows: function() {
            // console.log(this.$children);
            return this.$children;
        },
        GetNumAliveNeighbors(cellRow, cellColumn){
            let numAliveNeighbors = 0;

            for (let rowAdjust = -1; rowAdjust < 2; rowAdjust++) {
                
            }
            // check row above

            // check current row

            // check row below

        }
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