<template>
  <div>
    <!--<div class="activation-massage massage-animation">-->
    <!--<embed src="/static/message.svg" type="" width="20" height="20">-->
    <!--请输入您要兑换的卡号、密钥，以便获取服务-->
    <!--</div>-->
    <!--<div class="activation-tips">-->
    <!--<embed src="/static/message.svg" type="" width="18" height="18">-->
    <!--请输入您要兑换的卡号、密钥，以便获取服务-->
    <!--</div>-->
    <div class="header">请输入您要兑换的卡号、密钥，以便获取服务</div>
    <div class="activation-content">
      <div id="cardId">
        <mt-field label="卡号" placeholder="请输入您的激活卡号" :attr="{ maxlength: 10}" type="text" v-model="cardId"></mt-field>
      </div>
    </div>
    <div class="activation-content mt15">
      <mt-field label="密钥" placeholder="请输入对应密钥" :attr="{ maxlength: 10}" type="text" v-model="cardPwd"></mt-field>
    </div>
    <div class="ui-button">
      <mt-button type="primary" size="large" class="mt15" @click="goToPageActivation_order_fill()"
                 :disabled="buttonTypeFlag">提交
      </mt-button>
    </div>
  </div>
</template>

<script>
  import api from '../../../api/index2'
  import { loadData } from '../../../common/utils'
  import { createNamespacedHelpers } from 'vuex'
  import { Toast } from 'mint-ui'

  const {mapMutations} = createNamespacedHelpers('order')
  export default {
    name: 'activation_service',
    data () {
      return {
        isOk: null,
        cardId: '',
        cardPwd: '',
        buttonTypeFlag: '',
        personId: null,
        agentId: null,
        store: null,
        project: null,
        serviceOptionItem: {
          list: {
            sku: '',
            name: '',
            description: '',
            servicePackId: '',
            unitPrice: '',
            fileUrl: ''
          }
        }
      }
    },
    created () {
      this.store = this.$route.query.store
      this.project = this.$route.query.project
      this.agentId = this.$route.query.agentId
      this.personId = this.$route.query.personId
      localStorage.setItem('agentId', this.agentId)
      localStorage.setItem('zanPersonId', this.personId)
      localStorage.removeItem('memoryFlag')
      localStorage.removeItem('orderFilling')
      localStorage.removeItem('phoneNumber')
      localStorage.removeItem('customerName')
    },
    mounted () {
      document.getElementById('cardId').getElementsByTagName('input')[0].focus()
    },
    methods: {
      ...mapMutations(['setActivationProduct']),
      toast (msg) {
        Toast({
          message: msg,
          position: 'middle',
          duration: 2000
        })
      },
      async goToPageActivation_order_fill () {
        await loadData(() => {
          return api.getCarmal(JSON.parse(JSON.stringify(this.cardId)), JSON.parse(JSON.stringify(this.cardPwd)))
        }, () => {}, (data) => {
          if (data.isOk) {
            let param = {
              sku: this.serviceOptionItem.list.sku = data.content.sku,
              name: this.serviceOptionItem.list.name = data.content.name,
              description: this.serviceOptionItem.list.description = data.content.description,
              id: this.serviceOptionItem.list.servicePackId = data.content.servicePackId,
              unitPrice: this.serviceOptionItem.list.unitPrice = data.content.unitPrice,
              serviceLensenceId: this.serviceOptionItem.list.fileUrl = data.content.serviceLensenceId,
              fileUrl: this.serviceOptionItem.list.fileUrl = data.content.fildUrl,
              cardId: this.cardId
            }
            this.setActivationProduct(param)
            this.$router.push({
              name: 'activateOrderFilling',
              query: {
                storeId: this.store,
                projectId: this.project,
                servicePackId: this.serviceOptionItem.list.servicePackId
              }
            })
          } else {
            this.toast(data.message)
          }
        }, false)
        window.localStorage.removeItem('memoryFlag')
        window.localStorage.removeItem('agreeChecked')
      },
      changeButtonType () {
        if (this.cardId.length === 10 && this.cardPwd.length === 10) {
          this.buttonTypeFlag = false
        } else {
          this.buttonTypeFlag = true
        }
      }
    },
    watch: {
      'cardId': 'changeButtonType',
      'cardPwd': 'changeButtonType'
    }
  }
</script>

<style scoped>
  .header {
    color: #888;
    padding: 10px 15px;
    font-size: 14px;
  }

  .activation-tips embed {
    vertical-align: middle;
  }

  /*.activation-content .mint-cell{*/
  /*height: 48px!important;*/
  /*}*/
  .mt20 {
    margin-top: 20px;
  }

  .mt15 {
    margin-top: 15px;
  }
</style>
