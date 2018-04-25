<template>
    <div ref="wrapper">
        <slot></slot>
        <slot name="pulldown"
              :pullDownRefresh="pullDownRefresh"
              :pullDownStyle="pullDownStyle"
              :beforePullDown="beforePullDown"
              :pulling="pulling"
              :bubbleY="bubbleY"
        >
            <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
                <div class="before-trigger" v-if="beforePullDown">
                    <Bubble :y="bubbleY"></Bubble>
                </div>
                <div class="after-trigger" v-else>
                    <div v-if="pulling" class="loading">
                        <Loading></Loading>
                    </div>
                    <div v-else><span>{{refreshTxt}}</span></div>
                </div>
            </div>
        </slot>
    </div>
</template>
<script>
    import BScroll from 'better-scroll';
    import Bubble from '../bubble/bubble.vue';

    export default {
        data(){
            return {
                beforePullDown: true,
                pulling: false,
                pullDownStyle: '',
                bubbleY: 0,
                isPullingDown: false,
                pullDownInitTop: 0,
                isRebounding: false,
            }
        },
        props: {
            /**
             * 1 滚动的时候会派发scroll事件，会截流。
             * 2 滚动的时候实时派发scroll事件，不会截流。
             * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
             */
            probeType: {
                type: Number,
                default: 1
            },
            /**
             * 点击列表是否派发click事件
             */
            click: {
                type: Boolean,
                default: true
            },
            /**
             * 是否开启横向滚动
             */
            scrollX: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发滚动事件
             */
            listenScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 列表的数据
             */
            data: {
                type: Array,
                default: null
            },
            /**
             * 是否派发滚动到底部的事件，用于上拉加载
             */
            pullup: {
                type: Boolean,
                default: false
            },
            /**
             * 是否派发顶部下拉的事件，用于下拉刷新
             */
            pulldown: {
                type: Boolean,
                default: false
            },

            /**
             * 是否派发顶部下拉的事件，用于下拉刷新
             */
            pullDownRefresh: {
                type: null,
                default: false
            },

            pullUpLoad: {
                type: null,
                default: false
            },
            scrollbar: {
                type: Boolean,
                default: false
            },

            /**
             * 是否派发列表滚动开始的事件
             */
            beforeScroll: {
                type: Boolean,
                default: false
            },
            /**
             * 当数据更新后，刷新scroll的延时。
             */
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        computed: {
            refreshTxt() {
                return this.pullDownRefresh && this.pullDownRefresh.txt ? this.pullDownRefresh.txt : '';
            }
        },
        created() {
            this.pullDownInitTop = -50;
        },
        mounted() {
            // 保证在DOM渲染完毕后初始化better-scroll
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        components: {
            Bubble
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                // better-scroll的初始化
                this.scroll = new BScroll(this.$refs.wrapper, {
                    //probeType: this.probeType,
                    //click: this.click,
                    scrollX: this.scrollX,
                    pullDownRefresh: this.pullDownRefresh,
                    scrollbar: this.scrollbar
                })

                // 是否派发滚动事件
                if (this.listenScroll) {
                    let me = this
                    this.scroll.on('scroll', (pos) => {
                        me.$emit('scroll', pos)
                    })
                }

                // 是否派发滚动到底部事件，用于上拉加载
                if (this.pullup) {
                    this.scroll.on('scrollEnd', () => {
                        // 滚动到底部
                        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            this.$emit('scrollToEnd')
                        }
                    })
                }

                // 是否派发顶部下拉事件，用于下拉刷新
                if (this.pulldown) {
                    this.scroll.on('touchEnd', (pos) => {
                        // 下拉动作
                        if (pos.y > 50) {
                            this.$emit('pulldown')
                        }
                    })
                }

                if (this.pullDownRefresh) {
                    this._initPullDownRefresh();
                }

                // 是否派发列表滚动开始的事件
                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScroll')
                    })
                }
            },
            _initPullDownRefresh() {
                this.scroll.on('pullingDown', () => {
                    this.beforePullDown = false;
                    this.isPullingDown = true;
                    this.pulling = true;
                    this.$emit('pullingDown');
                })

                this.scroll.on('scroll', (pos) => {
                    if (this.beforePullDown) {
                        this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
                        this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`;
                    } else {
                        this.bubbleY = 0;
                    }

                    if (this.isRebounding) {
                        this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`;
                    }
                })
            },
            forceUpdate() {
                if (this.pullDownRefresh && this.isPullingDown) {
                    this.pulling = false;
                    this._reboundPullDown().then(() => {
                        this._afterPullDown();
                    });
                }
                else {
                    this.refresh();
                }
            },
            _reboundPullDown() {
                const {stopTime = 600} = this.pullDownRefresh;
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.isRebounding = true;
                        this.scroll.finishPullDown();
                        this.isPullingDown = false;
                        resolve();
                    }, stopTime);
                });
            },
            _afterPullDown() {
                setTimeout(() => {
                    this.pullDownStyle = `top:${this.pullDownInitTop}px`;
                    this.beforePullDown = true;
                    this.isRebounding = false;
                    this.refresh();
                }, this.scroll.options.bounceTime);
            },
            disable() {
                // 代理better-scroll的disable方法
                this.scroll && this.scroll.disable()
            },
            enable() {
                // 代理better-scroll的enable方法
                this.scroll && this.scroll.enable()
            },
            refresh() {
                // 代理better-scroll的refresh方法
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                // 代理better-scroll的scrollTo方法
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
            },
            scrollToElement() {
                // 代理better-scroll的scrollToElement方法
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
            data() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>
<style>
    .pulldown-wrapper {
        position: absolute;
        width: 100%;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all;
    }
    .after-trigger {
        margin-top: 10px;
    }
</style>