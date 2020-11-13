<template>
  <div class="wl-list">
    <div v-if="!logisticsOrderDynamics || logisticsOrderDynamics.length===0">
      <ul>
        <li>
          <p>未发货,请等待</p>
          <span class="circle"></span>
        </li>
      </ul>
    </div>

    <ul v-for="(waybill, index) in logisticsOrderDynamics" :key="index">
      <li :class="{'first': index === 0}">
        <p :class="waybill.context.indexOf('已签收') < 0 ? '' : 'color-blue'" v-html="getContent(waybill.context)"></p>
        <p class="time">{{waybill.time}}</p>
        <span class="circle"></span>
        <span class="line"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'logistics_order_track',
    props: {
      logisticsOrderDynamics: {
        type: Array,
        default: []
      }
    },
    methods: {
      getContent (content) {
        let mobile = content.match(/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/ig)
        if (mobile) {
          return content.replace(mobile, '<span class=\'color-blue\'>' + mobile + '</span>')
        }
        return content
      }
    }
  }
</script>

<style>
  /* 进度 */
  .wl-list {
    background: #FFFFFF;
    width: 95%;
    margin: auto;
  }
  .wl-list ul{
    background-image: -webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: bottom;
    padding-left: 33px;
    overflow: hidden;
    padding-top: 8px;
  }

  .wl-list ul li {
    position: relative;
    border-bottom: 1px solid #f5f5f5;
    color: #333;
    margin-bottom: 8px;
    list-style-type: none;
  }

  .wl-list ul li p:first-child {
    background: #F9F9F9;
    padding: .7rem .5rem;
    font-size: 14px;
  }

  .wl-list ul li .time {
    padding: .4rem .5rem;
    font-size: 14px;
  }

  .wl-list .circle {
    position: absolute;
    left: -16px;
    top: 0.8em;
    width: 8px;
    height: 8px;
    background: #ccc;
    border-radius: 50%;
  }

  .wl-list .line {
    position: absolute;
    left: -17px;
    top: 2rem;
    height: 82%;
    width: 0;
    border-left: 2px solid #ccc;
  }

  .wl-list ul li.first p:first-child {
    color: #3385ff;
  }

  .wl-list ul li.first .circle {
    width: 9px;
    height: 9px;
    background: #3385FF;
  }
  .wl-list .color-blue {
    color: #3385ff;
  }
</style>
