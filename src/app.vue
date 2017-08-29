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
            <button v-on:click.prevent="DisplayCurrentGrid">Display Current Grid</button>
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
            
                // create an newRow array
                // iterate through each cell
                    // check num AliveNeighbors
                    // determine if live or die
                    // push live or die into newRow array
                // push new Row array into nextGrid
        },
        // DetermineLiveOrDie: function(currentCell, numAliveNeighbors) {
        //     if (currentCell.isAlive) {
        //         if (numAliveNeighbors < 2 || numAliveNeighbors > 3) {
        //             // cell dies
        //             console.log("cell will die");
        //         }
        //         else if (numAliveNeighbors > 1 && numAliveNeighbors < 4) {
        //             // cell continues living
        //             console.log("cell continues living");
        //         }
        //     }
        //     else {
        //         if (numAliveNeighbors === 3) {
        //             // cell comes back to life
        //             console.log("cell comes back to life");
        //         }

        //     }
        // },
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







