<template>
  <div class="MessageDetails">
    <div><h4>{{detail.title}}</h4></div>
    <div class="des" v-html="detail.content"></div>
    <div class="time">{{detail.publishTime}}</div>
    <div v-if="detail.messageType === '可接任务'" class="looktask">
      <mt-button type="primary" size="large" :disabled="!taskStatus" @click="goToPageTaskSchedule(detail.objectId)">
        查看任务
      </mt-button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { loadData } from '../../common/utils'

  export default {
    name: 'MessageDetails',
    async created () {
      this.messageId = Number(this.$route.query.messageId)
      await this.getList()
      await this.getDetail()
      let read = this.$store.state.messages.filter((item) => {
        return item.status
      })
      if (read.length === 0) {
        this.$store.commit('deleteMessage', this.messageId)
      } else {
        this.$store.commit('setMessageStatus', this.messageId)
      }
    },
    data () {
      return {
        messageId: null,
        detail: {
          title: '',
          content: '',
          publishTime: '',
          messageType: '',
          objectId: '',
          personMessageId: '',
          taskStatusDesc: ''
        },
        taskId: null,
        taskStatus: false
      }
    },
    methods: {
      ...mapActions(['getMessageList', 'getTaskListAcceptable']),
      async getDetail () {
        let detail = this.$store.state.messages.find((item) => {
          return item.personMessageId === this.messageId
        })
        this.detail = detail
        if (this.detail.taskStatusDesc === '生效') {
          this.taskStatus = true
        } else {
          this.taskStatus = false
        }
      },
      async getList () {
        let vue = this
        let find = this.$store.state.messages.find((item) => {
          return item.personMessageId === this.messageId
        })
        if (!find) {
          let param = {
            page: 1,
            read: true
          }
          const setlist = async function () {
            await loadData(() => { return vue.getMessageList(param) })
            let detail = vue.$store.state.messages.find((item) => {
              return item.personMessageId === vue.messageId
            })
            if (detail) {
            } else {
              param.page++
              await setlist()
            }
          }
          await setlist()
        }
      },
      async goToPageTaskSchedule (objectId) {
        this.$router.push({
          name: 'TaskSchedule',
          query: {
            taskId: objectId,
            content: 'detail'
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .MessageDetails {
    padding: 15px;
    background: #ffffff;
    min-height: 100%;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
  }

  .looktask {
    padding: 10% 0
  }

  .MessageDetails h4 {
    text-align: center
  }

  .MessageDetails .des {
    line-height: 2;
    margin-top: 20px
  }

  .MessageDetails .time {
    text-align: right
  }

</style>
