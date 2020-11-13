<template>
  <div>
    <mt-cell class="no_bg">
      <div slot="title">
        <span class="cell_title">手机号</span>
        <span class="cell_value">{{person.phoneNumber}}</span>
      </div>
    </mt-cell>
    <div>
      <mt-cell class="no_bg" v-if="name">
        <div slot="title">
          <span class="cell_title">姓名</span>
          <span class="cell_value">{{name}}</span>
        </div>
      </mt-cell>

      <mt-field v-else class="no_bg" label="姓名" placeholder="请输入姓名" v-model="person.name"></mt-field>
    </div>

    <mt-cell class="no_bg" title="选择职位"></mt-cell>
    <div v-if="positionList.length">
      <mt-radio
        title=""
        class="radio_no_label no_bg"
        v-model="person.position.id"
        :options="positionList">
      </mt-radio>
    </div>
    <div v-else class="bg_white">
      <div class="no_position">
        <span>该组织下无可添加人员的职位</span>
      </div>
    </div>

    <div class="button_wrap">
      <mt-button v-if="positionList.length" class="button bg_blue" type="default" size="large"
                 @click="submit">确认添加
      </mt-button>
      <mt-button v-else class="button bg_blue" type="default" size="large" @click="goToPagePersonManage">返回列表
      </mt-button>
    </div>
  </div>
</template>

<script>
  import api from '../../../api/index2'
  import _ from 'lodash'
  import { loadData, defaultPreHandler } from '../../../common/utils'
  import { Toast } from 'mint-ui'
  import {PositionType} from '../../../common/enum/zwsResource'

  export default {
    name: 'addPerson_bySelectPosition',
    data () {
      return {
        organizationId: this.$route.query.organizationId,
        person: {
          id: this.$route.query.personId || null,
          phoneNumber: null,
          position: {
            id: null
          },
          name: null
        },
        name: null,
        positionList: [],
        value: null
      }
    },
    created () {
      document.documentElement.scrollTop = document.body.scrollTop = 0
      this.person.phoneNumber = this.$route.query.phoneNumber
      if (this.$route.query.name) {
        this.name = this.$route.query.name
        this.person.name = this.name
      } else {
        this.name = null
      }
      this.getPositionList()
    },
    methods: {
      initPositionId () {
        if (this.positionList.length) {
          this.person.position.id = this.positionList[0].value
        }
      },
      showMessage (message) {
        Toast({
          message,
          position: 'bottom',
          duration: 2000
        })
      },
      filterSaleManage (positionList) {
        let person = _.cloneDeep(positionList)
        let data = _.filter(person, item => {
          // let personList = item.positionType.split(' ').join('').split(',')
          console.log(item.postionType.includes(PositionType.销售管理))
          return !item.postionType.includes(PositionType.销售管理)
        })
        return data
      },
      async submit () {
        if (!this.person.name) {
          this.showMessage('请输入姓名')
          return
        } else if (!this.person.position.id) {
          this.showMessage('请选择职位')
          return
        }
        await loadData(() => {
          return api.newPerson(this.organizationId, this.person)
        }, (data) => {
          if (data) {
            this.goToPageAddPersonResult()
          }
        }, defaultPreHandler)
      },
      goToPagePersonManage () {
        this.$router.go(-2)
      },
      goToPageAddPersonResult () {
        this.$router.push({
          path: 'addPerson_result',
          query: {
            results: true,
            phoneNumber: this.person.phoneNumber,
            name: this.person.name
          }
        })
      },
      async getPositionList () {
        let position
        await loadData(() => {
          return api.getPositionList(this.organizationId)
        }, (data) => {
          position = data
        }, defaultPreHandler)
        let positionList = this.filterSaleManage(position)
        for (let item of positionList) {
          let object = {
            label: item.name,
            value: item.id.toString()
          }
          this.positionList.push(object)
        }
        this.initPositionId()
      }
    }
  }
</script>

<style scoped>
  .radio_no_label >>> .mint-radiolist-title {
    margin: 0;
  }
  .button_wrap{
    bottom: 0;
    position: absolute;
    width: 100%;
  }
  .cell_value {
    margin-left: 20px;
    color: #888
  }

  .cell_title {
    display: inline-block;
    width: 80px;
  }

  .bg_white {
    background: #ffffff;
    padding: 15px;
  }

  .no_bg >>> .mint-cell-wrapper {
    background: none;
  }

  .no_position {
    /*margin: 10px;*/
    text-align: center;
    background: #ccc;
    height: 90px;
    line-height: 90px;
  }

  .bg_blue {
    border-radius: 0;
    color: #26a2ff;
    background: #fff;
  }
</style>
