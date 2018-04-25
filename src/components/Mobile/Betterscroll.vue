<template>
    <div>
        <div class="wrapper" ref="wrapper">
            <ul class="content">
                <li v-for="item in lists">垂直滚动{{item}}{{Math.random()}}</li>
            </ul>
            <div class="loading-wrapper"></div>
        </div>

        <div class="com-content">
            <ScrollView class="wrapper" :data="items" :pullDownRefresh="pullDownRefresh" :scrollbar="scrollbar" :probeType="probeType" @pullingDown="onPullingDown" ref="scroll">
                <ul class="content">
                    <li v-for="item in items">{{item}}</li>
                </ul>
            </ScrollView>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import ScrollView from './ScrollView.vue'
    export default {
        data(){
            return {
                scroll: null,
                hscroll: null,
                lists: [],
                items: [],
                pulldown: true,
                scrollbar: true,
                probeType: 1,
                pullDownRefresh: {
                    threshold: 70,
                    stop: 40
                }
            }
        },
        methods:{
            listData(){
                setTimeout(function () {
                    var newdata = [1,2,3,4,5,6,7,8,9,10];
                    this.lists = newdata.concat(this.lists)
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.wrapper, {})
                            this.scroll.on('touchEnd', (pos) => {
                                // 下拉动作
                                if (pos.y > 50) {
                                    this.listData();
                                }
                            })
                        } else {
                            this.scroll.refresh();
                        }
                    })
                }.bind(this), 1000);
            },
            itemData(){
                setTimeout(function () {
                    var newdata = [1,2,3,4,5,6,7,8,9,10];
                    this.items = newdata.concat(this.items);
                }.bind(this), 1000);
            },
            onPullingDown(){
                setTimeout(() => {
                    if (Math.random() > 0.5) {
                        // 如果有新数据
                        this.items.unshift('new data ' + new Date().getDay());
                        this.$refs.scroll.forceUpdate()
                    } else {
                        // 如果没有新数据
                        this.$refs.scroll.forceUpdate()
                    }
                }, 1000);
            }
        },
        components: {
            ScrollView
        },
        created() {
            this.listData();
            this.itemData();
        }
    }
</script>
<style lang="scss">
    $color: green;
    ul.content{
        list-style: none;
        padding: 0px;
        margin: 0px;
        width: 100%;
        color: $color;
    }
    ul.content li{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #f9f9f9;
    }
    .wrapper{
        height: 280px;
        width: 100%;
        overflow: hidden;
        background: white;
        margin-bottom: 15px;
    }
    .wrapper-horizon{
        height: 60px;
        line-height: 60px;
        width: 100%;
        overflow: hidden;
        background: white;
        white-space: nowrap;
        margin-bottom: 15px;
    }
    .content-horizon{
        height: 60px;
        line-height: 60px;
        width: 200%;
        background: green;
    }
    .clear{
        clear: both;
    }
    .com-content{
        position: relative;
        overflow: hidden;
    }
</style>