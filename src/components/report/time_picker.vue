<template>
  <mt-popup v-model="visible" position="bottom" :closeOnClickModal="false">
    <div class="timePicker" @touchmove.prevent>
      <div class="title">
        <div class="flex">
          <span class="flex_content color_1" @click="visible=false">取消</span>
          <span class="flex_title color999">选择时间</span>
          <span class="flex_content color_1" @click="handleConfirm">完成</span>
        </div>
        <div class="flex flex-time">
          <span class="flex_title" :class="[showStartTime ? 'color_1 border_btm' : null]" @click="showTime('start')"><span v-if="startTime">{{startTime}}</span><span v-else>开始日期</span></span>
          <span style="width: 50px">至</span>
          <span class="flex_title" :class="[showEndTime ? 'color_1 border_btm' : null]" @click="showTime('end')"><span v-if="endTime">{{endTime}}</span><span v-else>结束日期</span></span>
        </div>
      </div>
      <div style="height: 180px">
        <mt-picker v-show="showStartTime || showEndTime" ref="time" :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </div>
  </mt-popup>
</template>

<script>
  import moment from 'moment'
  import { Toast } from 'mint-ui'
  export default {
    name: 'time_picker',
    data () {
      return {
        today: {
          year: '',
          month: '',
          day: ''
        },
        showStartTime: false,
        showEndTime: false,
        startTime: '',
        endTime: '',
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2',
            textAlign: 'center'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot4',
            textAlign: 'center'
          }, {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        visible: false,
        pickerVisible: moment().toDate(),
        timePicker: {
          pickerValue: moment().toDate(),
          maxDate: moment().toDate()
        }
      }
    },
    created () {
      this.initPickerValue()
    },
    methods: {
      initPickerValue () {
        let year = moment().year()
        let yearDiff = year - 2014
        let years = []
        for (let i = 0; i <= yearDiff; i++) {
          years.push((year - (yearDiff - i)).toString())
        }
        this.slots[0].values = years
        let month = moment().month()
        this.slots[2].values = this.setMonth(month + 1)
        this.$refs.picker.setSlotValues(1, this.setMonth(month))
      },
      setMonth (values) {
        let month = []
        for (let i = 1; i <= values; i++) {
          if (i < 10) {
            month.push('0' + i.toString())
          } else {
            month.push(i.toString())
          }
        }
        return month
      },
      setDays (values) {
        let days = moment(`${values[0]}-${values[1]}`, 'YYYY-MM').daysInMonth()
        let daysInMonth = []
        for (let i = 1; i <= days; i++) {
          if (i < 10) {
            daysInMonth.push('0' + i.toString())
          } else {
            daysInMonth.push(i.toString())
          }
        }
        if (Number(values[0]) === Number(this.today.year) && Number(values[1]) === Number(this.today.month)) {
          let index = daysInMonth.findIndex(item => {
            return Number(item) === Number(this.today.day)
          })
          daysInMonth = daysInMonth.splice(0, index + 1)
        }
        return daysInMonth
      },
      onValuesChange (picker, values) {
        let month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        if (values[1]) {
          let daysInMonth = this.setDays(values)
          picker.setSlotValues(2, daysInMonth)
        }
        if (values[0] !== (moment().year()).toString()) {
          picker.setSlotValues(1, month)
        } else {
          picker.setSlotValues(1, this.setMonth((moment().month()) + 1))
        }
        if (this.showStartTime) {
          this.startTime = `${values[0]}-${values[1]}-${values[2]}`
        } else if (this.showEndTime) {
          this.endTime = `${values[0]}-${values[1]}-${values[2]}`
        }
      },
      handleConfirm () {
        let diffDay = moment(this.endTime).diff(moment(this.startTime), 'days')
        let isAfter = moment(this.endTime).isAfter(moment().format('YYYY-MM-DD'))
        let isAfter2 = moment(this.startTime).isAfter(this.endTime)
        if (isAfter) {
          Toast('未来的时间不可选')
        } else if (diffDay > 365) {
          Toast('时间跨度不能超过1年')
        } else if (isAfter2) {
          Toast('结束日期不能早于开始日期')
        } else {
          let params = {
            startTime: this.startTime,
            endTime: this.endTime
          }
          this.$emit('setTime', params)
          this.visible = false
        }
      },
      show (start, end) {
        this.visible = true
        this.setToday()
        if (!start && !end) {
          let today = moment().format('YYYY-MM-DD')
          this.setPickerValue(today)
          this.showEndTime = true
        }
      },
      setToday () {
        let today = moment().format('YYYY-MM-D')
        let arr = today.split('-')
        this.today.day = arr[2]
        this.today.month = arr[1]
        this.today.year = arr[0]
      },
      showTime (type) {
        if (type === 'start') {
          this.showStartTime = true
          this.showEndTime = false
        } else {
          this.showStartTime = false
          this.showEndTime = true
        }
      },
      setPickerValue (time) {
        if (time) {
          let arr = time.split('-')
          this.$refs.time.setSlotValue(0, arr[0])
          this.$refs.time.setSlotValue(1, arr[1])
          this.$refs.time.setSlotValue(2, arr[2])
        } else {
          this.$refs.time.setSlotValue(0, this.slots[0].values[0])
          this.$refs.time.setSlotValue(1, this.slots[2].values[0])
          this.$refs.time.setSlotValue(2, this.slots[4].values[0])
        }
      }
    },
    watch: {
      'showStartTime': function (newValue, oldValue) {
        if (newValue) {
          console.log('开始', newValue)
          if (this.endTime) {
            this.setPickerValue(this.endTime)
          }
          this.$nextTick(() => {
            this.setPickerValue(this.startTime)
          })
        } else {
          console.log('开始else')
          let today = moment().format('YYYY-MM-D')
          this.$nextTick(() => {
            this.setPickerValue(today)
          })
        }
      },
      'showEndTime': function (newValue, oldValue) {
        if (newValue) {
          console.log('end', newValue)
          if (this.startTime) {
            this.setPickerValue(this.startTime)
          }
          this.$nextTick(() => {
            this.setPickerValue(this.endTime)
          })
        } else {
          console.log('end fou ', 2)
          if (!this.startTime) {
            this.startTime = this.endTime
          }
          this.$nextTick(() => {
            this.setPickerValue(this.startTime)
          })
        }
      }
    }
  }
</script>

<style scoped>
  .border_btm{
    border-bottom:1px solid #26a2ff;
  }
   .color999{
     color: #999;
   }
  .timePicker {
    width: 100vw;
  }

  .title {
    background: #fff;
    height: 80px;
    padding: 5px 10px;
    border-bottom: 1px solid #ebeef5;
  }

  .flex {
    text-align: center;
    display: flex;
  }

  .flex_title {
    flex: 1;
  }
  .flex-time{
    height: 35px;
    line-height: 35px;
    margin: 15px 0;
  }
</style>
