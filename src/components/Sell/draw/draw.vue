<template>
  <div class="draw">
    <!--<img class="draw-back" src="/static/draw/back.png"/>-->
    <!--<img class="animated zoomIn img_2_1" src="/static/draw/img_1.png"/>-->
    <img class="animated bounceIn img_2_2" src="/static/draw/img_2.png" @click.prevent>
    <lottery-turntable class="lottery" :restaraunts="rests" :colors="colors"
                       :exciteId="exciteId"></lottery-turntable>
    <img class="bottom_shadow" src="/static/draw/bottom_shadow.png" @click.prevent>
    <img class="animated zoomIn kePublic_back" src="/static/draw/back1.png" @click.prevent>
    <div class="draw-history-box" v-if="drawHistoryList.historyDtos.length !== 0">
      <div class="draw-history-title">获奖名单</div>
      <div class="draw-history">
        <ul class="draw-history-list">
          <li v-for="item in drawHistoryList.historyDtos">
            <span>{{item.storeName}} - {{item.salesName}} - {{item.award}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import LotteryTurntable from './lottery_turntable'
  import api from '../../../api/index2'
  import _ from 'lodash'
  import { loadData, defaultPreHandler } from '../../../common/utils'

  export default {
    name: 'Draw',
    components: {
      LotteryTurntable
    },
    data () {
      return {
        // 奖品类别
        rests: ['谢谢参与'],
        // 大转盘奖品区块对应背景颜色
        colors: ['#fff'],
        animate: false,
        drawHistoryList: {
          historyDtos: ''
        },
        orderId: null,
        exciteId: null
      }
    },
    async created () {
      let vue = this
      this.orderId = this.$route.query.orderId
      await loadData(() => {
        return api.getExcitation(this.orderId)
      }, (excitation) => {
        _.forEach(excitation.prizeDtos, function (v) {
          vue.rests.push(v.awardName.slice(0, 11))
          switch (vue.rests.length % 2) {
            case 0: {
              vue.colors.push('#fefef0')
              break
            }
            case 1: {
              vue.colors.push('#f2fefb')
              break
            }
          }
        })
        this.exciteId = excitation.excitationId
      }, defaultPreHandler, true)
      await loadData(() => {
        return api.getDrawHistory(this.exciteId)
      }, (drawHistoryList) => {
        this.drawHistoryList = drawHistoryList
      }, defaultPreHandler, true)
    }
  }
</script>
<style scoped>
  .draw {
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    background: url('/static/draw/back.png') no-repeat #F82D2B;
    background-size: 100% 100%;
    position: fixed;
    *zoom: 1;
    z-index: 1;
    top: 0;
    overflow: hidden;
  }

  .draw-back {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .zoomIn {
    -webkit-animation-name: zoomIn;
    animation-name: zoomIn;
  }

  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .img_2_1 {
    width: 60vw;
    position: absolute;
    top: 6vw;
    left: 22vw;
    animation-delay: 0.25s;
    animation-duration: 1s;
    z-index: 2;
  }

  @keyframes zoomIn {
    0% {
      opacity: 0;
      -webkit-transform: scale(.3);
      -ms-transform: scale(.3);
      transform: scale(.3)
    }

    50% {
      opacity: 1
    }
  }

  .bottom_shadow {
    width: 50vw;
    position: absolute;
    top: 90vw;
    left: 25vw;
    z-index: -1;
  }

  .kePublic_back {
    width: 85vw;
    position: absolute;
    top: 20vw;
    left: 6vw;
    z-index: -1;
  }

  .bounceIn {
    -webkit-animation-name: bounceIn;
    animation-name: bounceIn;
  }

  .img_2_2 {
    width: 15vw;
    position: absolute;
    top: 6vw;
    right: 7vw;
    animation-delay: 0.5s;
    animation-duration: 1s;
    z-index: 2;
  }

  @-webkit-keyframes bounceIn {
    0% {
      opacity: 0;
      -webkit-transform: scale(.3);
      transform: scale(.3)
    }

    50% {
      opacity: 1;
      -webkit-transform: scale(1.05);
      transform: scale(1.05)
    }

    70% {
      -webkit-transform: scale(.9);
      transform: scale(.9)
    }

    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1)
    }
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      -webkit-transform: scale(.3);
      -ms-transform: scale(.3);
      transform: scale(.3)
    }

    50% {
      opacity: 1;
      -webkit-transform: scale(1.05);
      -ms-transform: scale(1.05);
      transform: scale(1.05)
    }

    70% {
      -webkit-transform: scale(.9);
      -ms-transform: scale(.9);
      transform: scale(.9)
    }

    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1)
    }
  }

  .draw-history-box {
    position: relative;
    width: 75%;
    margin: 30px auto;
    color: #EECFCF;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    display: block;
    border-radius: 4px;
  }

  .draw-history {
    max-height: 37vw;
    line-height: 8vw;
    overflow: hidden;
    z-index: 2;
    overflow-y: scroll;
    background: rgba(293, 323, 255, 0.1);
    padding: 0 10px;
  }

  @media only screen and (max-width: 375px) and (max-height: 812px) {
    .draw-history-box {
      margin: 50px auto;
    }

    .draw-history {
      max-height: 50vw;
    }
  }

  @media only screen and (max-width: 375px) and (max-height: 650px) {
    .draw-history-box {
      margin: 20px auto;
    }

    .draw-history {
      max-height: 35vw;
    }
  }

  .draw-history-title {
    height: 45px;
    line-height: 45px;
  }

  .draw-history-list li {
    line-height: 25px; /*关键样式*/
    font-size: 14px;
    width: 100%;
    text-align: center;
    margin-top: 5px;
    display: block;
    max-height: 45px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;

  }
</style>
