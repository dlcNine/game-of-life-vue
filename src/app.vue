<template>
    <div class="app">
        <h1>Game of Life</h1>
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
                X-Wrapping
                <input
                    id="x-wrap"
                    type="checkbox" 
                    v-model="xWrappingOn"
                />
            </label>
            <label for="y-wrap">
                Y-Wrapping
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
        <h2>{{helpMessage}}</h2>
        <grid 
            v-bind:rows="numRows | ValidateInput"
            v-bind:columns="numColumns | ValidateInput"
            v-bind:yWrappingOn="yWrappingOn"
            v-bind:xWrappingOn="xWrappingOn"
        />
        <footer>
            <h3>Coded by Dan Cross</h3>
        </footer>
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
            yWrappingOn: false,
            helpMessage: "Click a cell to toggle it. Press start button to run game."
        };
    },
    methods: {
        StartGame: function() {
            if (!this.hasGameStarted) {
                this.intervalID = setInterval(this.DrawNextGrid, 200);
                this.hasGameStarted = true;
                this.helpMessage = "game running";
            }
            else
                this.helpMessage = "game already running";
        },
        PauseGame: function() {
            if (this.hasGameStarted) {
                clearInterval(this.intervalID);
                this.hasGameStarted = false;
                this.helpMessage = "game paused";
            }
            else 
                this.helpMessage = "start game first";
            
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
                this.helpMessage = "grid wiped";
            }
            else
                this.helpMessage = "must pause game to wipe";
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







