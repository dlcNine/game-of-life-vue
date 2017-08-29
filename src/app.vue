<template>
    <div>
        <h1>Game of Life</h1>
        <grid 
            v-bind:rows="numRows"
            v-bind:columns="numColumns"
        />
        <form>
            <input 
                type="number" 
                v-model.number="numRows"
                placeholder="rows"
                min="1"
                max="25"
            />
            <input 
                type="number" 
                v-model.number="numColumns" 
                placeholder="columns"
                min="1"
                max="25"
             />
            <button v-on:click.prevent="BuildNextGrid">Build Next Grid</button>
            <!-- <button>Pause</button> -->
            <button v-on:click.prevent="TestNumAliveNeighbors">Test Num Alive Neighbors</button>

        </form>
    </div>
</template>

<script>
import Grid from "./components/grid.vue";

export default {
    components: { Grid },
    data: function() {
        return {
            numRows: 3,
            numColumns: 3,
            nextGrid: []
        };
    },
    methods: {
        BuildNextGrid: function() {
            let arrayOfRows = this.$children[0].GetArrayOfRows();

            // iterate through each row
            for (let row = 0; row < arrayOfRows.length; row++) {
                let newRow = [];
                let arrayOfCells = arrayOfRows[row].GetArrayOfCells();

                for (let column = 0; column < arrayOfCells.length; column++) {
                    let currentCell = arrayOfCells[column];
                    let numAliveNeighbors = this.$children[0].GetNumAliveNeighbors(row, column);

                    // console.log(currentCell.isAlive);
                    // console.log(numAliveNeighbors);

                    let isGoingToLive = this.DetermineLiveOrDie(currentCell, numAliveNeighbors);

                    console.log("isGoingToLive : " + isGoingToLive);

                    // console.log(isGoingToLive);
                    // newRow.push(isGoingToLive);
                }
                // console.log(newRow);
                // this.nextGrid.push(newRow);
            }
            // console.log(this.nextGrid);
        },
        DetermineLiveOrDie: function(currentCell, numAliveNeighbors) {
            if (currentCell.isAlive) {
                if (numAliveNeighbors < 2 || numAliveNeighbors > 3) {
                    return false;
                }
                else if (numAliveNeighbors > 1 && numAliveNeighbors < 4) {
                    return true;
                }
            }
            else {
                if (numAliveNeighbors === 3) {
                    return true; 
                }
                else {
                    return false;
                }

            }
        },
        TestNumAliveNeighbors: function() {
            console.log(this.$children[0].GetNumAliveNeighbors(2, 1));
        }
    },
    computed: {
    }
};
</script>

<style>

</style>







