<template>
  <div>
    <mt-cell class="no_bg" :title="listItem.name + ' - ' + listItem.phoneNumber"></mt-cell>
    <mt-cell class="no_bg ">
      <div slot="title">
        <span class="person_statue">{{listItem.positionReturn.name}}</span>
        <span>在职</span>
      </div>
    </mt-cell>
    <div class="person_btn" v-show="saleManage">
      <mt-button type="primary" class="button" size="small" @click="dimissionFlag = true">离职</mt-button>
    </div>


    <mt-popup
      v-model="dimissionFlag"
      position="center"
      :closeOnClickModal="false"
      class="confirmation-information"
      lock-scroll="true">
      <div class="conInf">
        <div class="conInf-con">
          <div style="text-align: center" class="confirmTitle">确认提交</div>
          <mt-cell class="no_bg" title="姓名">{{listItem.name}}</mt-cell>
          <mt-cell class="no_bg" title="电话">{{listItem.phoneNumber}}</mt-cell>
          <mt-cell class="no_bg" title="职位">{{listItem.positionReturn.name}}</mt-cell>
        </div>
        <div class="btn">
          <mt-button type="default" @click="dimissionFlag=false">取 消</mt-button>
          <mt-button type="primary" @click="dimission()">确 认</mt-button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import api from '../../../api/index2'
  import _ from 'lodash'
  import {PositionType} from '../../../common/enum/zwsResource'
  import { loadData, defaultPreHandler } from '../../../common/utils'

  export default {
    name: 'listItem',
    props: {
      listItem: Object
    },
    data () {
      return {
        organizationId: this.$route.query.organizationId,
        dimissionFlag: false,
        saleManage: false,
        storePersonId: null
      }
    },
    async created () {
      let personId = localStorage.getItem('zanPersonId')
      this.$set(this.$data, 'storePersonId', personId)
      this.storePersonId = Number(personId)
      this.filterSaleManage()
    },
    methods: {
      filterSaleManage () {
        let person = _.cloneDeep(this.listItem)
        if (person.positionReturn.postionType.includes(PositionType.销售管理)) {
          this.saleManage = false
        } else {
          this.saleManage = true
        }
      },
      async dimission () {
        await loadData(() => {
          return api.disabledPerson(this.organizationId, this.listItem.id)
        }, (data) => {
          if (data) {
            this.dimissionFlag = false
            this.$emit('success')
          }
        }, defaultPreHandler)
      }
    }
  }
</script>

<style scoped>
  .no_bg.mint-cell:last-child,
  .no_bg >>> .mint-cell-wrapper {
    background: none;
  }

  .person_statue {
    color: #26a2ff;
    margin-right: 20px;
  }

  .person_btn {
    width: 100%;
    background: #fff;
    text-align: right;
  }

  .person_statue_title {
    flex: none;
  }

  .button {
    margin: 0px 20px 15px;;
    width: 40%;
  }

  .confirmation-information {
    border: 0;
    width: 70%;
    border-radius: 10px;
  }

  .conInf {
    letter-spacing: 0;
  }

  .conInf .conInf-con {
    padding: 20px;
  }

  .confirmTitle {
    font-size: 18px;
    letter-spacing: 2px;
  }

  .conInf .btn {
    display: flex;
  }

  .conInf .btn button {
    padding: 10px 0;
    flex: auto;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 0;
    margin-top: -2px;
  }

  .conInf .btn button:first-child {
    font-size: 16px;
    border-bottom-left-radius: 10px;
  }

  .conInf .btn button:last-child {
    font-size: 16px;
    border-bottom-right-radius: 10px;
  }

  .confirmTitle {
    font-weight: bold;
    margin-bottom: 20px;
  }

  .clear :after {
    clear: both;
    content: '.';
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
  }
</style>
