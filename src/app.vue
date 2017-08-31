<template>
    <div class="app-wrap section">
        <h1 
            v-on:click="ToggleModal"
            class="has-text-centered"
        >
            Game of Life
        </h1>
        <div class="modal">
            <div v-on:click="ToggleModal" class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <p>
                        The <strong>Game of Life</strong> is a cellular automaton devised by the Britsh mathematician John Horton Conway.
                    </p>
                    <br />
                    <p>
                        It is a zero-player game where one interacts by creating an initial configuration and observing how it evolves.
                    </p>
                    <p class="help">Description from <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Wikipedia</a></p>
                </div>
            </div>
            <button 
                class="modal-close is-large" 
                aria-label="close"
                v-on:click="ToggleModal"
            >        
            </button>
        </div>
        <form class="columns">
            <div class="field column">
                <label>Number of Rows</label>
                <div class="control">
                    <input 
                        class="input"
                        type="number" 
                        v-model.number="numRows"
                        placeholder="rows"
                        min="1"
                    />
                </div>
                <label>Number of Columns</label>
                <div class="control">
                    <input 
                        class="input"
                        type="number" 
                        v-model.number="numColumns"
                        placeholder="columns"
                        min="1"
                     />
                </div>
                <div class="control is-inline-block">
                    <label for="x-wrap">
                        X-Wrapping 
                        <input
                            class="checkbox"
                            id="x-wrap"
                            type="checkbox" 
                            v-model="xWrappingOn"
                        />
                    </label>
                </div>
                <div class="control is-inline-block">
                    <label for="y-wrap">
                        Y-Wrapping
                        <input
                            class="checkbox" 
                            id="y-wrap" 
                            type="checkbox"  
                            v-model="yWrappingOn"
                        />
                    </label>
                </div>
            </div>
            <div class="field column">
                <button  
                    class="button button-full-width is-primary is-block"
                    v-on:click.prevent="StartGame"
                 >
                     Start
                 </button>
                <button 
                    class="button button-full-width is-warning is-block"
                    v-on:click.prevent="PauseGame"
                >
                    Pause
                </button>
                <button 
                    class="button button-full-width is-danger is-block"
                    v-on:click.prevent="WipeGrid"
                >
                    Wipe
                </button>
            </div>
        </form>
        <h2 class="is-capitalized">{{helpMessage}}</h2>
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
        ToggleModal: function() {
            let modalNode = document.getElementsByClassName("modal")[0];

            if (modalNode.classList.contains("is-active"))
                modalNode.classList.remove("is-active");
            else
                modalNode.classList.add("is-active");
        },
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
                this.helpMessage = "game already paused";
            
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
    h1 {
        font-family: "Rubik Mono One", sans-serif;
        font-size: 80px;
    }
    h1:hover {
        color: #e8af2c;
    }
    .button-full-width {
        width: 100%;
        margin: 6px 0px;
    }
    label {
        font-family: "Yantramanav", sans-serif;
        font-size: 20px;
    }
    button {
        font-family: "Yantramanav", sans-serif;
    }
    p {
        font-size: 22px;
    }
    div.app-wrap {
        background: linear-gradient(-30deg, #72ecff, #0c1235);
        
        color: white;
        min-height: 100%;
        height: auto;
        width: 100%;
        /*overflow: auto;*/
    }
</style>







