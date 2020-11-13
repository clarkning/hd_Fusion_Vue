<template>
    <div>
      <div class="banner">
        <mt-swipe :auto="4000" style="height: 40vw;">
          <mt-swipe-item><img class="image" src="../../../../static/banner1.png" alt=""></mt-swipe-item>
          <mt-swipe-item><img class="image" src="../../../../static/banner2.png" alt=""></mt-swipe-item>
          <mt-swipe-item><img class="image" src="../../../../static/banner3.png" alt=""></mt-swipe-item>
        </mt-swipe>
      </div>
      <div>
        <div class="title van-hairline--top eleGreen">电器回收</div>
        <van-grid>
          <van-grid-item
            v-for="(item, index) in menu.recycleData"
            :key="index"
            @click="redirectToServiceType(item.name, 0)"
          >
            <span slot="text" style="font-size: 14px">{{item.name}}</span>
            <svg class="icon" aria-hidden="true" slot="icon">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
          </van-grid-item>
        </van-grid>
      </div>
      <div>
        <div class="title van-hairline--top">故障维修</div>
        <van-grid>
          <van-grid-item
            v-for="(item, index) in menu.breakdownMaintenance"
            :key="index"
            @click="redirectToServiceType(item.name, 1)"
          >
            <span slot="text" style="font-size: 14px">{{item.name}}</span>
            <svg class="icon" aria-hidden="true" slot="icon">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
          </van-grid-item>
        </van-grid>
      </div>
      <div>
        <div class="title van-hairline--top violet">拆卸安装</div>
        <van-grid>
          <van-grid-item
            v-for="(item, index) in menu.install"
            :key="index"
            @click="redirectToServiceType(item.name, 2)"
          >
            <span slot="text" style="font-size: 14px">{{item.name}}</span>
            <svg class="icon" aria-hidden="true" slot="icon">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
          </van-grid-item>
        </van-grid>
        <!--        </mt-tabbar>-->
      </div>
      <div>
        <div class="title van-hairline--top eleBlue">清洗保养</div>
        <van-grid>
          <van-grid-item
            v-for="(item, index) in menu.rinse"
            :key="index"
            @click="redirectToServiceType(item.name, 3)"
          >
            <span slot="text" style="font-size: 14px">{{item.name}}</span>
            <svg class="icon" aria-hidden="true" slot="icon">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
          </van-grid-item>
        </van-grid>
        <!--        </mt-tabbar>-->
      </div>
    </div>
</template>

<script>
  import { Swipe, SwipeItem, Tabbar, TabItem, Navbar } from 'mint-ui'
  import {Grid, GridItem} from 'vant'
  import {recycleData} from 'priceTable'
    export default {
      name: "index",
      components:{
        [Grid.name]: Grid,
        [GridItem.name]: GridItem,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Tabbar.name]: Tabbar,
        [TabItem.name]: TabItem,
        [Navbar.name]: Navbar,
      },
      data() {
        return {
          recycleData:recycleData,
          selected:'冰箱',
          menu:{
            recycleData:[],
            breakdownMaintenance:[
                {name:'冰箱',icon:'icontubiaozhizuomoban-'},
                {name:'电视',icon:'icondianshi'},
                {name:'空调',icon:'icons_air_conditionor'},
                {name:'燃气灶',icon:'iconranqizao'},
                {name:'热水器',icon:'iconreshuiqi'},
                {name:'洗衣机',icon:'iconxiyiji'},
                {name:'油烟机',icon:'iconProducts__youyanji-'},
                {name:'更多',icon:'iconmore'},
            ],
            install:[
                {name:'冰箱',icon:'icontubiaozhizuomoban-'},
                {name:'电视',icon:'icondianshi'},
                {name:'净水器',icon:'iconjingshuiqi'},
                {name:'空调',icon:'icons_air_conditionor'},
                {name:'燃气灶',icon:'iconranqizao'},
                {name:'热水器',icon:'iconreshuiqi'},
                {name:'洗碗机',icon:'iconxiwanji'},
                {name:'洗衣机',icon:'iconxiyiji'},
                {name:'消毒柜',icon:'iconxiaodugui'},
                {name:'油烟机',icon:'iconProducts__youyanji-'},
                {name:'',icon:''},
                {name:'',icon:''},
            ],
            rinse:[
              {name:'冰箱',icon:'icontubiaozhizuomoban-'},
              {name:'空调',icon:'icons_air_conditionor'},
              {name:'油烟机',icon:'iconProducts__youyanji-'},
              {name:'洗衣机',icon:'iconxiyiji'},
            ]
          },
        }
      },
      created() {
        this.menu.recycleData = this.recycleData.root.data
      },
      methods: {
        redirectToServiceType(name, serviceType) {
          if(name === '更多'){
            this.$router.push({
              name:'serviceType'
            })
          } else {
            this.$router.push({
              name:'priceStandard',
              params:{
                serviceType,
                category:name,
              }
            })
          }
        }
      },
    }
</script>

<style scoped>
.banner{
  background: #fff;
}
.image{
  width: 100%;
  max-height: 100%;
}
.icon{
  width: 40px;
  height: 40px;
  text-align: center;
  vertical-align: middle
}
.title{
  background: #fff;
  line-height: 40px;
  position: relative;
  padding-left: 40px;
  font-size: 12px;
  font-weight: bold;
  /*height: 20px;*/
}
.title::before{
  position: absolute;
  left: 5px;
  content: '';
  width: 15px;
  top: 10%;
  height: 30px;
  background: #F5CBA7 ;
}
.eleGreen::before{
  background: #D4EFDF  ;
}
.eleBlue::before{
  background: #AED6F1;
}
.violet::before{
  background: #D7BDE2 ;
}
</style>
