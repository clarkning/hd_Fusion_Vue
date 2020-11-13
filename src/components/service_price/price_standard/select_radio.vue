<template>
  <div class="select_radio">
    <van-divider :style="{padding: '0 50px',borderColor: '#c1c1c1'}">
      {{title}}
    </van-divider>
    <div class="content">
      <van-radio-group
        v-model="value"
        @change="onChangeRadio"
        class="radio_group">
        <van-radio
          :name="item.label"
          v-for="(item, index) in spec"
          :key="index"
          class="radio_item">
          <span
            class="text"
            :class="[{blueCheck:value === item.label && index === 0},
            {yellowCheck:value === item.label && index === 1},
            {redCheck:value === item.label && index === 2}]"
          >
            {{item.label}}
          </span>
          <p
            class="text desc">
            {{item.desc}}
          </p>
          <span
            slot-scope="props"
            slot="icon"
            :class="[{blue:props.checked && index === 0 },
            {yellow:props.checked && index === 1},
            {red:props.checked && index === 2}]"
            class="border">
          </span>
        </van-radio>
      </van-radio-group>
    </div>
  </div>
</template>

<script>
import { Divider, RadioGroup, Radio, Col, Row } from 'vant'

export default {
  name: 'select_radio',
  components: {
    [Divider.name]: Divider,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Col.name]: Col,
    [Row.name]: Row
  },
  model: {
    prop: 'optionsValue',
    event: 'change'
  },
  props: {
    optionsValue: {
      default: ''
    },
    type: String,
    title: String,
    spec: Array,
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    onChangeRadio(e) {
      this.$emit('change', {name: e, type: this.type})
    }
  }
}
</script>

<style scoped>
  .radio_group {
    display: flex;
    flex-wrap: wrap;
    margin: 10px;
    justify-content: space-between;
  }
  .radio_item {
    width: 30%;
    box-sizing: border-box;
    text-align: center;
    position: relative;
  }
  .radio_item >>> .van-radio__label{
    width: 98.5%;
    height: 98%;
  }
  .text {
    margin: 0 auto;
    display: inline-block;
    width: 100%;
    margin-bottom: 2px;
    text-align: center;
    font-size: 14px;
  }
  .desc{
    color:#aaa
  }
  .radio_group >>> .van-radio__label {
    margin-left: 0;
  }
  .border{
    position: absolute;
    left: 0;
    top: 0;
    width: 97.5%;
    height: 97%;
    border-radius: 10px;
    border: 1px solid #c1c1c1;
  }
  .blueCheck {
    color: #68b570;
  }
  .yellowCheck{
    color: #E6A23C;
  }
  .redCheck{
    color: #F56C6C;
  }
  .yellow{
    border: 1px solid #E6A23C;
  }
  .red{
    border: 1px solid #F56C6C;
  }
  .blue {
    border: 1px solid #68b570;
  }
</style>
