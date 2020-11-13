<template>
  <div class="process_wrap">
    <mt-cell title="服务流程" class="process_title"/>
    <div class="process_main">
      <div class="process_item" v-for="(item, index) in processData" :key="index">
        <div class="process_content">
          <span><i :class="item.icon" class="iconfont font_style" aria-hidden="true"></i></span>
          <span class="process_bottom">{{item.title}}</span>
        </div>
        <div class="arrow" v-if="index !== processData.length -1 ">
          <van-icon name="ellipsis" size="16px"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Cell} from 'mint-ui'
  import {Icon} from 'vant'
  import {ServiceType} from 'enum/zwsResource'

  export default {
    name: "process",
    components: {
      [Cell.name]: Cell,
      [Icon.name]: Icon
    },
    props: {
      serviceType: {
        type: Number,
        default: 0
      },
    },
    computed: {
      processData() {
        if (this.serviceType === ServiceType.电器回收) {
          return [
            {
              title: '在线下单',
              icon: 'icon-wj-wj-1',
            },
            {
              title: '预约上门',
              icon: 'icon-yuyue',
            },
            {
              title: '专业质检',
              icon: 'icon-zhijianyuebao',
            },
            {
              title: '支付钱款',
              icon: 'icon-daizhifudingdan',
            }
          ]
        } else {
          return [
            {
              title: '预约上门',
              icon: 'icon-yuyue',
            },
            {
              title: '专业检测',
              icon: 'icon-zhijianyuebao',
            },
            {
              title: '现场修复',
              icon: 'icon-buoumaotubiao',
            },
            {
              title: '打分评价',
              icon: 'icon-wj-wj-1',
            }
          ]
        }
      },
      data() {
        return {}
      }
    }
  }
</script>

<style scoped>
  .process_main {
    padding: 0 10px 10px;
    display: flex;
    justify-content: space-between;
  }

  .font_style {
    color:#aaa;
    font-size: 3rem;
  }

  .process_title {
    font-weight: bold;
  }

  .process_item {
    position: relative;
  }

  .arrow {
    position: absolute;
    top: 55%;
    left: 130%;
    transform: translateX(-50%) translateY(-50%);
  }

  .process_content {
    display: inline-block;
    padding: 4px 8px;
    /*border-radius: 6px;*/
    /*border: solid 1px #888;*/
  }

  .process_bottom {
    color:#aaa;
    display: block;
  }
</style>

<style>
  .process_wrap .mint-cell-wrapper {
    font-size: 12px;
  }
</style>
