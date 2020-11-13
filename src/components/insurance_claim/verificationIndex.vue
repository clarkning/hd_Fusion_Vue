<template>
  <div>
    <mt-navbar class="nav_bar_selected" v-model="selected">
      <mt-tab-item id="1">合同查询</mt-tab-item>
      <mt-tab-item id="2">历史核销</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <contractInquiry ref="contractInquiryList"></contractInquiry>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div v-if="selected === '2'">
          <Choose v-if="showWhich === 1" @changeProject="setProjectId"></Choose>
          <verificationHistory v-else-if="showWhich === 2" ref="verificationList"
                               @default="goToDefault" @changeProject="setShowWhich"></verificationHistory>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import verificationHistory from './verificationHistory'
  import contractInquiry from './contract_inquiry'
  import Choose from './choose'
  import defaultVerification from './verificationDefault'

  export default {
    name: 'verificationIndex',
    components: {contractInquiry, verificationHistory, Choose, defaultVerification},
    data () {
      return {
        showWhich: 1,
        scroll: null,
        selected: '1',
        redirect: false
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.showWhich === 2 && !this.redirect && to.path === '/home') {
        this.showWhich = 1
        next(false)
      } else {
        if (to.path === '/verificationDefault') {
          next(vm => {
          })
        }
        next()
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(from)
      if (from.path === '/verificationHistory') {
        next(vm => {
          vm.selected = '2'
        })
      } else if (from.path === '/home') {
        next(vm => {
          vm.selected = '1'
          vm.$refs.contractInquiryList.setSerachValue()
        })
      } else if (from.path === '/verificationDefault') {
        next(vm => {
          vm.$refs.verificationList.leavePage()
        })
      } else {
        next()
      }
    },
    watch: {
      selected (newValue) {
        if (newValue === '1') {
          this.showWhich = 1
        }
      }
    },
    methods: {
      setShowWhich () {
        this.showWhich = 1
      },
      setProjectId (param) {
        this.showWhich = 2
        this.redirect = param.redirect
        this.$nextTick(() => {
          this.$refs.verificationList.getProjectId(param)
        })
      },
      goToDefault (orderId, searchValue) {
        this.$nextTick(() => {
          this.$refs.defaultVerification.getOrderId(orderId, searchValue)
        })
      }
    }
  }
</script>

<style scoped>
  .nav_bar_selected {
    margin-bottom: 3px;
  }
</style>
