<template>
  <div class="qrCode" v-show="qrImg">
    <h2>进入售后逸</h2>
    <div class="press">
      <span>请长按"识别图中小程序码"</span>
    </div>
    <div class="Dynamic-code">
      <img v-if="data.content" :src="'data:image/jpeg;base64,' + qrCode"/>
      <!--<img v-else src="/static/fixed-code.jpg"/>-->
      <!--<img v-else src="/static/fixed-code.png"/>-->
      <img v-else src="../../../static/fixed-code.png"/>
    </div>
    <div class="content">
      <p>您的专属小程序码, 不要分享给其他人使用</p>
      <p>以防泄露个人信息</p>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index2'

  export default {
    name: 'index',
    data () {
      return {
        data: [],
        qrCode: '',
        qrImg: false
      }
    },
    async created () {
      await this.getQrCode()
      this.qrImg = true
    },
    methods: {
      async getQrCode () {
        this.data = await api.getQrCode()
        if (this.data.isOk) {
          if (!this.data.content) {
            // 显示固定二维码
          } else {
            // 显示动态二维码,content内容
            this.qrCode = this.data.content
          }
        }
      }
    }
  }
</script>

<style scoped>
  .qrCode {
    text-align: center;
    padding-top: 27%;
    box-sizing: border-box;
    background: #fff;
    height: 100vh;
  }

  .press {
    font-size: 14px;
    color: #606266;
  }

  .Dynamic-code img {
    width: 200px;
    height: 200px;
    margin-top: 13%;
  }

  .content {
    margin-top: 17%;
    font-size: 12px;
  }

  .content p {
    color: #888;
    line-height: 20px;
  }

  h2 {
    font-family: Monospace;
    line-height: 40px;
  }
</style>
