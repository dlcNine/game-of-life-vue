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
                for (let columnAdjust = -1; columnAdjust < 2;columnAdjust++) {
                    
                    let neighborCoords = [
                        cellRow + rowAdjust,
                        cellColumn + columnAdjust
                    ];

                    if (neighborCoords[0] === cellRow && neighborCoords[1] === cellColumn) {
                        continue;
                    }
                    else {
                        
                        let currentRow = this.GetArrayOfRows()[neighborCoords[0]];

                        // TODO: enable wrap around behavior here
                        if (currentRow === undefined) {
                            continue;
                        }

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