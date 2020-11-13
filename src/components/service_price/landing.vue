<template>
  <div class="landing_wrap">
    <div class="title">
      <span>用户自助估价下单，30分钟预约上门</span>
    </div>
    <div class="qr_wrap">
      <div class="qr_content">
        <qrcode-vue
          id="qrcodeBox"
          v-if="isDrow"
          :text="qrcodeVue.url"
          :size="qrcodeVue.size"
          :logoSrc="qrcodeVue.logo"
          colorDark="#3175a0"
          colorLight="#ffffff"
          :margin="5"
        />
      </div>
      <div class="qr_desc">电器免费上门回收下单码</div>
    </div>
    <div class="button_wrap">
      <van-button type="primary" block color="#5d7cb7" @click="goToPageServiceCatalog">代客下单/收费标准</van-button>
    </div>
  </div>
</template>

<script>
import qrcodeVue from "vue-qr"
import { Button } from 'vant'
import { SP_API_ROOT } from '../../api/config'

export default {
  name: 'landing',
  components: {
    qrcodeVue,
    [Button.name]: Button
  },
  data() {
    return {
      isDrow: false,
      qrcodeVue: {
        size: 170,
        url: "",	//二维码地址
        logo: "../../../static/64x64.png"	//logo图片
      }
    }
  },
  created() {
    this.getQrcodeHandler()
  },
  methods: {
    getQrcodeHandler() {
      this.isDrow = true
      let partnerId = ''
      let zanPersonId = window.localStorage.getItem('zanPersonId') || ''
      let ticket = ''
      // this.qrcodeVue.url = 'http://svspltfm.fusion.dev1.zanservice.com/?partnerId=1&uuid=1&ticket=147#/'
      this.qrcodeVue.url = `${SP_API_ROOT}/?partnerId=${partnerId}&uuid=${zanPersonId}&ticket=${ticket}#/customerCreateOrder`
    },
    goToPageServiceCatalog() {
      this.$router.push({
        name: 'ServiceCatalog',
        query: {}
      })
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  color: #323233;
  padding: 35px 15px 40px;
}
.qr_wrap {
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.qr_content {
  width: 50%;
  height: 50%;
}
.qr_content img {
  display: block;
  width: 100%;
  height: 100%;
}
.qr_desc {
  margin-top: 18px;
  color: #949090;
  font-size: 14px;
}
.button_wrap {
  box-sizing: border-box;
  padding: 40px 30px;
}
</style>
