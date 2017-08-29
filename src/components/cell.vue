<template>
    <div 
        class="cell" 
        v-on:click="FlipIsAlive"
    />
</template>

<script>
export default {
    data: function() {
        return {
            isAlive: false
        };
    },
    methods: {
        FlipIsAlive: function() {
            this.isAlive = !this.isAlive;

            if (this.isAlive) {
                // console.log("flipped to life!");
                this.$el.style.backgroundColor = "#22d822";
            }
            else {
                // console.log("flipped to death");
                this.$el.style.backgroundColor = "#3c4951";
            }
        }
    }
};
</script>

<style>
    div.cell {
        width: 20px;
        height: 20px;
        background-color: #3c4951;
        margin: 1px;
        display: inline-block;
    }
</style>