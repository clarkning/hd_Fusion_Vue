<template>
  <div class="messageList">
    <mt-navbar v-model="selected" class="msg_navbar navbar_box" :fixed="true" v-show="home">
      <mt-tab-item id="unread">未读</mt-tab-item>
      <mt-tab-item id="read">已读</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected" :class="{msg_tab_box: home}">
      <mt-tab-container-item id="unread" class="msg_tab msg_tab_unread">
        <div v-infinite-scroll="loadMoreUnread" infinite-scroll-disabled="loading" infinite-scroll-distance="300">
          <div v-for="unreadItem in unread" :key="unreadItem.id"
               @click="goToPageMessageDetail(unreadItem.messageType, unreadItem.personMessageId, unreadItem.objectId)">
            <mt-cell>
              <i class="iconfont icon-yuandian fa-1x circle" aria-hidden="true" slot="icon"></i>
              <div slot="title">
                <div class="title">
                  <span class="time">{{unreadItem.publishTime}}</span>
                  <span class="title_span">{{unreadItem.title}}</span>

                </div>
                <span v-if="unreadItem.content" class="des" v-html="unreadItem.content"></span>
              </div>
            </mt-cell>
          </div>
        </div>
        <div v-if="unread.length > 0">
          <div class="load noMore" v-show="unreadNoMore && home">已无更多</div>
          <div class="load" v-show="loading && home">
            <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
            正在加载
          </div>
        </div>
        <div v-else class="null_data">
          <div class="null"></div>
          <p>亲，暂无未读消息哦~~</p>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="read" class="msg_tab msg_tab_read">
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
          <div v-for="readItem in read" :key="readItem.id"
               @click="goToPageMessageDetail(readItem.messageType, readItem.personMessageId, readItem.objectId)">
            <mt-cell>
              <div slot="title">
                <div class="title">
                  <span class="time">{{readItem.publishTime}}</span>
                  <span class="title_span">{{readItem.title}}</span>
                </div>
                <span class="des" v-html="readItem.content"></span>
              </div>
            </mt-cell>
          </div>
        </div>
        <div v-if="read.length > 0">
          <div class="load noMore" v-show="noMore && home">已无更多</div>
          <div class="load" v-show="loading && home">
            <mt-spinner color="#d4d4d4" type="fading-circle"></mt-spinner>
            正在加载
          </div>
        </div>
        <div v-else class="null_data">
          <div class="null"></div>
          <p>亲，暂无消息哦~~</p>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>


</template>

<script>
  import api from '../../api/index2'
  import { loadData, boolPreHandler } from '../../common/utils'
  import { mapActions } from 'vuex'
  import _ from 'lodash'

  export default {
    name: 'Message',
    data () {
      return {
        read: [],
        unread: [],
        selected: 'unread',
        home: false,
        rightButtons: false,
        loading: false,
        noMore: true,
        unreadNoMore: true,
        unreadPage: 1,
        page: 1,
        messages: []
      }
    },
    async created () {
      this.messages = JSON.parse(JSON.stringify(this.$store.state.messages))
      this.home = window.location.hash !== '#/home'
      this.unFetch()
      if (!this.home && this.unread.length > 5) {
        this.unread = this.unread.slice(0, 5)
      }
      this.fetch()
      if (this.unread.length === 0) {
        this.unreadPage = 1
      } else {
        this.unreadPage = Math.ceil(this.unread.length / 10)
      }
      if (this.read.length === 0) {
        this.page = 1
      } else {
        this.page = Math.ceil(this.read.length / 10)
      }
      let param
      if (this.selected === 'read') {
        param = {
          page: this.page,
          read: true
        }
      } else {
        param = {
          page: this.unreadPage,
          read: false
        }
      }

      if (!this.home) {
        this.selected = 'unread'
      } else {
        this.selected = this.$store.state.msgListNav
      }
      if (this.messages.length === 0) {
        await this.initData(param)
      }
      this.unreadNoMore = this.unread.length < (10 * this.unreadPage)
    },
    methods: {
      ...mapActions(['getMessageList', 'getMessageDetail', 'getTaskDetail']),
      async initData (param) {
        await loadData(() => {
          return this.getMessageList(param)
        }, (res) => {
          this.messages = JSON.parse(JSON.stringify(this.$store.state.messages))
          if (param.read) {
            this.noMore = res
          } else {
            this.unreadNoMore = res
            this.unFetch()
          }
        })
      },
      // 已读
      async loadMore () {
        if (this.noMore || this.selected === 'unread') return
        this.loading = true
        this.page++
        let param = {
          page: this.page,
          read: true
        }
        await this.getMessageList(param)
        this.page = Math.ceil(this.read.length / 10)
        this.noMore = this.read.length < (10 * this.page)
        this.messages = JSON.parse(JSON.stringify(this.$store.state.messages))
        this.fetch()
        this.loading = false
      },
      // 未读
      async loadMoreUnread () {
        if (this.unreadNoMore || this.selected === 'read') return
        this.loading = true
        this.unreadPage++
        let param = {
          page: this.unreadPage,
          read: false
        }
        await this.getMessageList(param)
        this.unreadPage = Math.ceil(this.unread.length / 10)
        this.unreadNoMore = this.unread.length < (10 * this.unreadPage)
        this.messages = JSON.parse(JSON.stringify(this.$store.state.messages))
        this.unFetch()
        this.loading = false
      },
      goToPageMessageDetail: async function (param, id, objectId) {
        if (this.selected === 'unread') {
          await this.putMsg(id, param)
        }
        if (param === '自定义消息') {
          this.$router.push({
            name: 'MessageDetails',
            query: {
              messageId: id
            }
          })
        } else if (param === '已接任务') {
          this.$router.push({
            name: 'TaskSchedule',
            query: {
              personTaskId: objectId,
              content: 'schedule'
            }
          })
        } else if (param === '可接任务') {
          this.$router.push({
            name: 'MessageDetails',
            query: {
              messageId: id
            }
          })
        }
      },
      async putMsg (id, param) {
        await loadData(() => { return api.putMessage(id) },
          (res) => {
            if (res) {
              this.fetch()
              this.$store.commit('declineMessageTotal')
              if (this.read.length > 0) {
                this.$store.commit('setMessageStatus', id)
              }
              if (param === '已接任务' && this.read.length === 0) {
                this.$store.commit('deleteMessage', id)
              }
            }
          }, boolPreHandler, true)
      },
      fetch () {
        this.read = this.messages.filter((item) => {
          return item.status
        })
        _.forEach(this.messages, function (value) {
          let des = _.replace(value.content, /<\/?.+?>/g, '')
          value.content = _.replace(des, / /g, '')
        })
      },
      unFetch () {
        this.unread = this.messages.filter((item) => {
          return !item.status
        })
        _.forEach(this.messages, function (value) {
          let des = _.replace(value.content, /<\/?.+?>/g, '')
          value.content = _.replace(des, / /g, '')
        })
      }
    },
    watch: {
      'selected': async function (status) {
        let param
        this.$store.commit('setMsgListNav', status)
        if (this.unread.length === 0 && status === 'unread') {
          param = {
            page: this.unreadPage,
            read: false
          }
          await this.initData(param)
        }
        if (this.read.length === 0 && status === 'read') {
          param = {
            page: this.page,
            read: true
          }
          await this.initData(param)
        }
        this.messages = JSON.parse(JSON.stringify(this.$store.state.messages))
        this.unFetch()
        this.fetch()
        if (this.unread.length === 0) {
          this.unreadPage = 1
        } else {
          this.unreadPage = Math.ceil(this.unread.length / 10)
        }
        if (this.read.length === 0) {
          this.page = 1
        } else {
          this.page = Math.ceil(this.read.length / 10)
        }
        this.unreadNoMore = this.unread.length < (10 * this.unreadPage)
        this.noMore = this.read.length < (10 * this.page)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mint-cell {
    min-height: 45px !important;
    padding: 7px 0;
    box-sizing: border-box;
  }

  .msg_tab_box {
    margin-top: 50px;
    margin-bottom: 10px;
  }

  .mint-cell:active {
    background: #E5E5E5;
  }

  .msg_tab .mint-cell {
    margin-top: 10px;
    text-align: left;
  }

  .msg_tab .mint-cell .title {
    font-size: 14px;
    height: 25px;
    line-height: 25px;
  }

  .msg_tab .mint-cell .des {
    margin-top: 5px;
    font-size: 14px;
    color: #888;
    display: block;
    /* white-space: nowrap; */
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
    width: 100%;
    line-height: 1.5;
    max-height: 45px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .msg_tab .mint-cell .title_span {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 65%;
  }
</style>
