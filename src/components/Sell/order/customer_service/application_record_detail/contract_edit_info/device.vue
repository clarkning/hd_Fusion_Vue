<template>
  <div v-if="showDeviceInfo">
    <div class="header">设备信息</div>
    <div>
      <mt-cell v-if="deviceInfo[7]" title="品类">{{deviceInfo[7]}}</mt-cell>
      <mt-cell v-if="deviceInfo[8]" title="品牌">{{deviceInfo[8]}}</mt-cell>
      <mt-cell v-if="deviceInfo[9]" title="型号">{{deviceInfo[9]}}</mt-cell>
      <mt-cell v-if="deviceInfo[10]" title="序列号/机编">{{deviceInfo[10]}}</mt-cell>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'device',
    props: {
      deviceInfo: {
        type: Object,
        default: () => {
          return {
          }
        }
      }
    },
    computed: {
      showDeviceInfo () {
        return !_.isEmpty(this.deviceInfo)
      }
    }
  }
</script>

<style scoped>

</style>
