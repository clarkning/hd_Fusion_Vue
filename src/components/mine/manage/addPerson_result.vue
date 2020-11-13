<template>
  <div class="container">
    <div class="center">
      <div class="icon_wrap">
        <div>
          <i v-if="results" class="icon icon-success mintui mintui-field-success"></i>
          <i v-else class="icon icon-warning iconfont icon-gantanhao" aria-hidden="true"></i>
        </div>
        <div class="person_desc">
          <div v-if="!results">
            <div v-if="organizationName">人员已存在</div>
            <div v-else>人员已就职其他组织</div>
          </div>
          <div v-else>人员添加成功</div>
        </div>
      </div>
      <div class="person_info">
        {{person.name}} - {{person.phoneNumber}}
      </div>
      <div class="fail" v-show="!results">
        <div v-if="organizationName">该人员已在【{{organizationName}}】就职</div>
        <div v-else>请联系该人员原组织，离职该员工</div>
      </div>
    </div>

    <div class="button_wrap" @click="goToPagePersonManage">
      <mt-button class="button bg_blue" type="primary" size="large">返回列表</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'addPerson_result',
    data () {
      return {
        organizationName: this.$route.query.organizationName,
        results: this.$route.query.results,
        person: {
          name: '',
          phoneNumber: ''
        }
      }
    },
    created () {
      this.person.name = this.$route.query.name
      this.person.phoneNumber = this.$route.query.phoneNumber
    },
    methods: {
      goToPagePersonManage () {
        if (this.results) {
          this.$router.go(-3)
        } else {
          this.$router.go(-2)
        }
      }
    }
  }
</script>

<style scoped>
  .icon {
    font-size: 120px;
  }

  .icon-success {
    color: #67C23A;
  }

  .icon-warning {
    color: #F56C6C;
  }

  .center {
    text-align: center;
  }

  .icon_wrap {
    padding: 80px;
  }

  .person_info {
    border-top: 1px solid #ccc;
    line-height: 50px;
    height: 50px;
    border-bottom: 1px solid #ccc
  }

  .person_desc {
    margin-top: 10px;
  }

  .bg_blue {
    /*color: #26a2ff;*/
    /*background: #fff;*/
  }

  .button_wrap {
    position: fixed;
    width: 100%;
    bottom: 0;
  }

  .container {
    height: 100vh;
    background: #fff;
  }

  .fail {
    /*margin-left: 20px;*/
    height: 60px;
    line-height: 60px;
  }
</style>
