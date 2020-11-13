<template>
  <div class="progressFixed" v-show="pageNum">
    <div v-if="redirect" class="progressBar_4">
      <div>
        <span :style="{'width': width}"></span>
      </div>
      <span v-for="n in 4" :class="color(n)"><p>{{n}}</p></span>
    </div>
    <div v-else class="progressBar_5">
      <div>
        <span :style="{'width': width}"></span>
      </div>
      <span v-for="n in 5" :class="color(n)"><p>{{n}}</p></span>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'sellProgress',
    data () {
      return {
        redirect: false,
        pageNum: 0,
        width: 0,
        status: false
      }
    },
    async created () {
      this.pageNum = this.page()
      this.width = this.progressWidth()
    },
    props: {
      orderStatus: String
    },
    methods: {
      ...mapActions(['getOrganizationInfo', 'getProject']),
      async setRedirect () {
        await this.getOrganizationInfo(this.$store.state.person.personId)
        if (this.$store.state.person.orgInfo.length === 1) {
          await this.getProject()
          let projectList = []
          for (let projectItem of this.$store.state.project) {
            if (projectItem.positionType) {
              let item = projectItem.positionType.split(',')
              let find = item.find((i) => {
                return i === '销售'
              })
              if (find) {
                projectList.push(projectItem)
              }
            }
          }
          projectList = projectList.filter((item) => {
            return item.projectList.length > 0
          })
          this.redirect = projectList.length === 1 && projectList[0].projectList.length === 1
        }
      },
      page: function () {
        let status = this.$route.name
        if (this.redirect) {
          switch (status) {
            case 'ProductCategory':
              return 1
            case 'SellProduct':
              return 2
            case 'PayList':
              return 3
            case 'OrderFilling':
              return 4
            default:
              return 0
          }
        } else {
          switch (status) {
            case 'ChooseProject':
              return 1
            case 'ProductCategory':
              return 2
            case 'SellProduct':
              return 3
            case 'PayList':
              return 4
            case 'OrderFilling':
              return 5
            default:
              return 0
          }
        }
      },
      color: function (n) {
        if (this.status) {
          return 'color_blue index'
        } else {
          if (n > this.pageNum) {
            return 'color_ccc'
          } else if (n === this.pageNum) {
            return 'color_ccc'
          } else {
            return 'color_blue'
          }
        }
      },
      progressWidth: function () {
        if (this.redirect) {
          return (this.pageNum - 1) * 33.33 + '%'
        } else {
          return (this.pageNum - 1) * 25 + '%'
        }
      }
    },
    watch: {
      'orderStatus': function (newV) {
        if (newV === 'submit') {
          this.status = true
        }
      }
    }
  }
</script>
<style scoped>
  .progressFixed {
    background: #F0EFF5;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
  .progressBar_4,
  .progressBar_5 {
    width: 90%;
    height: 18px;
    position: relative;
    margin: 10px auto 15px;
  }
  .progressBar_4 div,
  .progressBar_5 div {
    width: 100%;
    height: 4px;
    position: absolute;
    top: calc(50% - 3px);
    left: 0;
    border-radius: 15px;
    background: #ccc;
  }
  .progressBar_4 div span,
  .progressBar_5 div span {
    position: absolute;
    display: inline-block;
    background: #3396E4;
    height: 4px;
  }

  .width-25 {
    width: 0;
  }

  .width-33 {
    width: 0;
  }
  .progressBar_4 > span,
  .progressBar_5 > span {
    position: absolute;
    top: 0;
    width: 16px;
    height: 16px;
    text-align: center;
    border-radius: 50%;
    font-size: 15px;
    line-height: 16px;
  }
  .progressBar_4 > span:nth-child(2),
  .progressBar_5 > span:nth-child(2){
    left: -8px
  }
  .progressBar_4 > span:nth-child(3) {
    left: calc(33.33% - 8px)
  }

  .progressBar_4 > span:nth-child(4) {
    left: calc(66.67% - 8px)
  }
  .progressBar_4 > span:nth-child(5),
  .progressBar_5 > span:nth-child(6){
    left: calc(100% - 8px)
  }

  .progressBar_5 > span:nth-child(3) {
    left: calc(25% - 8px);
  }

  .progressBar_5 > span:nth-child(4) {
    left: calc(50% - 8px);
  }

  .progressBar_5 > span:nth-child(5) {
    left: calc(75% - 8px);
  }

  .color_blue {
    background: #3396E4;
    color: #eee;
  }

  .color_ccc {
    background: #ccc;
    color: #eee;
  }
</style>
