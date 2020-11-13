<template>
<div class="price-standard-wrap">
  <!-- 电器回收价格标准 -->
  <div v-if="currentServiceType === serviceTypeEnum.电器回收">
    <priceRecovery/>
  </div>
  <!-- 非电器回收价格标准 -->
  <div class="price-standard-container" v-else>
    <step :active="1" :category="{category:category,serviceType:currentServiceType}"></step>
    <div>
      <specification v-if="filterData.spec1.list.length" @change="onChange1" :type="'Spec1'"
                     v-model="filterData.spec1.value" ref="specification" :title="'规格1'"
                     :spec="filterData.spec1.list"></specification>
      <specification v-if="filterData.spec2.list.length" :type="'Spec2'" @change="onChange2"
                     v-model="filterData.spec2.value" ref="specification" :title="'规格2'"
                     :spec="filterData.spec2.list"></specification>
      <specification v-if="filterData.spec3.list.length && filterData.spec2.value" :type="'Spec3'" @change="onChange3"
                     v-model="filterData.spec3.value" ref="specification" :title="'规格3'"
                     :spec="filterData.spec3.list"></specification>
      <specification v-if="malfunctionShow" :type="'Malfunction'" @change="onChange4"
                     v-model="filterData.malfunction.value" ref="specification" :title="'故障'"
                     :spec="filterData.malfunction.list"></specification>
    </div>

    <div v-if="priceTableList.length">

      <van-divider :style="{  padding: '0 50px',borderColor: '#c1c1c1'}">
        预估方案及费用
      </van-divider>

      <div class="fee-table">
        <priceList ref="priceList" :tableData="priceTableList"></priceList>
      </div>
    </div>

    <div class="banner" v-if="priceTableList.length">
      <img class="image" src="../../../../static/banner3.png">
    </div>

    <div class="expenses" v-if="priceTableList.length">
      <div class="cell">
        <span class="cell-title">费用说明:</span>
        <div class="content">
          <span>1.上门费：用于维修及安装服务的交通。工程师上门后，用户主动放弃维修时照常收取。</span>
        </div>
        <div class="content">
          <span>2.销售商品、以旧换新费用单独核算。</span>
        </div>
        <div class="content">
          <span>3.以上费用均不包含搬运费、运输费等。</span>
        </div>
        <div class="content">
          <span>4.为了保障您的合法权益和服务质量，避免不必要的损失，请您切勿与工程师私下交易（否则将丧失平台提供的安全和质量保障）。</span>
        </div>
        <div class="content">
          <span>5.维修后保修90天，更换辅件（机器正常）不保修。</span>
        </div>
        <div class="content">
          <span>6.动物破坏、电源问题、进液、人为因素、私自拆机、外观件等不在保修范围。</span>
        </div>
        <div class="content">
          <span>7.清洗订单不提供维修服务；维修订单不提供清洗服务；如增加服务，请另行下单。</span>
        </div>
        <div class="content">
          <span>8.用户主动要求在20：00-22：00上门服务，农历腊月二十四至正月初八期间，所有订单加收30，与加急费累加。</span>
        </div>
        <div class="content">
          <span>9.预先购买【上门卡】用户不收取上门费，【返还型延保】用户权益可使用。如维修通用券、品类券。例：顾客王先生提前办理返还型延保和上门卡，维修共计应收费为（上门费30元+维修费350元，共计380元），上门卡抵扣30元，100元维修通用券抵扣100元，实际收费仅250元，累计抵扣130元。</span>
        </div>
        <div class="content">
          <span>10.如有疑问，请咨询客服。电话：400-0810-819</span>
        </div>
      </div>
    </div>

    <div class="btn-box">
      <van-button class="btn" type="info" size="large" @click="onclickAppointment ">预约服务</van-button>
    </div>
    <div class="cell-title center padding_bottom10">全品类服务优惠券可用</div>

  </div>
</div>
</template>

<script>
  import {RadioGroup, Radio, Button, Divider} from 'vant'
  import priceRecovery from './recovery/index'
  import step from './step'
  import priceList from "./price_list"
  import {ServiceTypeShow, ServiceType} from 'enum/zwsResource'
  import _ from "lodash"
  import {priceTable} from 'priceTable'
  import specification from "./specification";

  export default {
    name: "price_standard",
    components: {
      step,
      priceRecovery,
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
      [Button.name]: Button,
      [Divider.name]: Divider,
      priceList,
      specification
    },
    data() {
      return {
        active: 1,
        serviceType: _.invert(ServiceType),
        serviceTypeEnum: ServiceType,
        category: this.$route.params.category,
        currentServiceType: Number(this.$route.params.serviceType),
        serviceTypeShow: _.invert(ServiceTypeShow),
        activeIcon: 'https://img.yzcdn.cn/vant/user-active.png',
        inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png',
        priceTable: priceTable,
        specNum: 0,
        filterSpec1: null,
        filterSpec2: null,
        filterSpec3: null,
        malfunctionShow: false,
        filterData: {
          spec1: {
            list: [],
            value: '',
          },
          spec2: {
            list: [],
            value: '',
          },
          spec3: {
            list: [],
            value: '',
          },
          malfunction: {
            list: [],
            value: '',
          }
        },
        allSpecs: [],
        allMeasures: [],
        serviceCategoriesMeasures: [],
        priceTableList: [],
        onlyMeasures: []
      }
    },
    created() {
      if (this.currentServiceType !== this.serviceTypeEnum.电器回收) {
        // 当前服务类型为 非电器回收 时加载
        this.initData()
        this.initMalfunction()
        this.loadPriceListOnly()
        this.createdMalfunctionShow()
      }
    },
    computed: {},
    methods: {
      createdMalfunctionShow() {
        if (this.currentServiceType === this.serviceTypeEnum.故障维修 && !this.filterData.spec1.list.length) {
          this.malfunctionShow = true
        }
      },
      onChange1() {
        this.priceTableList = []
        if (this.filterSpec1 && this.filterData.spec1.value) {
          let currentSpec1 = _.filter(this.filterSpec1, item => {
            return item.Name === this.filterData.spec1.value.name
          })
          if (currentSpec1.length) {
            this.filterSpec2 = currentSpec1[0].Spec2
            let spec2 = _.map(currentSpec1[0].Spec2, item => {
              return {
                Name: item.Name,
                label: item.Name
              }
            })
            this.filterData.spec2.list = spec2
          } else {
            this.filterData.spec2.list = []
          }
          if (!this.filterData.spec2.list.length) {
            this.specNum = 1
          }
          if (!this.filterData.spec2.list.length && this.currentServiceType === this.serviceTypeEnum.故障维修) {
            this.malfunctionShow = true
          }

          if ((this.currentServiceType !== this.serviceTypeEnum.故障维修) || this.filterData.malfunction.value) {
            this.initServiceCategories()
          }

        }
      },
      onChange2() {
        this.priceTableList = []
        if (this.filterSpec2 && this.filterData.spec2.value) {
          let currentSpec2 = _.filter(this.filterSpec2, item => {
            return item.Name === this.filterData.spec2.value.name
          })
          if (currentSpec2.length) {
            this.filterSpec3 = currentSpec2[0].Spec3
            let spec3 = _.map(currentSpec2[0].Spec3, item => {
              return {
                Name: item.Name,
                label: item.Name
              }
            })
            this.filterData.spec3.list = spec3
          } else {
            this.filterData.spec3.list = []
          }
          if (!this.filterData.spec3.list.length) {
            this.specNum = 2
          }
          if (!this.filterData.spec3.list.length && this.currentServiceType === this.serviceTypeEnum.故障维修) {
            this.malfunctionShow = true
          }
          if ((this.currentServiceType !== this.serviceTypeEnum.故障维修) || this.filterData.malfunction.value) {
            this.initServiceCategories()
          }
        }
      },
      onChange3() {
        this.priceTableList = []
        if (this.filterData.spec3.value) {
          this.specNum = 3
        }
        if (this.filterData.spec3.value && this.currentServiceType === this.serviceTypeEnum.故障维修) {
          this.malfunctionShow = true
        }
        if ((this.filterData.spec3.value && this.currentServiceType !== this.serviceTypeEnum.故障维修)
           || this.filterData.malfunction.value) {
          this.initServiceCategories()
        }
      },
      onChange4() {
        this.priceTableList = []
        if (this.filterData.malfunction.value
              && this.currentServiceType === this.serviceTypeEnum.故障维修
              && !this.filterData.spec1.list.length) {
          let filterMeasures = _.filter(this.allMeasures, item => {
            return item.Name === this.filterData.malfunction.value.name
          })
          this.priceTableList = []
          let beforePriceTableList = []
          _.forEach(filterMeasures[0].Measure, malfunctionItem => {
            _.forEach(this.onlyMeasures, item => {
              if (item.Name === malfunctionItem) {
                beforePriceTableList.push(item)
                this.priceTableList = _.uniqBy(beforePriceTableList.concat(this.onlyMeasures), 'Name')
              }
            })
          })
        } else {
          this.initServiceCategories()
        }

      },
      onclickAppointment() {
        this.$router.push({
          name: 'reservationService',
          params: {
            serviceType: this.currentServiceType,
            category: this.category,
          }
        })
      },
      onChange(checkedObj) {
        this.initServiceCategories()
      },
      initData() {
        _.forEach(this.priceTable, item => {
          let filterServiceType = _.filter(item.ServiceCategories, serviceCategoriesItem => {
            return serviceCategoriesItem.Name === this.serviceTypeShow[this.currentServiceType] || serviceCategoriesItem.Name === this.serviceType[this.currentServiceType]
          })

          let filterCategory = _.filter(filterServiceType[0].Categories, categoriesItem => {
            return categoriesItem.Name == this.category
          })


          this.onlyMeasures = filterCategory[0].Measures

          let spec1 = []
          let filterSpec1 = []
          if (filterCategory[0].Spec1) {
            this.allSpecs = filterCategory[0].Spec1
            _.forEach(filterCategory[0].Spec1, (spec1Item, index) => {
              spec1.push({
                label: spec1Item.Name,
                value: spec1Item.Name
              })
              if (spec1Item.Spec2 && spec1Item.Spec2.length) {
                filterSpec1.push(spec1Item)
              }
            })
          }
          this.filterSpec1 = filterSpec1
          spec1 = _.uniqBy(spec1, 'label')
          this.filterData.spec1.list = spec1
        })
      },
      initMalfunction() {
        if (this.currentServiceType === ServiceTypeShow.维修) {
          let filterCategoryphenomenon = []
          _.forEach(this.priceTable[0].CategoryPhenomenon, item => {
            if (item.CategoryName === this.category) {
              this.allMeasures = item.Phenomenon
              if (item.CategoryName === this.category) {
                filterCategoryphenomenon = _.map(item.Phenomenon, categoryphenomenon => {
                  return {
                    label: categoryphenomenon.Name,
                    value: categoryphenomenon.Name
                  }
                })
              }
            }
          })
          this.filterData.malfunction.list = filterCategoryphenomenon

        } else {
          this.filterData.malfunction.list = []
          this.filterData.malfunction.value = ''
        }
      },
      initServiceCategories() {
        let specNo = 'spec' + this.specNum
        if (this.filterData[specNo] && this.filterData[specNo].value) {
          let specs1 = {}
          let filterSpec2, filterSpec3
          _.forEach(this.allSpecs, specsItem => {
            if (specsItem.Name === this.filterData.spec1.value.name) {
              specs1 = specsItem
            }
          })
          if (specs1.Spec2) {
            filterSpec2 = _.filter(specs1.Spec2, specs2Item => {
              return specs2Item.Name === this.filterData.spec2.value.name
            })
          }
          if (filterSpec2.length && filterSpec2[0].Spec3) {
            filterSpec3 = _.filter(filterSpec2[0].Spec3, spect3Item => {
              return spect3Item.Name === this.filterData.spec3.value.name
            })
          }
          if (this.specNum === 1) {
            this.serviceCategoriesMeasures = specs1.Measures
          } else if (this.specNum === 2) {
            this.serviceCategoriesMeasures = filterSpec2[0].Measures
          } else if (this.specNum === 3) {
            this.serviceCategoriesMeasures = filterSpec3[0].Measures
          }
          this.initPriceTableData()
        }
      },
      initPriceTableData() {
        if (this.allMeasures.length && this.serviceCategoriesMeasures.length) {
          let filterByMalfunction = _.filter(this.allMeasures, malfunctionItem => {
            return malfunctionItem.Name === this.filterData.malfunction.value.name
          })
          this.priceTableList = []
          let beforePriceTableList = []
          _.forEach(filterByMalfunction[0].Measure, malfunctionItem => {
            _.forEach(this.serviceCategoriesMeasures, item => {
              if (item.Name === malfunctionItem) {
                beforePriceTableList.push(item)
              }
            })
          })

          this.priceTableList = _.uniqBy(beforePriceTableList.concat(this.onlyMeasures), 'Name')

        } else if (this.serviceCategoriesMeasures && this.serviceCategoriesMeasures.length) {
          let beforePriceTableList = this.serviceCategoriesMeasures

          this.priceTableList = _.uniqBy(beforePriceTableList.concat(this.onlyMeasures), 'Name')

        } else {
          this.loadPriceListOnly()
        }

      },

      loadPriceListOnly() {
        if (!this.filterData.spec1.list.length && !this.filterData.spec2.list.length && !this.filterData.spec3.list.length && !this.filterData.malfunction.list.length) {
          this.priceTableList = this.onlyMeasures
        }
      }

    }
  }
</script>

<style scoped>
  .price-standard-wrap {
    min-height: 100vh;
    background-color: #ffffff;
  }

  .specification {
    text-align: center;
  }

  .center {
    text-align: center;
  }

  .specification {
    position: relative;
    text-align: center;
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
  }

  .icon-size {
    position: absolute;
    font-size: 33px;
    color: #c1c1c1;
    width: 100%;
  }

  .blue {
    color: #1989FA;
  }

  .specification-radio {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 5px;
  }

  .specification-radio-item {
    width: 49%;
    box-sizing: border-box;
    padding: 5px 2px;
    position: relative;
  }

  .fee-table {
    padding: 0 20px 20px 20px;
  }

  .expenses {
    margin: 0 20px;
    background: #EEEEEE;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
  }

  .cell {
    margin: 10px 0;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .cell-title {
    color: #E47B66;
    font-size: 13px;
  }

  .padding_bottom10 {
    padding-bottom: 10px;
  }

  .content {
    font-size: 12px;
    color: #999999;
  }

  .btn-box {
    padding: 10px 5%;
    box-sizing: border-box;

  }

  .btn {
    margin-top: 10px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
  }

  .banner {
    padding-bottom: 20px;
  }

  .image {
    width: 100%;
    max-height: 100%;
  }
</style>
