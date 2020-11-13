<template>
  <div class="specification">

    <van-divider :style="{  padding: '0 50px',borderColor: '#c1c1c1'}">
      {{title}}
    </van-divider>

    <div class="specification-content">
      <van-radio-group v-model="value"
                       @change="onChangeRadio"
                       class="specification-radio ">
        <van-radio :name="item.label" v-for="(item, index) in spec" :key="index" class="specification-radio-item">
          <span class="label" :class="{blueCheck:value === item.label}">{{item.label}}</span>
          <span
            slot-scope="props"
            slot="icon" :class="{blue:props.checked}" class="border"></span>
          <!--          <i></i>-->
        </van-radio>
      </van-radio-group>
    </div>

  </div>
</template>

<script>
  import {RadioGroup, Radio, Divider} from 'vant'

  export default {
    name: "specification",
    components: {
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
      [Divider.name]: Divider
    },
    model: {
      prop: 'optionsValue', // prop说:我要将value作为该组件被使用(被父组件调用)时,v-model能取到的值
      event: 'change' // event说:我emit(触发)change的时候，参数的值就是父组件v-model收到的值。
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
    },
  }
</script>

<style scoped>
  .specification {
    text-align: center;
  }

  .label {
    margin: 0 auto;
    display: inline-block;
    width: 100%;
    margin-bottom: 2px;
    text-align: center;
    font-size: 14px;
  }

  .specification {
    position: relative;
    /*margin: 1rem auto;*/
    text-align: center;
  }

  .blueCheck {
    color: #1989FA;
  }

  .border {
    position: absolute;
    width: 45vw;
    height: 95%;
    top: 0;
    border-radius: 10px;
    border: 1px solid #c1c1c1;
  }

  .specification .line-left {
    display: block;
    height: 1px;
    background: #e1e1e1;
    position: absolute;
    top: 0.9rem;
    left: 65px;
    width: 20%;
  }

  .specification .line-right {
    display: block;
    height: 1px;
    background: #e1e1e1;
    position: absolute;
    top: 0.9rem;
    right: 65px;
    width: 20%;
  }

  .specification p {
    display: inline-block;
    font-size: 0.75rem;
    color: #c1c1c1;
    padding: 0 1.875rem;
    text-align: center;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    line-height: 30px;
  }

  .blue {
    border: 1px solid #1989FA;
  }

  .specification-radio {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 5px;
  }

  .specification-radio-item{
    width: 47vw;
    box-sizing: border-box;
    margin-bottom: 10px;
    text-align: center;
    padding: 5px 2px;
    position: relative;
    margin-right: 1%;
  }



</style>
