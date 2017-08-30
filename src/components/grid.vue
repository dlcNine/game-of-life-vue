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
        CheckYWrapping: function(rowNumber) {
            if (this.yWrappingOn) {
                if (rowNumber < 0)
                    return this.GetArrayOfRows().length - 1;
                else if (rowNumber > this.GetArrayOfRows().length - 1)
                    return 0;
                else
                    return rowNumber;
            }
            else {
                if (rowNumber < 0 || rowNumber > this.GetArrayOfRows().length - 1)
                    return -1;
                else
                    return rowNumber;
            }
        },
        CheckXWrapping: function(columnNumber, currentRow) {
            let arrayOfCells = currentRow.GetArrayOfCells();

            if (this.xWrappingOn) {
                if (columnNumber < 0)
                    return arrayOfCells.length - 1;
                else if (columnNumber > arrayOfCells.length - 1)
                    return 0;
                else 
                    return columnNumber;
            }
            else {
                if (columnNumber < 0 || columnNumber > arrayOfCells.length - 1)
                    return -1;
                else 
                    return columnNumber;
            }
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

                        neighborCoords[0] = this.CheckYWrapping(neighborCoords[0]);

                        if (neighborCoords[0] === -1)
                            continue;

                        let currentRow = this.GetArrayOfRows()[neighborCoords[0]];

                        neighborCoords[1] = this.CheckXWrapping(neighborCoords[1], currentRow);
                        if (neighborCoords[1] === -1)
                            continue;

                        let currentCell = currentRow.GetArrayOfCells()[neighborCoords[1]];

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