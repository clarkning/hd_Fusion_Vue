<template>
  <div class="Withdraw">
    <div class="withdraw-head">
      <div class="ui-flex" @click="divideTypePicker.show = true">
        <mt-cell :title="commission.queryParams.divideType" is-link></mt-cell>
      </div>
      <div class="ui-flex" @click="timePicker.show = true" @touchmove.prevent>
        <mt-cell :title="timePickerValue" is-link></mt-cell>
      </div>
      <mt-popup v-model="divideTypePicker.show" position="bottom" lock-scroll="true" class="types">
        <div @touchmove.prevent>
          <mt-picker :slots="divideTypePicker.slot" valueKey="text"
                     ref="typePickerObject"></mt-picker>
          <mt-button type="primary" class="popup-button" @click="chooseType()">确定</mt-button>
        </div>
      </mt-popup>
      <mt-popup v-model="timePicker.show" position="bottom" lock-scroll="true" class="times">
        <div @touchmove.prevent>
          <mt-picker :slots="timePicker.slot" @change="timeChange" ref="timePickerObject"></mt-picker>
          <mt-button type="primary" class="popup-button" @click="chooseTime()">确定</mt-button>
        </div>
      </mt-popup>
    </div>
    <div class="withdraw-list" v-infinite-scroll="loadCommissions" infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <div class="list-for" v-for="item in commission.list" @click="goToPageCommissionDetail(item.divideType, item.accountSettleId)">
        <mt-cell class="money" title="佣金" :value="'￥ '+item.dividePrice"></mt-cell>
        <mt-cell title="订单编号" :value="item.orderCode"></mt-cell>
        <mt-cell title="佣金类别" :value="item.divideType"></mt-cell>
        <mt-cell title="生成日期" :value="item.created.slice(0, 10)"></mt-cell>
      </div>
      <div v-if="commission.list.length === 0" class="null_data">
        <div class="null"></div>
        <p>亲，暂无数据哦~~</p>
      </div>
      <div v-else>
        <div class="load noMore" v-show="commission.noMore">已无更多</div>
        <div class="load" v-show="commission.loading">
          <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
          正在加载
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import api from '../../api/index2'
  import moment from 'moment'
  import { loadData, defaultPreHandler } from '../../common/utils'

  export default {
    name: 'CommissionList',
    data () {
      return {
        divideTypePicker: {
          value: '全部',
          slot: [
            {
              flex: 1,
              values: [{
                code: null,
                ifDefault: true,
                text: '全部',
                value: null
              }],
              className: 'Types',
              textAlign: 'center'
            }
          ],
          show: false
        },
        timePicker: {
          value: '全部',
          slot: [
            {
              flex: 1,
              values: ['全部', '今日', '本周', '本月', '上月', '近三个月'],
              className: 'Times',
              textAlign: 'center'
            }
          ],
          show: false
        },
        commission: {
          list: [],
          loading: false,
          noMore: false,
          queryParams: {
            divideType: '全部',
            page: 0,
            limit: 5,
            startTime: null,
            endTime: null,
            audited: null,
            paid: null
          }
        },
        timePickerValue: '全部'
      }
    },
    async created () {
      this.setQueryType(this.$route.query.type)
      await loadData(() => {
        return api.getDivideType()
      }, (divideTypes) => {
        this.divideTypePicker.slot[0].values.push(...divideTypes)
      }, defaultPreHandler, false)
    },
    methods: {
      chooseType () {
        let type = this.$refs.typePickerObject.getValues()[0].text
        this.divideTypePicker.show = false
        this.commission.queryParams.divideType = type
        this.commission.queryParams.page = 1
        this.commission.noMore = false
        this.commission.list = []
        this.initData()
      },
      chooseTime () {
        let time = this.$refs.timePickerObject.getValues()[0]
        this.timePicker.show = false
        this.timePickerValue = time
        this.commission.queryParams.page = 1
        this.commission.noMore = false
        this.commission.list = []
        this.initData()
      },
      setQueryType (type) {
        switch (type) {
          case '可提金额': {
            this.commission.queryParams.paid = false.toString()
            break
          }
          case '本月佣金': {
            this.timePickerValue = '本月'
            this.timePicker.slot[0].defaultIndex = this.timePicker.slot[0].values.indexOf('本月')
            this.commission.queryParams.startTime = moment().startOf('month').format('YYYY-MM-DD')
            this.commission.queryParams.endTime = moment().add(1, 'd').format('YYYY-MM-DD')
            break
          }
          case '待审佣金': {
            this.commission.queryParams.audited = false.toString()
            break
          }
          default: {
            break
          }
        }
      },
      goToPageCommissionDetail: function (divideType, id) {
        this.$router.push({
          path: 'CommissionDetail',
          query: {
            showOrderInfo: !(divideType === '活动奖励' || divideType === '红包奖励' || divideType === '提现调差' || divideType === '手续费'),
            accountSettleId: id,
            divideType: divideType
          }
        })
      },
      timeChange (picker, values) {
        switch (values[0]) {
          case '今日': {
            this.commission.queryParams.startTime = moment().format('YYYY-MM-DD')
            this.commission.queryParams.endTime = moment().add(1, 'd').format('YYYY-MM-DD')
            break
          }
          case '本周': {
            this.commission.queryParams.startTime = moment().day('Monday').format('YYYY-MM-DD')
            this.commission.queryParams.endTime = moment().add(1, 'd').format('YYYY-MM-DD')
            break
          }
          case '本月': {
            this.commission.queryParams.startTime = moment().startOf('month').format('YYYY-MM-DD')
            this.commission.queryParams.endTime = moment().add(1, 'd').format('YYYY-MM-DD')
            break
          }
          case '上月': {
            this.commission.queryParams.startTime = moment().subtract(1, 'M').startOf('month').format('YYYY-MM-DD')
            this.commission.queryParams.endTime = moment().startOf('month').format('YYYY-MM-DD')
            break
          }
          case '近三个月': {
            this.commission.queryParams.endTime = moment().add(1, 'd').format('YYYY-MM-DD')
            this.commission.queryParams.startTime = moment().add(1, 'd').subtract(3, 'M').format('YYYY-MM-DD')
            break
          }
          default: {
            this.commission.queryParams.endTime = null
            this.commission.queryParams.startTime = null
            break
          }
        }
      },
      async loadCommissions () {
        this.commission.queryParams.page += 1
        this.initData()
      },
      async initData () {
        if (this.commission.noMore) return
        await loadData(
          () => {
            return api.getCommissionList(this.commission.queryParams)
          },
          (data) => {
            if (data.length === 0) {
              this.commission.noMore = true
            } else {
              this.commission.list.push(...data)
            }
          }, defaultPreHandler
        )
      }
    }
  }
</script>

<style scoped>
  .withdraw-head {
    display: flex;
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
  }

  .ui-flex {
    flex: 1;
  }

  .mint-cell-allow-right::after {
    transform: translateY(-50%) rotate(135deg) !important;
  }

  .types, .times {
    width: 100%;
  }

  .popup-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #26a2ff;
  }

  .paystate {
    margin-top: 10px;
  }

  .personInfo-link {
    text-align: center;
    color: #26a2ff;
  }

  .withdraw-list .list-for {
    margin-top: 10px;
  }

  .withdraw-list .list-for:first-child {
    margin-top: 50px;
  }
</style>
