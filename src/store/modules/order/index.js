import api from '../../../api/index2'
import { loadData, defaultPreHandler } from '../../../common/utils'

const state = {
  orderDetail: {},
  orderFilling: {
    customerDto: {
      customerName: '',
      phoneNumber: ''
    },
    category: {
      value: {
        categoryName: '请选择品类',
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
    expand: [],
    service: {
      serviceItemName: null,
      unitPrice: null,
      serviceOptionItemId: null,
      servicePackId: null
    },
    viewDate: null,
    purchaseTime: null,
    purchasePrice: ''
  },
  salesProcess: [],
  historyOrderNav: 'csoOrder'
}

const mutations = {
  setOrderDetail (state, param) {
    state.orderDetail = param
  },
  setCategoryValue (state, param) {
    Object.assign(state.orderFilling.category, param)
  },
  setHistoryOrderNav (state, historyOrderNav) {
    state.historyOrderNav = historyOrderNav
  },
  setBrandValue (state, param) {
    if (param) {
      Object.assign(state.orderFilling.brand, param)
    } else {
      Object.assign(state.orderFilling.brand, {
        value: {
          brandName: '请选择品牌',
          brandId: null
        },
        isJumpingBrand: null
      })
    }
  },
  setCustomerDto (state, data) {
    state.orderFilling.customerDto = data
  },
  setExpand (state, data) {
    state.orderFilling.expand = data
  },
  setActivationProduct (state, data) {
    state.activationProduct = data
  },
  removeOrderFilling (state) {
    state.orderDetail = {}
    state.orderFilling = {
      customerDto: {
        customerName: '',
        phoneNumber: ''
      },
      category: {
        value: {
          categoryName: '请选择品类',
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
      expand: [],
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
  },
  setSellProduct (state, param) {
    Object.assign(state.orderFilling, param)
  },
  setOrderFilling (state) {
    let data = state.orderDetail
    state.orderFilling.service = {
      serviceItemName: data.orderItemDtos[0].serviceOptionItem.name,
      unitPrice: data.orderItemDtos[0].serviceOptionItem.unitPrice,
      serviceOptionItemId: data.orderItemDtos[0].serviceOptionItem.serviceOptionItemId,
      servicePackId: data.orderItemDtos[0].servicePackDto.servicePackId
    }
    state.orderFilling.purchaseTime = data.orderItemDtos[0].customerDeviceDto.purchaseTime
    state.orderFilling.purchasePrice = data.orderItemDtos[0].customerDeviceDto.purchasePrice
    state.orderFilling.category.value.categoryId = data.orderItemDtos[0].customerDeviceDto.productCategoriesId
    state.orderFilling.category.value.categoryName = data.orderItemDtos[0].customerDeviceDto.productCategoriesName || '请选择品类'
    state.orderFilling.brand.value.brandName = data.orderItemDtos[0].customerDeviceDto.brandName || '请选择品牌'
    state.orderFilling.brand.value.brandId = data.orderItemDtos[0].customerDeviceDto.brandId
    state.orderFilling.customerDto.customerName = data.customerDto.customerName || ''
    state.orderFilling.customerDto.phoneNumber = data.customerDto.phoneNumber || ''
    state.orderFilling.expand = data.expand || []
  },
  setService (state) {
    let data = state.orderDetail
    state.orderFilling.service = {
      serviceItemName: data.orderItemDtos[0].serviceOptionItem.name,
      unitPrice: data.orderItemDtos[0].serviceOptionItem.unitPrice,
      serviceOptionItemId: data.orderItemDtos[0].serviceOptionItem.serviceOptionItemId,
      servicePackId: data.orderItemDtos[0].servicePackDto.servicePackId
    }
    state.orderFilling.purchaseTime = data.orderItemDtos[0].customerDeviceDto.purchaseTime
    state.orderFilling.purchasePrice = data.orderItemDtos[0].customerDeviceDto.purchasePrice
  }
}

const actions = {
  'getOrderDetail': async ({commit, state}, orderId) => {
    let find = state.orderDetail.orderId === Number(orderId)
    if (!find) {
      let response = {}
      await loadData(() => { return api.getOrderDetail(orderId) },
        (data) => { response = data },
        defaultPreHandler,
        true
      )
      if (response.orderStatus === 21 && response.paymentDto.paymentStatus === 10 && response.paymentDto.payType === 0) {
        if (response.orderItemDtos[0].customerDeviceDto.productCategoriesId) {
          let deviceParam = {
            orderId: response.orderId,
            deviceId: response.orderItemDtos[0].customerDeviceDto.id
          }
          let objectParam = {
            servicePackId: response.orderItemDtos[0].servicePackDto.servicePackId,
            categoryId: response.orderItemDtos[0].customerDeviceDto.productCategoriesId
          }
          let objectExpand = []
          await loadData(() => { return api.getObjectExpands(objectParam) },
            (data) => { objectExpand = data },
            defaultPreHandler,
            true
          )
          let deviceExpand = []
          await loadData(() => { return api.getDeviceExpands(deviceParam) },
            (data) => { deviceExpand = data },
            defaultPreHandler,
            true
          )
          for (let item of objectExpand) {
            let deviceExpandItem = deviceExpand.find((a) => {
              return a.text === item.name
            })
            if (item.contentTypeCode === 3) {
              item.value = deviceExpandItem ? deviceExpandItem.imageId : null
              item.src = deviceExpandItem ? deviceExpandItem.value : null
              item.coord = deviceExpandItem ? deviceExpandItem.coord : null
            } else {
              item.value = deviceExpandItem ? deviceExpandItem.value : null
            }
          }
          response.expand = objectExpand
          commit('setOrderDetail', response)
        }
        commit('setOrderFilling')
      } else {
        commit('setOrderDetail', response)
      }
    }
  },
  'getObjectExpands': async ({commit}, params) => {
    let param = {
      servicePackId: params.servicePackId,
      categoryId: params.categoryId
    }
    await loadData(() => { return api.getObjectExpands(param) },
      (data) => { commit('setExpand', data) },
      defaultPreHandler,
      true
    )
  }
}

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
}
