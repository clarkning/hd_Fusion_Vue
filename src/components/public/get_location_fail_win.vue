<template>
  <div class="get_location_fail_win">
    <mt-popup v-model="visible" :lock-scroll="true">
      <div class="mint-msgbox" v-if="fail">
        <div class="mint-msgbox-header">
          <div class="mint-msgbox-title">位置获取失败</div>
        </div>
        <div class="mint-msgbox-content">
          <div class="mint-msgbox-message t-l" v-if="isIOS">无法获取您的地理位置，请到手机【设置>隐私>定位服务】中开启定位服务，并将微信的权限设定为【始终允许】。</div>
          <div class="mint-msgbox-message t-l" v-else>无法获取您的地理位置，请到手机设置中检查微信定位授权是否已开启。</div>
          <router-link class="href" to="/help">查看帮助</router-link>
        </div>
        <div class="mint-msgbox-btns">
          <button class="mint-msgbox-btn mint-msgbox-confirm" @click="visible=false">确认</button>
        </div>
      </div>

      <div class="mint-msgbox" v-else>
        <div class="mint-msgbox-header">
          <div class="mint-msgbox-title">未得到地理位置授权</div>
        </div>
        <div class="mint-msgbox-content">
          <div class="mint-msgbox-message t-l">上传该图片需要获取您的地理位置，请允许获取地理位置授权。</div>
        </div>
        <div class="mint-msgbox-btns">
          <button class="mint-msgbox-btn mint-msgbox-confirm" @click="visible=false">确认</button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  export default {
    name: 'get_location_fail_win',
    data () {
      return {
        visible: false,
        isIOS: false,
        fail: true
      }
    },
    methods: {
      show (fail) {
        this.fail = fail
        let u = navigator.userAgent
        this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        this.visible = true
      }
    }
  }
</script>

<style scoped>
  .t-l {
    margin-bottom: 15px;
  }
  .href {
    color: #26a2ff;
  }
  .mint-msgbox {
    border-radius: 20px;
    font-size: 14px;
  }
  .mint-msgbox-btn {
    font-size: 14px;
  }
</style>
