<template>
  <div class="receiverAddress">
    <div class="header">收货地址</div>
    <div class="content">
      <mt-field label="收件人" placeholder="请输入收件人" v-model="form.name"
                :state="state.userNameState"
      ></mt-field>
      <mt-field label="联系电话" placeholder="请输入联系电话" type="number"
                v-model="form.phoneNumber"
                @input.native.capture="handlePhoneNumber"
                :state="state.phoneNumberState"
      ></mt-field>
      <mt-field label="邮编" placeholder="请输入邮编" type="email" v-model="form.mail"
                :state="state.userEmailState"
      ></mt-field>
      <geography v-model="form.address"></geography>
    </div>
  </div>
</template>

<script>
  import { Field } from 'mint-ui'
  import geography from './geography'

  export default {
    name: 'receiver_address',
    model: {
      prop: 'form'
    },
    props: {
      form: {
        type: Object,
        default () {
          return {
            province: null,
            city: null,
            county: null,
            desc: ''
          }
        }
      }
    },
    components: {
      [Field.name]: Field,
      geography
    },
    data () {
      return {
        state: {
          phoneNumberState: 'default',
          userNameState: 'default',
          userEmailState: 'default'
        }
      }
    },
    methods: {
      validateFieldState (condition) {
        return condition ? 'success' : 'error'
      },
      handlePhoneNumber (v) {
        let value = v.target.value
        value = value.slice(0, 11)
        v.target.value = value
      }
    },
    watch: {
      'form.name': function (v) {
        this.state.userNameState = this.validateFieldState(v.length > 1)
      },
      'form.phoneNumber': function (v) {
        this.state.phoneNumberState = this.validateFieldState(v.length === 11)
      },
      'form.mail': function (v) {
        this.state.userEmailState = this.validateFieldState(v.length >= 6)
      }
    }

  }
</script>

<style scoped>
  .header {
    background-color: transparent;
    color: #888;
    font-size: 14px;
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
  }

  .content {
    font-size: 14px;
  }
</style>
