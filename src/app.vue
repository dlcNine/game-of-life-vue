<template>
    <div class="app">
        <h1>Game of Life</h1>
        <grid 
            v-bind:rows="numRows | ValidateInput"
            v-bind:columns="numColumns | ValidateInput"
            v-bind:yWrappingOn="yWrappingOn"
            v-bind:xWrappingOn="xWrappingOn"
        />
        <form>
            <label>
                Number of Rows
                <input 
                    type="number" 
                    v-model.number="numRows"
                    placeholder="rows"
                    min="1"
                />
            </label>
            <label>
                Number of Columns
                <input 
                    type="number" 
                    v-model.number="numColumns" 
                    placeholder="columns"
                    min="1"
                 />
            </label>
            <br />
            <label for="x-wrap">
                X-Wrapping {{xWrappingOn}}
                <input
                    id="x-wrap"
                    type="checkbox" 
                    v-model="xWrappingOn"
                />
            </label>
            <label for="y-wrap">
                Y-Wrapping {{yWrappingOn}}
                <input 
                    id="y-wrap" 
                    type="checkbox"  
                    v-model="yWrappingOn"
                />
            </label>
            <button v-on:click.prevent="StartGame">StartGame</button>
            <button v-on:click.prevent="PauseGame">Pause</button>
            <button v-on:click.prevent="WipeGrid">Wipe Grid</button>

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
            intervalID: "",
            hasGameStarted: false,
            xWrappingOn: false,
            yWrappingOn: false
        };
    },
    methods: {
        StartGame: function() {
            if (!this.hasGameStarted) {
                this.intervalID = setInterval(this.DrawNextGrid, 200);
                this.hasGameStarted = true;
            }
            else 
                console.log("game already in progress");
        },
        PauseGame: function() {
            if (this.hasGameStarted) {
                clearInterval(this.intervalID);
                this.hasGameStarted = false;
            }
            else 
                console.log("game hasn't started yet");
            
        },
        WipeGrid: function() {
            if (!this.hasGameStarted) {
                let arrayOfRows = this.$children[0].GetArrayOfRows();

                for (let row = 0; row < arrayOfRows.length; row++) {
                    let arrayOfCells = arrayOfRows[row].GetArrayOfCells();

                    for (let column = 0; column < arrayOfCells.length; column++) {
                        if (arrayOfCells[column].isAlive)
                            arrayOfCells[column].FlipIsAlive();
                    }
                }
                console.log("Wiping grid");
            }
            else
                console.log("Must pause game before to wipe grid");
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
        },
        LogIt: function(event) {
            console.log(event.target.value);
        }
    },
    filters: {
        ValidateInput: function(value) {
            if (value < 1)
                return 1;
            else if (value > 150)
                return 150;
            else {
                return value;
            }
        }
    },
    computed: {
    }
};
</script>

<style>
    div.app {
        background-color: #290f47;
        color: white;
    }
</style>







