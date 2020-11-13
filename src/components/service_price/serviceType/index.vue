<template>
  <div>
    <step :active="0" ></step>
    <van-row >
    <van-col span="6">
      <van-sidebar v-model="activeKey" style="width: 100%;"  @change="onChange">
        <van-sidebar-item  v-for="(key,value) in serviceType" :key="key" :title="value"/>
      </van-sidebar>
    </van-col>
    <van-col span="18">
      <div>
        <van-grid>
          <van-grid-item
            v-for="item in currentCategoryList"
            :key="item.name"
            :text="item.name"
            @click="redirectToServiceType(item.name)"
          >
            <svg class="icon" aria-hidden="true" slot="icon">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
          </van-grid-item>
        </van-grid>
      </div>
    </van-col>
  </van-row>
  </div>
</template>

<script>
  import {Sidebar, SidebarItem, RadioGroup, Radio, Row, Col, Grid, GridItem} from 'vant'
  import step from '../price_standard/step'
  import {ServiceType} from 'enum/zwsResource'
  import {recycleData} from 'priceTable'
  import _ from 'lodash'
  export default {
    name: "index",
    components:{
      step,
      [Radio.name]: Radio,
      [Grid.name]: Grid,
      [GridItem.name]: GridItem,
      [Row.name]: Row,
      [Col.name]: Col,
      [RadioGroup.name]: RadioGroup,
      [Sidebar.name]: Sidebar,
      [SidebarItem.name]: SidebarItem,
    },
    data() {
      return {
        recycleData:recycleData,
        serviceType:ServiceType,
        currentCategoryList:[],
        activeKey: 0
      }
    },
    mounted () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    created() {
      this.currentCategoryList = this.recycleData.root.data
    },
    methods: {
      redirectToServiceType (category) {
        this.$router.push({
          name:'priceStandard',
          params:{
            serviceType: this.activeKey,
            category,
          },
        })
      },
      onChange(index) {
        if(index === 2){
          this.currentCategoryList = [
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
          ]
        } else if (index === 3){
          this.currentCategoryList = [
            {name:'冰箱',icon:'icontubiaozhizuomoban-'},
            {name:'空调',icon:'icons_air_conditionor'},
            {name:'油烟机',icon:'iconProducts__youyanji-'},
            {name:'洗衣机',icon:'iconxiyiji'},
          ]
        } else if (index === 1){
          this.setBreakdownMaintenanceList()
        } else if (index === 0) {
          this.currentCategoryList = this.recycleData.root.data
        }
      },
      setBreakdownMaintenanceList () {
        this.currentCategoryList = [
          {name:'冰箱',icon:'icontubiaozhizuomoban-'},
          {name:'除湿器',icon:'iconchushiji'},
          {name:'电饼铛',icon:'icondianbingdang--'},
          {name:'电磁炉',icon:'iconweibiaoti-'},
          {name:'电饭煲',icon:'icondianfanbao'},
          {name:'电风扇',icon:'icondianfengshan'},
          {name:'电暖炉',icon:'icondiannuanqi'},
          {name:'电视',icon:'icondianshi'},
          {name:'电压力锅',icon:'icondianyaliguo'},
          {name:'挂烫机',icon:'iconguatangji'},
          {name:'烘干机',icon:'iconhongganji'},
          {name:'回水器',icon:'iconhuishuijiancha'},
          {name:'加湿器',icon:'icontianjiashebei-jiashiqi'},
          {name:'搅拌机',icon:'iconmixer'},
          {name:'净化器',icon:'iconjinghuaqi_biaozhun'},
          {name:'净水器',icon:'iconjingshuiqi'},
          {name:'咖啡机',icon:'iconkafeiji'},
          {name:'烤箱',icon:'iconkaoxiang1'},
          {name:'空调',icon:'icons_air_conditionor'},
          {name:'空调扇',icon:'iconkongtiaoshan'},
          {name:'料理机',icon:'iconliaoliji'},
          {name:'面包机',icon:'iconmianbaoji--'},
          {name:'燃气灶',icon:'iconranqizao'},
          {name:'热水器',icon:'iconreshuiqi'},
          {name:'甩干机',icon:'iconhongganji_'},
          {name:'微波炉',icon:'iconweibolu'},
          {name:'吸尘器',icon:'iconxichenqi'},
          {name:'洗碗机',icon:'iconxiwanji'},
          {name:'洗衣机',icon:'iconxiyiji'},
          {name:'消毒柜',icon:'iconxiaodugui'},
          {name:'饮水机',icon:'iconyinshuiji'},
          {name:'油汀',icon:'iconyoutingqunuan'},
          {name:'油烟机',icon:'iconProducts__youyanji-'},
          {name:'榨汁机',icon:'iconzhazhiji'},
        ]
      },
    },
  }
</script>

<style scoped>
.border{
  border:1px solid #d9d9d9;
  content: '';
}

.icon{
  width: 20px;
  height: 20px;
  text-align: center;
  vertical-align: middle
}
</style>
