<template>
    <div class="ctrl">
        <div class="minus-wrapper" @click="decrease">
            <transition name="reduce">
                <div class="minus" v-show="food.count > 0">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-move"></use>
                    </svg>
                </div>
            </transition>
        </div>
        <div class="num-wrapper">
            <div class="num" v-show="food.count > 0">{{food.count}}</div>
        </div>
        <div class="plus-wrapper" @click="increase">
            <div class="plus">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-add"></use>
                </svg>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            food: {
                type: Object
            }
        },
        data(){
            return {

            }
        },
        methods:{
            increase(event){
                this.food.count = this.food.count + 1;
                let elLeft = event.target.getBoundingClientRect().left;
                let elBottom = event.target.getBoundingClientRect().bottom;
                this.$store.dispatch('increaseCart', {left: elLeft, bottom: elBottom});
            },
            decrease(){
                if(this.food.count > 0) {
                    this.food.count = this.food.count - 1;
                    this.$store.dispatch('decreaseCart', {});
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .ctrl{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .minus{
        display: inline-block;
        border:2px solid #3190e8;
        padding: 2px;
        color: #3190e8;
        background: #fff;
        border-radius: 50%;
        width: 1em;
        height: 1em;
        line-height: 1em;
        font-weight: bold;
    }
    .plus{
        display: inline-block;
        padding: 2px;
        border:2px solid #3190e8;
        background: #3190e8;
        color: #fff;
        border-radius: 50%;
        width: 1em;
        height: 1em;
        line-height: 1em;
        font-weight: bold;
    }
    .num{
        width: 30px;
        height: 1em;
        line-height: 1em;
        padding: 2px;
        border:2px solid white;
    }
    .num-wrapper{
        width: 30px;
        height: 1em;
        width: calc( 30px + 8px );
    }
    .minus-wrapper, plus-wrapper{
        width: calc( 1em + 8px );
        height: 1em;
    }

    .reduce-enter-active, .reduce-leave-active {
        transition: all .4s ease-out;
    }
    .reduce-enter, .reduce-leave-to {
        opacity: 0;
        transform: translateX(200%) rotate(180deg);
    }
</style>