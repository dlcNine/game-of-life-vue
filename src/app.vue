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
        DisplayCurrentGrid: function() {
            let gridComponent = this.$children[0];
            let arrayOfRows = gridComponent.GetArrayOfRows();

            for (let row = 0; row < arrayOfRows.length; row++) {
                let arrayOfCells = arrayOfRows[row].GetArrayOfCells();

                // let cellValues = [];
                for (let col = 0; col < arrayOfCells.length; col++) {
                    // cellValues.push(arrayOfCells[col].isAlive);
                    arrayOfCells[col].FlipIsAlive();
                }
                // console.log(cellValues);
            }
        },
        ComputeNextGrid: function() {

        },
        TestNumAliveNeighbors: function() {
            this.$children[0].GetNumAliveNeighbors(1, 1);
        }
    },
    computed: {
    }
};
</script>

<style>

</style>







