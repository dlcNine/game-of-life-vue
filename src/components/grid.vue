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
    props: ["rows", "columns", "xWrappingOn", "yWrappingOn"],
    data: function() {
        return {
        };
    },
    methods: {
        GetArrayOfRows: function() {
            return this.$children;
        },
        GetNumAliveNeighbors(cellRow, cellColumn){
            let numAliveNeighbors = 0;

            for (let rowAdjust = -1; rowAdjust < 2; rowAdjust++) {
                for (let columnAdjust = -1; columnAdjust < 2;columnAdjust++) {
                    
                    let neighborCoords = [
                        cellRow + rowAdjust,
                        cellColumn + columnAdjust
                    ];

                    if (neighborCoords[0] === cellRow && neighborCoords[1] === cellColumn) {
                        continue;
                    }
                    else {
                        
                        // check if row is out of bounds of array
                        if (this.yWrappingOn) {
                            if (neighborCoords[0] < 0)
                                neighborCoords[0] = this.GetArrayOfRows().length - 1;
                            else if (neighborCoords[0] > this.GetArrayOfRows().length - 1)
                                neighborCoords[0] = 0;
                        }
                        else {
                            if (neighborCoords[0] < 0 || neighborCoords[0] > this.GetArrayOfRows().length - 1)
                                continue;
                        }

                        let currentRow = this.GetArrayOfRows()[neighborCoords[0]];

                        let currentCell = currentRow.GetArrayOfCells()[neighborCoords[1]];

                        // TODO: enable wrap around behaior here
                        if (currentCell === undefined) {
                            continue;
                        }

                        if (currentCell.isAlive)
                            numAliveNeighbors++;
                    }
                }
            }
            return numAliveNeighbors;
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