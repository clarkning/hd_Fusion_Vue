<template>
  <div>
    <div v-for="item in servicePacks">
      <div class="servicePackTitle">{{item.title}}</div>
      <div class="servicePacks">
        <div class="mainPicUrl"><img :src="item.mainPicUrl"></div>
        <div class="des">
          <span class="summary" v-html="item.summary"></span>
          <div class="button clear">
            <span class="productDes f-l" @click="goToPageProductDescription(item.servicePackId)">产品介绍</span>
            <span class="buy f-r" @click="goToPageSellProduct(item.servicePackId)">立刻购买</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../../api/index2'
import { loadData, defaultPreHandler } from '../../../common/utils'

export default {
  name: 'hbProductCategory',
  data () {
    return {
      servicePacks: [],
      query: {
        storeId: null,
        projectId: null
      }
    }
  },
  async created () {
    this.query.storeId = this.$route.query.store
    this.query.projectId = this.$route.query.project
    await this.getServicePacksList()
  },
  methods: {
    async getServicePacksList () {
      await loadData(() => {
        return api.getServicePacks(this.query)
      }, (data) => {
        this.servicePacks = data
      }, defaultPreHandler)
    },
    goToPageProductDescription (servicePackId) {
      this.$router.push({
        name: 'haoBai_product_description',
        query: {
          servicePackId
        }
      })
    },
    goToPageSellProduct (servicePackId) {
      let orderDetail = {}
      let orderFilling = {
        category: {
          value: {
            categoryName: '手机',
            categoryId: null
          },
          categoryList: [],
          isJumpingCategory: null
        },
        brand: {
          value: {
            brandName: '请选择品牌',
            brandId: null
          },
          brandList: [],
          isJumpingBrand: null
        },
        expand: [{
          'contentTypeCode': 3,
          'describe': '请上传显示IMEI屏幕照片',
          'name': '上传显示IMEI的屏幕照片'
        }, {
          'contentTypeCode': 3,
          'describe': '请上传购机发票照片',
          'name': '上传购机发票照片'
        }, {
          'contentTypeCode': 0,
          'describe': '请输入手机型号',
          'name': '手机型号'
        }, {
          'contentTypeCode': 0,
          'describe': '请输入IMEI',
          'name': 'IMEI'
        }, {
          'contentTypeCode': 0,
          'describe': '请输入发票编号',
          'name': '发票编号'
        }],
        service: {
          serviceItemName: null,
          unitPrice: null,
          serviceOptionItemId: null,
          servicePackId: null
        },
        viewDate: null,
        purchaseTime: null,
        purchasePrice: ''
      }
      window.localStorage.setItem('orderDetail', JSON.stringify(orderDetail))
      window.localStorage.setItem('orderFilling', JSON.stringify(orderFilling))
      window.localStorage.setItem('customerName', '')
      window.localStorage.setItem('phoneNumber', '')
      this.$router.push({
        name: 'haoBaiSellProduct',
        query: {
          storeId: this.query.storeId,
          projectId: this.query.projectId,
          servicePackId
        }
      })
    }
  }
}
</script>
<style scoped>
  .servicePackTitle {
    color: #888;
    padding: 10px 15px;
    font-size: 14px;
  }

  .servicePacks {
    background: #fff;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
  }

  .mainPicUrl {
    flex: 2;
    max-width: 130px;
  }

  .mainPicUrl img {
    width: 100%;
  }

  .des {
    flex: 3;
    line-height: 1;
  }

  .productDes {
    color: #26a2ff;
    padding: 5px 0;
    position: relative;
  }

  .buy {
    background: #26a2ff;
    color: #fff;
    padding: 0 10%;
    height: 25px;
    line-height: 25px;
    border-radius: 4px;
  }

  .button {
    font-size: 14px;
    margin-top: 15px;
  }

  .productDes::after {
    border: solid 1px #26a2ff;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 50%;
    right: -5px;
    position: absolute;
    width: 4px;
    height: 4px;
    transform: translateY(-50%) rotate(45deg);
  }
</style>
