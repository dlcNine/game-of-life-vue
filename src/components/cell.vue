<template>
    <div v-on:click="FlipIsAlive" />
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
                console.log("flipped to life!");
                this.$el.style.backgroundColor = "#22d822";
            }
            else {
                console.log("flipped to death");
                this.$el.style.backgroundColor = "#3c4951";
            }
        }
    }
};
</script>

<style>
    div {
        width: 20px;
        height: 20px;
        background-color: #3c4951;
        /*background-color: #80c8ed;*/
        margin: 4px;
    }
</style>