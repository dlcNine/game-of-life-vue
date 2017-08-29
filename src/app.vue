<template>
    <div class="app">
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
            />
            <input 
                type="number" 
                v-model.number="numColumns" 
                placeholder="columns"
                min="1"
             />
            <button v-on:click.prevent="StartGame">StartGame</button>
            <button v-on:click.prevent="PauseGame">Pause</button>

        </form>
    </div>
</template>

<script>
import Grid from "./components/grid.vue";

export default {
    components: { Grid },
    data: function() {
        return {
            numRows: 25,
            numColumns: 25,
            nextGrid: [],
            intervalID: ""
        };
    },
    methods: {
        StartGame: function() {
            this.intervalID = setInterval(this.DrawNextGrid, 200);
        },
        PauseGame: function() {
            clearInterval(this.intervalID);
        },
        BuildNextGrid: function() {
            this.nextGrid = [];

            let arrayOfRows = this.$children[0].GetArrayOfRows();

            for (let row = 0; row < arrayOfRows.length; row++) {
                let newRow = [];
                let arrayOfCells = arrayOfRows[row].GetArrayOfCells();

                for (let column = 0; column < arrayOfCells.length; column++) {
                    let currentCell = arrayOfCells[column];
                    let numAliveNeighbors = this.$children[0].GetNumAliveNeighbors(row, column);


                    let isGoingToLive = this.DetermineLiveOrDie(currentCell, numAliveNeighbors);

                    newRow.push(isGoingToLive);
                }
                this.nextGrid.push(newRow);
            }
        },
        DrawNextGrid: function() {
            this.BuildNextGrid();

            let arrayOfRows = this.$children[0].GetArrayOfRows();

            for (let row = 0; row < arrayOfRows.length; row++) {
                let arrayOfCells = arrayOfRows[row].GetArrayOfCells();

                for (let column = 0; column < arrayOfCells.length; column++) {
                    let currentCell = arrayOfCells[column];

                    if (currentCell.isAlive && this.nextGrid[row][ column] === false)
                        currentCell.FlipIsAlive();
                    else if (!currentCell.isAlive && this.nextGrid[row][column] === true)
                        currentCell.FlipIsAlive();
                }
            }
        },
        DetermineLiveOrDie: function(currentCell, numAliveNeighbors) {
            if (currentCell.isAlive) {
                if (numAliveNeighbors < 2 || numAliveNeighbors > 3)
                    return false;
                else if (numAliveNeighbors > 1 && numAliveNeighbors < 4)
                    return true;
            }
            else {
                if (numAliveNeighbors === 3)
                    return true;
                else
                    return false;

            }
        }
    },
    computed: {
    }
};
</script>

<style>

</style>







