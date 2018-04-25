<template>
    <div>
        <section class="buy_cart_container">
            <section class="cart_icon_num">
                <div class="cart_icon_container cart_icon_activity" :class="{move_in_cart: receiveInCart}" ref="cartContainer">
                    <span class="cart_list_length">5</span>
                    <svg class="icon cart_icon fill" aria-hidden="true">
                        <use xlink:href="#icon-gouwuche"></use>
                    </svg>
                </div>
                <div class="cart_num">
                    <div>¥ 100</div>
                    <div>配送费¥9</div>
                </div>
            </section>
            <section class="gotopay gotopay_acitvity">
                <span class="gotopay_button_style">去结算</span>
            </section>
            <transition
                    appear
                    @after-appear = 'afterEnter'
                    @before-appear="beforeEnter"
                    v-for="(item,index) in showMoveDot"
            >
                <div class="move_dot" v-if="item">
                    <svg class="icon fill-food" aria-hidden="true">
                        <use xlink:href="#icon-jushoucanggift"></use>
                    </svg>
                </div>
            </transition>
        </section>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: mapGetters([
            'ball',
        ]),
        data(){
            return {
                cartFoodList: [],
                elLeft: 0,
                elBottom: 0,
                windowHeight: null, //屏幕的高度
                showMoveDot: [], //控制下落的小圆点显示隐藏
                receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
            }
        },
        methods:{
            //监听圆点是否进入购物车
            listenInCart(){
                if (!this.receiveInCart) {
                    this.receiveInCart = true;
                    this.$refs.cartContainer.addEventListener('animationend', () => {
                        this.receiveInCart = false;
                    })
                    this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
                        this.receiveInCart = false;
                    })
                }
            },
            //显示下落圆球
            showMoveDotFun(showMoveDot, elLeft, elBottom){
                this.showMoveDot.push(true);
                this.elLeft = this.ball.left;
                this.elBottom = this.ball.bottom;
            },
            beforeEnter(el){
                el.style.transform = `translate3d(0,${18 + this.elBottom - this.windowHeight}px,0)`;
                el.children[0].style.transform = `translate3d(${this.elLeft - 28}px,0,0)`;
                el.children[0].style.opacity = 0;
            },
            afterEnter(el){
                el.style.transform = `translate3d(0,0,0)`;
                el.children[0].style.transform = `translate3d(0,0,0)`;
                el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
                el.children[0].style.transition = 'transform .55s linear';
                this.showMoveDot = this.showMoveDot.map(item => false);
                el.children[0].style.opacity = 1;
                el.children[0].addEventListener('transitionend', () => {
                    this.listenInCart();
                })
                el.children[0].addEventListener('webkitAnimationEnd', () => {
                    this.listenInCart();
                })
            },
            addToCart(){

            },
            removeOutCart(){

            }
        },
        mounted(){
            this.windowHeight = window.innerHeight;
        },
        watch: {
            'ball'(newVal, oldVal){
                if(newVal != oldVal){
                    this.showMoveDotFun();
                }
            },
        }
    }
</script>
<style lang="scss">
    @import '../../assets/scss/base/mixins';
    @import '../../assets/scss/base/placeholder';
    .buy_cart_container{
        position: absolute;
        background-color: #3d3d3f;
        bottom: 0;
        left: 0;
        z-index: 13;
        display: flex;
        @include size(100%, 0.5rem);
        .cart_icon_num{
            flex: 1;
            .cart_icon_container{
                display: flex;
                background-color: #3d3d3f;
                position: absolute;
                padding: 0.1rem;
                border: 0.05rem solid #444;
                border-radius: 50%;
                left: 0.15rem;
                top: -0.1rem;
                .cart_icon{
                    @include size(0.24rem, 0.24rem);
                    color: white;
                    fill: white;
                }
                svg{
                    fill: white;
                }
                .cart_list_length{
                    position: absolute;
                    top: -0.05rem;
                    right: -0.05rem;
                    background-color: #ff461d;
                    line-height: 0.2rem;
                    text-align: center;
                    border-radius: 50%;
                    border: 0.005rem solid #ff461d;
                    min-width: 0.2rem;
                    height: 0.2rem;
                    font-size: 0.12rem;
                    color: #fff;
                    font-family: Helvetica Neue,Tahoma,Arial;
                }
            }
            .move_in_cart{
                animation: mymove .5s ease-in-out;
            }
            .cart_icon_activity{
                background-color: #3190e8;
            }
            .cart_num{
                @extend %center-vertical;
                left: 0.9rem;

                div{
                    color: #fff;
                }
                div:nth-of-type(1){
                    font-size: .16rem;
                    font-weight: bold;
                    margin-bottom: .02rem;
                }
                div:nth-of-type(2){
                    font-size: .08rem;
                }
            }
        }
        .gotopay{
            position: absolute;
            right: 0;
            top: 0;
            background-color: #535356;
            @include size(1rem, 100%);
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            .gotopay_button_style{
                font-size: .18rem;
                color: #fff;
                font-weight: bold;
            }
        }
        .gotopay_acitvity{
            background-color: #4cd964;
        }
    }
    .move_dot{
        position: fixed;
        bottom: 0.18rem;
        left: 0.28rem;
        svg{
            @include size(.16rem, .16rem);
        }
    }
    .fill {
        fill: white;
    }
    .fill-food{
        fill: #3190e8;
    }
    @keyframes mymove{
        0%   { transform: scale(1) }
        25%  { transform: scale(.8) }
        50%  { transform: scale(1.1) }
        75%  { transform: scale(.9) }
        100% { transform: scale(1) }
    }
    @-moz-keyframes mymove{
        0%   { transform: scale(1) }
        25%  { transform: scale(.8) }
        50%  { transform: scale(1.1) }
        75%  { transform: scale(.9) }
        100% { transform: scale(1) }
    }
    @-webkit-keyframes mymove{
        0%   { transform: scale(1) }
        25%  { transform: scale(.8) }
        50%  { transform: scale(1.1) }
        75%  { transform: scale(.9) }
        100% { transform: scale(1) }
    }
    @-o-keyframes mymove{
        0%   { transform: scale(1) }
        25%  { transform: scale(.8) }
        50%  { transform: scale(1.1) }
        75%  { transform: scale(.9) }
        100% { transform: scale(1) }
    }
</style>