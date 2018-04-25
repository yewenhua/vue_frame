<template>
    <div class="wifi-page">
        <audio :src="audiosrc" id="music"></audio>
        <div class="lock-content">
            <div class="vertical">
                <img src="../../assets/img/lock_other.png"></img>
            </div>
            <div class="horizon" :class="{'active': open}">
                <div bindtouchstart="touchHandS" bindtouchmove="touchHandM" bindtouchend="touchHandE" class="touchhand"></div>
                <img src="../../assets/img/lock_hand.png"></img>
            </div>
            <div class="center"></div>
            <div class="lock-operation">
                <div class="lock" bindtouchstart="touchS" bindtouchmove="touchM" bindtouchend="touchE" :style="txtStyle">
                    <img src="../../assets/img/lock.png"></img>
                </div>
                <div class="loader-open">
                    <div class="ball-pulse">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import mqtt from '../../assets/js/mqtt';
    export default {
        data() {
            return {
                open: false,
                txtStyle: {},
                loading: false,
                hasbind: true,
                startY: '',
                audiosrc: 'http://la.maoxy.com/open.mp3',
                isLoading: false,
                client: null
            }
        },
        methods: {
            touchS (e) {
                if (!this.hasbind) {
                    //app.showToast('设备未连接', '../../images/cry_white.png', 'img');
                    return false
                }
                if (e.touches.length == 1 && this.hasbind) {
                    this.startY = e.touches[0].clientY;
                }
            },
            touchM (e) {
                var that = this;
                this.txtStyle = {};
                if (e.touches.length == 1 && this.hasbind) {
                    //手指移动时水平方向位置
                    var moveY = e.touches[0].clientY;
                    //手指起始点位置与移动期间的差值
                    var disY = this.startY - moveY;
                    var dmostHeight = 130
                    var txtStyle = {};
                    if (disY == 0 || disY < 0) {//如果移动距离小于等于0，文本层位置不变
                        txtStyle = { bottom: '0px' };
                    } else if (disY > 0) {//移动距离大于0，文本层bottom值等于手指移动距离
                        txtStyle = { bottom: disY/100 + 'rem' };
                        if (disY >= dmostHeight) {
                            //控制手指移动距离最大值
                            txtStyle = { bottom: dmostHeight/100 + 'rem'};
                        }
                    }

                    //更新列表的状态
                    this.txtStyle = txtStyle;
                }
            },
            touchE (e) {
                if (e.changedTouches.length == 1 && this.hasbind) {
                    //手指移动结束后水平位置
                    var endY = e.changedTouches[0].clientY;
                    //触摸开始与结束，手指移动的距离
                    var disY = this.startY - endY;
                    var dmostHeight = 130;
                    //如果距离小于基准的1/2，恢复
                    var txtStyle = disY > dmostHeight / 2 ? { bottom: dmostHeight/100 + "rem" } : {bottom: '0px'};
                    this.txtStyle = txtStyle;

                    if (disY > dmostHeight / 2){
                        //执行开锁动作
                        this.open = true;
                        this.execute();
                        this.playMusic();

                        setTimeout(function(){
                            this.open = false;
                            this.txtStyle = {bottom: '0px'};
                        }.bind(this), 800);
                    }
                }
            },
            touchHandS (e) {
                if (!this.hasbind) {
                    //app.showToast('设备未连接', '../../images/cry_white.png', 'img');
                    return false
                }

                if (e.touches.length == 1 && this.hasbind) {
                    //设置触摸起始点水平方向位置
                    this.startHandY = e.touches[0].clientY;
                }
            },
            touchHandM (e) {

            },
            touchHandE (e) {
                if (e.changedTouches.length == 1 && this.hasbind) {
                    //手指移动结束后水平位置
                    var endHandY = e.changedTouches[0].clientY;
                    //触摸开始与结束，手指移动的距离
                    var disHandY = this.startHandY - endHandY;
                    var dmostHeight = 130;

                    if (disHandY < 0) {
                        //执行开锁动作
                        this.open = true;
                        this.execute();
                        this.playMusic();

                        setTimeout(function () {
                            this.open = false;
                        }.bind(this), 800);
                    }
                }
            },
            playMusic(){
                let audioCtx = document.getElementById('music');
                audioCtx.play();
            },
            mqtt(){
                this.client = mqtt.connect('ws://192.168.6.14:8084/mqtt');
                this.clientclient.on('connect', function () {
                    console.log('connect :)');
                    this.client.subscribe('/Kcbbt3oPTuvV/W0VtL5ayNaMqyFrt9SYK/update');
                }.bind(this));

                this.client.on("message", function (topic, payload) {
                    console.log('收到topic = ' + topic + ' 消息: ' + payload.toString());
                });
            },
            execute(){
                this.client.publish('/Kcbbt3oPTuvV/W0VtL5ayNaMqyFrt9SYK/update', JSON.stringify({userId: 123, command: 'open'}));
            }
        },
        mounted(){
            var touchhand = document.querySelector(".touchhand");
            var lock = document.querySelector(".lock");
            touchhand.addEventListener("touchmove", this.touchHandM, false);
            touchhand.addEventListener("touchstart", this.touchHandS, false);
            touchhand.addEventListener("touchend", this.touchHandE, false);

            lock.addEventListener("touchmove", this.touchM, false);
            lock.addEventListener("touchstart", this.touchS, false);
            lock.addEventListener("touchend", this.touchE, false);

            this.mqtt()

            /*
            document.body.addEventListener('touchmove' , function(e){
                e.preventDefault();
            });
            */
        }
    }
</script>
<style>
    .wifi-page{
        background: white;
    }
    @-webkit-keyframes scale {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }
        45% {
            -webkit-transform: scale(0.1);
            transform: scale(0.1);
            opacity: 0.7;
        }
        80% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }
    }
    @keyframes scale {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }
        45% {
            -webkit-transform: scale(0.1);
            transform: scale(0.1);
            opacity: 0.7;
        }
        80% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
        }
    }
    .ball-pulse > div:nth-child(0) {
        -webkit-animation: scale 0.75s 0s infinite cubic-bezier(.2, .68, .18, 1.08);
        animation: scale 0.75s 0s infinite cubic-bezier(.2, .68, .18, 1.08);
    }
    .ball-pulse > div:nth-child(1) {
        -webkit-animation: scale 0.75s 0.12s infinite cubic-bezier(.2, .68, .18, 1.08);
        animation: scale 0.75s 0.12s infinite cubic-bezier(.2, .68, .18, 1.08);
    }
    .ball-pulse > div:nth-child(2) {
        -webkit-animation: scale 0.75s 0.24s infinite cubic-bezier(.2, .68, .18, 1.08);
        animation: scale 0.75s 0.24s infinite cubic-bezier(.2, .68, .18, 1.08);
    }
    .ball-pulse > div:nth-child(3) {
        -webkit-animation: scale 0.75s 0.36s infinite cubic-bezier(.2, .68, .18, 1.08);
        animation: scale 0.75s 0.36s infinite cubic-bezier(.2, .68, .18, 1.08);
    }
    .ball-pulse > div {
        background-color: #bdbdbd;
        width: 0.04rem;
        height: 0.04rem;
        border-radius: 100%;
        margin: 0.02rem;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: inline-block;
    }

    .lock-content{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .vertical{
        position: absolute;
        left:50%;
        top: 0.7rem;
        width: 0.9rem;
        margin-left: -0.45rem;
        height: 3rem;
    }
    .horizon{
        position: absolute;
        left: 0.5rem;
        top: 3.04rem;
        width: 1.72rem;
        min-height: 0.3rem;
        transition: all 0.5s ease-in-out;
        -webkit-transform:rotate(0deg);
        -webkit-transform-origin: 1.39rem center;
    }
    .touchhand{
        position: absolute;
        left: 0px;
        top: 0px;
        width: 0.9rem;
        height: 100%;
    }
    .center{
        position: absolute;
        left: 1.65rem;
        top: 2.98rem;
        width: 0.45rem;
        height: 0.45rem;
        border-left: none;
        border-radius: 50%;
    }
    .lock-operation{
        position: absolute;
        left: 1.43rem;
        top: 4.38rem;
        width: 0.9rem;
        height: 1.5rem;
    }
    .lock{
        position: absolute;
        left: 0.2rem;
        bottom: 0px;
        width: 0.5rem;
        height: 0.5rem;
        transition: all 0.5s ease-in-out;
    }
    .lock img{
        width: 0.5rem;
        height: 0.5rem;
    }
    .loader-open{
        height: 1rem;
        width: 0.1rem;
        position: absolute;
        left:50%;
        margin-left: -0.04rem;
        top: 0.15rem;
        text-align: center;
    }
    .vertical img{
        width: 100%;
    }
    .horizon img{
        width: 100%;
    }
    .horizon.active{
        -webkit-transform:rotate(-45deg);
    }
</style>