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
            <button>Start</button>
            <button>Pause</button>

        </form>
    </div>
</template>

<script>
import Grid from "./components/grid.vue";

export default {
    components: { Grid },
    data: function() {
        return {
            numRows: 10,
            numColumns: 10
        };
    },
    methods: {

    },
    computed: {
        
    }
};
</script>

<style>

</style>