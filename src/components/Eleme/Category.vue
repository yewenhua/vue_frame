<template>
    <div class="ele">
        <div class="header"></div>
        <div class="content">
            <div class="left" ref="menuList">
                <ul class="menu">
                    <li v-for="(item,index) in menulist" :key="index" :class="{active_menu: index == menuIndex}" @click="chooseMenu(index)">{{item.name}}</li>
                </ul>
            </div>
            <div class="right" ref="foodList">
                <ul class="list">
                    <li v-for="(item,index) in contentlist" :key="index" class="foodhook">
                        <div class="title">{{item.name}}</div>
                        <ul class="dl">
                            <li v-for="(detail,idx) in item.content" :key="idx">
                                <div class="detail">
                                    <div class="name">{{detail.name}}</div>
                                    <div class="operate">
                                        <Cartcontrol :food="detail.food"></Cartcontrol>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer">
            <Shopcart></Shopcart>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import Cartcontrol from './Cartcontrol.vue'
    import Shopcart from './Shopcart.vue'

    export default {
        data(){
            return {
                menulist: [
                    {name: '爆款1', link: ''},
                    {name: '爆款2', link: ''},
                    {name: '爆款3', link: ''},
                    {name: '爆款4', link: ''},
                    {name: '爆款5', link: ''},
                    {name: '爆款6', link: ''},
                    {name: '爆款7', link: ''},
                    {name: '爆款8', link: ''},
                    {name: '爆款9', link: ''},
                    {name: '爆款10', link: ''},
                ],
                contentlist: [
                    {name: '爆款1', content: [
                        {name: '外婆红烧肉', link: '', food: {count: 0}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 0}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}}
                    ]},
                    {name: '爆款2', content: [
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}}
                    ]},
                    {name: '爆款3', content: [
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}}
                    ]},
                    {name: '爆款4', content: [
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}}
                    ]},
                    {name: '爆款5', content: [
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}}
                    ]},
                    {name: '爆款6', content: [
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}}
                    ]},
                    {name: '爆款7', content: [
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}}
                    ]},
                    {name: '爆款8', content: [
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}}
                    ]},
                    {name: '爆款9', content: [
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}}
                    ]},
                    {name: '爆款10', content: [
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}},
                        {name: '外婆红烧肉', link: '', food: {count: 1}}
                    ]},
                ],
                itemListTop: [],
                foodsScroll: '',
                menuIndex: 0,
                menuIndexChange: true
            }
        },
        methods:{
            getFoodListHeight(){
                const listContainer = this.$refs.foodList;
                const listArr = Array.from(listContainer.children[0].children);
                listArr.forEach((item, index) => {
                    this.itemListTop[index] = item.offsetTop;
                });
                this.listenScroll(listContainer)
            },
            listenScroll(element){
                this.foodsScroll = new BScroll(element, {
                    probeType: 3,
                    //bounce: false,
                    click: true,
                    //scrollbar: true
                });

                const menu = new BScroll(this.$refs.menuList, {
                    click: true,
                });

                const menuHeight = this.$refs.menuList.clientHeight;
                this.foodsScroll.on('scroll', (pos) => {
                    if (!this.$refs.menuList) {
                        return
                    }
                    this.itemListTop.forEach((item, index) => {
                        if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
                            this.menuIndex = index;
                            const el = this.$refs.menuList.querySelector('.active_menu');
                            menu.scrollToElement(el, 800, 0, -(menuHeight/2 - 50));
                        }
                    })
                })
            },
            chooseMenu(index){
                this.menuIndex = index;
                //menuIndexChange解决运动时listenScroll依然监听的bug
                this.menuIndexChange = false;
                let foodList = this.$refs.foodList.querySelectorAll('.foodhook');
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300, 0, 0);
                this.foodsScroll.on('scrollEnd', () => {
                    this.menuIndexChange = true;
                });
            }
        },
        components:{
            Cartcontrol,
            Shopcart
        },
        mounted() {
            this.$nextTick(() => {
                setTimeout(()=>{
                    this.getFoodListHeight();
                },400)
            })
        }
    }
</script>
<style lang="scss" scoped>
    .ele{
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
    }
    .header{
        height: 1rem;
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        border-bottom: 0.01rem solid #f1f1f1;
    }
    .content{
        position: absolute;
        left: 0px;
        top:1rem;
        width: 100%;
        height: calc( 100% - 1.5rem );
        overflow: hidden;
        background: #f3f5f9;
        display: flex;
    }
    .footer{
        height: 0.5rem;
        width: 100%;
        position: absolute;
        left:0px;
        bottom: 0px;
    }
    .left{
        width: 0.8rem;
        height: 100%;
        box-sizing: border-box;
        background: #fff;
    }
    .right{
        width: calc( 100% - 0.8rem );
        height: 100%;
        box-sizing: border-box;
    }
    .menu, .list, .dl{
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
    }
    .list{
        padding: 5px;
        box-sizing: border-box;
    }
    .menu li{
        width: 100%;
        height:60px;
        line-height:60px;
        text-align: center;
        color: #333;
    }
    .list li .title{
        height:50px;
        line-height:50px;
        padding-left: 15px;
    }
    .dl{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .dl li{
        width:50%;
        box-sizing: border-box;
    }
    li.active_menu{
        background: #3190e8;
        color: #fff;
    }
    ul{
        -webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        -webkit-padding-start: 0px;
    }
    .detail{
        background: white;
        text-align: center;
        margin: 5px;
    }
    .detail .name{
        line-height:60px;
    }
    .detail .operate{
        padding: 15px;
        box-sizing: border-box;
    }
</style>