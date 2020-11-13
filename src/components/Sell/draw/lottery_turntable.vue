<template>
  <div class="banner">
    <div class="turnplate">
      <canvas class="item" id="wheelCanvas" width="422px" height="422px"></canvas>
      <img id="pointer" class="pointer" :src="imgSrc" @click.once="startGame()"/>
    </div>
    <img :src="lightningImg" id="shan-img" style="display:none;"/>
    <img :src="sorryImg" id="sorry-img" style="display:none;"/>
    <div class="tips-center" v-if="msgTips">
      <h2 class="tips-title">抽奖结果</h2>
      <p class="tips-p">{{awardName.replace('未中奖', '谢谢参与')}}</p>
      <button @click="goToPageMyOrder()" class="msgbox-confirm-btn">确定</button>
    </div>
    <div class="tips-bg" v-if="msgTips"></div>
  </div>
</template>
<script>
  import LotteryDial from './dial'
  import api from '../../../api/index2'
  import { MessageBox } from 'mint-ui'
  import { loadData, defaultPreHandler } from '../../../common/utils'
  import _ from 'lodash'

  export default {
    components: {},
    props: {
      restaraunts: Array,
      colors: Array,
      exciteId: Number
    },
    data () {
      return {
        imgSrc: '/static/draw/turnplate-pointer.png',
        lightningImg: '/static/draw/1.png',
        sorryImg: '/static/draw/2.png',
        lottery: null,
        hotList: this.restaraunts,
        turnPlate: {
          outsideRadius: 192, // 大转盘外圆的半径
          textRadius: 145, // 大转盘奖品位置距离圆心的距离
          insideRadius: 68, // 大转盘内圆的半径
          startAngle: 1.5 * Math.PI // 开始角度
        },
        orderId: '',
        msgTips: false,
        excitationId: this.exciteId,
        awardName: ''
      }
    },
    async created () {
      this.orderId = this.$route.query.orderId
    },
    async mounted () {
      this.loadImg(() => {
        this.drawRouletteWheel()
      })
    },
    methods: {
      drawRouletteWheel () {
        let canvas = document.getElementById('wheelCanvas')
        let turnPlate = this.turnPlate
        if (!canvas.getContext) {
          return
        }
        // 根据奖品个数计算圆周角度
        let arc = Math.PI / (this.restaraunts.length / 2)
        let ctx = canvas.getContext('2d')
        // 在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, 422, 422)
        // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
        ctx.strokeStyle = '#FFBE04'
        // font 属性设置或返回画布上文本内容的当前字体属性
        ctx.font = '16px Microsoft YaHei'
        for (let i = 0; i < this.restaraunts.length; i++) {
          let angle = turnPlate.startAngle + i * arc
          ctx.fillStyle = this.colors[i]
          ctx.beginPath()
          // arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
          ctx.arc(211, 211, turnPlate.outsideRadius, angle, angle + arc, false)
          ctx.arc(211, 211, turnPlate.insideRadius, angle + arc, angle, true)
          ctx.stroke()
          ctx.fill()
          // 锁画布(为了保存之前的画布状态)
          ctx.save()

          // ----绘制奖品开始----
          ctx.fillStyle = '#E5302F'
          let text = this.restaraunts[i]
          let lineHeight = 17
          // translate方法重新映射画布上的 (0,0) 位置
          ctx.translate(211 + Math.cos(angle + arc / 2) * turnPlate.textRadius, 211 + Math.sin(angle + arc / 2) * turnPlate.textRadius)

          // rotate方法旋转当前的绘图
          ctx.rotate(angle + arc / 2 + Math.PI / 2)

          /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
          if (_.indexOf(text, 'M') > 0) { // 流量包
            let texts = _.split(text, 'M')
            for (let j = 0; j < texts.length; j++) {
              ctx.font = j === 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei'
              if (j === 0) {
                ctx.fillText(texts[j] + 'M', -ctx.measureText(texts[j] + 'M').width / 2, j * lineHeight)
              } else {
                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * lineHeight)
              }
            }
          } else if (_.indexOf(text, 'M') === -1 && text.length > 6) { // 奖品名称长度超过一定范围
            text = text.substring(0, 6) + '||' + text.substring(6)
            let texts = _.split(text, '||')
            for (let j = 0; j < texts.length; j++) {
              ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * lineHeight)
            }
          } else {
            // 在画布上绘制填色的文本。文本的默认颜色是黑色
            // measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0)
          }

          // 添加对应图标
          // if (text.indexOf('三等奖-哈士奇一只') > 0) {
          //   let img = document.getElementById('shan-img')
          //   ctx.drawImage(img, -15, 10)
          // } else if (text.indexOf('谢谢参与') >= 0) {
          //   let img = document.getElementById('sorry-img')
          //   ctx.drawImage(img, -15, 10)
          // }
          // 把当前画布返回（调整）到上一个save()状态之前
          ctx.restore()
          // ----绘制奖品结束----
        }
      },
      async getDraw () {
        let params = {
          orderId: this.orderId,
          excitationId: this.exciteId
        }
        await loadData(() => {
          return api.postDraw(params)
        }, (drawResult) => {
          this.awardName = drawResult.awardName
        }, defaultPreHandler, true)
      },
      async prepareLottery () {
        // let turnPlate = this.turnPlate
        let lottery = new LotteryDial(document.getElementById('wheelCanvas'), { // eslint-disable-line
          speed: 30, // 每帧速度
          areaNumber: this.restaraunts.length // 奖区数量
        })
        var vm = this
        lottery.on('start', () => {
          // 请求获取中奖结果
          var index = _.indexOf(vm.restaraunts, vm.awardName)
          if (index >= 0) {
            lottery.setResult(vm.restaraunts.length - 1 - index)
          } else {
            lottery.setResult(vm.restaraunts.length - 1)
          }
        })
        // 中奖区
        lottery.on('end', () => {
          this.msgTips = true
        })
        lottery.draw()
      },
      goToPageMyOrder () {
        this.$router.go(-1)
      },
      async startGame () {
        await loadData(() => {
          return api.getDraw(this.orderId)
        }, async (drawState) => {
          if (drawState) {
            let vue = this
            await this.getDraw()
              .catch((err) => {
                if (err.name === 'RequestTimeoutError') {
                  MessageBox.confirm('当前网络较弱，是否重新抽奖?').then(async () => {
                    await vue.startGame()
                  })
                }
              })
            if (this.awardName) {
              await vue.prepareLottery()
            }
          }
        }, defaultPreHandler, true)
      },
      loadImg (suc) {
        let c = 0
        let images = [document.getElementById('shan-img'), document.getElementById('sorry-img')]
        for (let i = 0, len = images.length; i < len; i++) {
          (function loadImage (image) {
            image.onload = function () {
              c++
              c === images.length && suc && suc()
            }
          })(images[i])
        }
      }
    },
    watch: {
      hotList: function () {
        this.drawRouletteWheel()
        // this.prepareLottery()
      }
    }
  }
</script>
<style scoped>
  .banner {
    display: block;
    width: 80%;
    height: 100%;
    margin: 15vw auto auto;
  }

  .item {
    background: rgba(255, 255, 255, 0); /*关键点*/
  }

  .banner .turnplate {
    display: block;
    width: 100%;
    height: auto;
    position: relative;
    margin: 0 auto;
    background-image: url('/static/draw/turnplate-bg.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
  }

  .banner .turnplate img.pointer {
    position: absolute;
    width: 31.5%;
    height: 42.5%;
    left: 34.6%;
    top: 23%;
  }

  .banner .turnplate canvas.item {
    width: 100%;
  }

  .tips-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
    z-index: 888;
  }

  .tips-center {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    width: 70%;
    border-radius: 3px;
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .2s;
    transition: .2s;
    z-index: 9999;
  }

  .tips-center a {
    text-decoration: none;
  }

  .msgbox-confirm-btn {
    line-height: 40px;
    display: block;
    background-color: #fff;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 0;
    border: 0;
    color: #26a2ff;
    width: 100%;
    font-size: 14px;
  }

  .msgbox-confirm-btn:active {
    color: #26a2ff;
    background-color: #ffffff;
  }

  .msgbox-confirm-btn:focus {
    outline: none;
  }

  .tips-title {
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    padding: 10px;
    background: #E5302F;
  }

  .tips-p {
    padding: 20px 0;
    text-align: center;
    color: #888;
  }

</style>
