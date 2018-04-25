<template>
    <div>
        <mt-button type="primary" @click="sureaddress">open</mt-button>

        <mt-picker :slots="addressSlots" class="picker" @change="onAddressChange" :visible-item-count="5" ></mt-picker >

        <mt-picker :slots="streetSlots" ref="picker" class="picker" @change="onStreetChange" :visible-item-count="5" ></mt-picker >
        上门服务地址:{{ addressProvince }} {{ addressCity }}

        <mt-popup v-model="popupVisible" position="bottom">
            <div class="operate">
                <div class="left" @click="cancleaddress">取消</div>
                <div class="right" @click="cancleaddress">确定</div>
                <div class="clear"></div>
            </div>
            <mt-picker :slots="addressSlots" class="picker" @change="onAddressChange" :visible-item-count="5" ></mt-picker >
        </mt-popup>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { Picker, Popup, Button } from 'mint-ui';
    import s from '../../assets/address4.json'

    Vue.component(Picker.name, Picker);
    Vue.component(Popup.name, Popup);
    Vue.component(Button.name, Button);

    export default {
        data(){
            return {
                companyName:'',
                addressSlots: [
                    {
                        flex: 1,
                        defaultIndex: 1,
                        values: Object.keys(s),
                        className: 'slot1',
                        textAlign: 'center'
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: [],
                        className: 'slot3',
                        textAlign: 'center'
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot4'
                    }, {
                        flex: 1,
                        values: [],
                        className: 'slot5',
                        textAlign: 'center'
                    }
                ],
                streetSlots: [
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
                addressProvince: '省',
                addressCity: '市',
                addressXian: '区',
                addressStreet: '街道',
                popupVisible: false
            }
        },
        methods: {
            onAddressChange(picker, values) {
                let sheng = Object.keys(s);
                if(typeof(values[0]) !== 'undefined') {
                    let shi = Object.keys(s[values[0]]);

                    let index=shi.indexOf(values[1]);
                    let xian = s[values[0]][shi[index]] ? s[values[0]][shi[index]] : {};
                    this.xianObj = xian;
                    picker.setSlotValues(1, shi);
                    this.addressProvince = values[0];
                    this.addressCity = values[1];
                    this.addressXian = values[2];
                    picker.setSlotValues(2, Object.keys(xian));
                }
            },
            onStreetChange(picker, values){
                this.addressStreet = values[0];
            },
            sureaddress() {
                this.popupVisible = true;
            },
            cancleaddress() {
                this.popupVisible = false;
            }
        },
        watch: {
            'addressXian': {
                handler(val, oval){
                    let street = this.xianObj[this.addressXian];
                    this.streetSlots[0].values = street;
                }
            }
        },
        mounted(){
            //$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
            this.$nextTick(() => {
                setTimeout(() => {
                    //这个是一个初始化默认值的一个技巧
                    this.addressSlots[0].defaultIndex = 0;
                }, 100);
            });
        }
    }
</script>
<style>
    .mint-popup{
        width: 100%;
        background: white;
        border-color: white;
    }
    .operate{
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #26a2ff;
        font-size: 16px;
        text-align: center;
        border-bottom: 1px solid #eaeaea;
    }
    .operate .left{
        float: left;
        width: 50%;
    }
    .operate .right{
        float: left;
        width: 50%;
    }
    .clear{
        clear: both;
    }
</style>