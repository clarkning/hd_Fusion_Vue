<template>
  <div class="border_none">
    <div class="mb_60">
      <listItem class="listItem" v-for="(item,index) in personList" :key="index" :listItem="item" :index="index"
                @success="loadData"></listItem>
    </div>
    <div class="button_wrap" @click="goToPageAddPersonByPhone">
      <mt-button class="button bg_blue" type="default" size="large">
        <i class="fa fa-user-plus" aria-hidden="true"></i>
        添加人员
      </mt-button>
    </div>
  </div>
</template>

<script>
  import listItem from './person_list_item'
  import api from '../../../api/index2'
  import { loadData, defaultPreHandler } from '../../../common/utils'
  export default {
    name: 'personManage',
    components: {listItem},
    data () {
      return {
        partnerId: this.$route.query.partnerId,
        organizationId: this.$route.query.organizationId,
        organizationName: this.$route.query.organizationName,
        personList: [],
        loading: false
      }
    },
    created () {
      document.title = this.organizationName
      this.loadData()
    },
    methods: {
      async loadData () {
        await loadData(() => {
          let param = {
            enabled: true
          }
          return api.getPersonList(this.organizationId, param)
        }, (data) => {
          this.personList = data
        }, defaultPreHandler)
      },
      load () {},
      goToPageAddPersonByPhone () {
        this.$router.push({
          path: 'addPerson_byPhone',
          query: {
            organizationId: this.organizationId,
            partnerId: this.partnerId
          }
        })
      }
    }
  }
</script>

<style scoped>
  .button_wrap {
    bottom: 0;
    width: 100%;
    position: fixed;
    text-align: center;
    background: #ffffff;
  }

  .listItem {
    margin-bottom: 15px;
  }

  .mb_60 {
    margin-bottom: 60px;
  }

  .bg_blue {
    height: 40px;
    border-radius: 0;
    color: #26a2ff;
    background: #fff;
  }

  .fa-user-plus:before {
    /*content: "\f234";*/
  }
</style>
