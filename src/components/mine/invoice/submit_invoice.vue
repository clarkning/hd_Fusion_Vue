<template>
  <div class="submit-invoice">
    <mt-field label="发票代码" type="number" placeholder="请输入10或12位发票代码" v-model="code" pattern="[0-9]*" :attr="{ maxlength: 12}"
              :state="codeState"></mt-field>
    <mt-field label="发票号码" type="number" placeholder="请输入8位发票号码" v-model="number" pattern="[0-9]*" :attr="{ maxlength: 8}"
              :state="numberState"></mt-field>
    <mt-field label="发票金额" type="number" placeholder="请输入发票金额" v-model="amount" pattern="[0-9]*" :state="amountState"></mt-field>
    <div class="ui-button">
      <mt-button type="primary" size="large" @click="checkInput()" :disabled="disabled">提交</mt-button>
    </div>
  </div>
</template>
<script>
  import {MessageBox, Toast} from 'mint-ui'
  import api from '../../../api/index2'
  import {loadData, boolPreHandler} from '../../../common/utils'

  export default {
    name: 'SubmitInvoice',
    data () {
      return {
        code: null,
        number: null,
        amount: null,
        codeState: 'default',
        numberState: 'default',
        amountState: 'default',
        disabled: false
      }
    },
    methods: {
      showMsgBox (msg) {
        MessageBox({
          title: '提示',
          message: msg
        })
        this.disabled = false
      },
      checkInput () {
        this.disabled = true
        if (this.code === null) {
          this.showMsgBox('请输入10或12位发票代码')
        } else if (this.code.length !== 10 && this.code.length !== 12) {
          this.showMsgBox('请输入10或12位发票代码')
        } else if (!Number(this.code)) {
          this.showMsgBox('请输入正确的10或12位发票代码')
        } else if (this.number === null) {
          this.showMsgBox('请输入8位发票号码')
        } else if (this.number.length !== 8) {
          this.showMsgBox('请输入8位发票号码')
        } else if (!Number(this.number)) {
          this.showMsgBox('请输入正确的8位发票号码')
        } else if (this.amount === null) {
          this.showMsgBox('请输入发票金额')
        } else if (!Number(this.amount)) {
          this.showMsgBox('请输入正确的发票金额')
        } else if (this.amount <= 0) {
          this.showMsgBox('发票金额必须大于0')
        } else {
          this.postData()
        }
      },
      async postData () {
        let params = {
          code: this.code,
          number: this.number,
          amount: this.amount
        }
        await loadData(() => api.postInvoice(params), (res) => {
          if (res) {
            Toast({
              message: '发票提交成功',
              position: 'middle',
              duration: 1000
            })
            let vue = this
            setTimeout(function () {
              vue.$router.go(-1)
            }, 1000)
          }
        }, boolPreHandler, false, '正在提交')
      }
    },
    watch: {
      'code': function (c) {
        if (c.length === 10 || c.length === 12) {
          this.codeState = 'success'
        } else {
          this.codeState = 'default'
        }
      },
      'number': function (c) {
        if (c.length === 8) {
          this.numberState = 'success'
        } else {
          this.numberState = 'default'
        }
      },
      'amount': function (c) {
        if (c > 0) {
          this.amountState = 'success'
        } else {
          this.amountState = 'default'
        }
      }
    }
  }
</script>
<style scoped>
  .submit-invoice .mint-cell:last-child {
    border-bottom: 1px solid #ededed;
  }
</style>
