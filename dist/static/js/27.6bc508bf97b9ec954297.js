webpackJsonp([27],{eNtP:function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=r(a("Dd8w")),s=r(a("Xxa5")),n=r(a("exGp")),o=r(a("3D1+")),c=r(a("PJh5")),l=r(a("fxnj")),d=a("JaHG"),u=a("NYxO"),v=r(a("M4fF")),p=(0,u.createNamespacedHelpers)("order").mapMutations;e.default={name:"OrderDetail",data:function(){return{detail:{},index:null,orderId:null,expand:{imageExpand:[],otherExpand:[],expands:[]},address:{desc:"",province:{id:null,name:""},city:{id:null,name:""},county:{id:null,name:""}},previewUrl:[],scan:""}},created:function(){var t=(0,n.default)(s.default.mark(function t(){return s.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.orderId=this.$route.query.orderId,t.next=3,this.getDetail();case 3:return t.next=5,this.getScan();case 5:return t.next=7,this.getExpands();case 7:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),beforeRouteLeave:function(t,e,a){"MyOrder"===t.name&&this.isPreview?(this.isPreview=!1,a(!1)):a()},methods:(0,i.default)({},p(["removeOrderFilling"]),{config:function(){var t=(0,n.default)(s.default.mark(function t(){var e;return s.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=location.href.split("#")[0],t.next=3,this.$initWxConfig(e,["previewFile"]);case 3:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getDetail:function(){var t=(0,n.default)(s.default.mark(function t(){var e=this;return s.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.loadData)(function(){return o.default.getOrderDetail(e.orderId)},function(t){t.orderItemDtos[0].customerDeviceDto.purchaseTime&&(t.orderItemDtos[0].customerDeviceDto.purchaseTime=(0,c.default)(t.orderItemDtos[0].customerDeviceDto.purchaseTime).format("YYYY-MM-DD")),t.orderStatusStr=e.orderStatusStr(t.orderStatus,t.paymentDto.paymentStatus,t.paymentDto.payType),e.detail=t},d.defaultPreHandler);case 2:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getExpands:function(){var t=(0,n.default)(s.default.mark(function t(){var e,a,r,i=this;return s.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.detail.orderItemDtos[0].customerDeviceDto.productCategoriesId){t.next=8;break}return e={orderId:this.orderId,deviceId:this.detail.orderItemDtos[0].customerDeviceDto.id},t.next=4,(0,d.loadData)(function(){return o.default.getDeviceExpands(e)},function(t){i.expand.expands=t},d.defaultPreHandler,!0);case 4:this.expand.otherExpand=v.default.filter(this.expand.expands,function(t){return 1!==t.objectExpandContentType&&3!==t.objectExpandContentType}),this.expand.imageExpand=v.default.filter(this.expand.expands,{objectExpandContentType:3}),(a=v.default.filter(this.expand.expands,{objectExpandContentType:5})).length>0&&(r=JSON.parse(a[0].value),this.address.desc=r.addressDescription,this.address.city.name=r.city,this.address.city.id=r.cityId,this.address.county.name=r.county,this.address.county.id=r.countyId,this.address.province.name=r.province,this.address.province.id=r.provinceId);case 8:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getScan:function(){var t=(0,n.default)(s.default.mark(function t(){var e,a=this;return s.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if("已完成"!==this.detail.orderStatusStr){t.next=4;break}return e=this.detail.partnerId,t.next=4,(0,d.loadData)(function(){return o.default.getPartner(e)},function(t){var e=t;a.scan=e.qrCode},d.defaultPreHandler,!0);case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),previewImage:function(t){var e=this;if(v.default.isEmpty(this.previewUrl)){var a=v.default.filter(this.expand.imageExpand,function(t){return t.value&&""!==t.value});v.default.forEach(a,function(t){e.previewUrl.push(t.value)})}l.default.previewImage({current:t,urls:this.previewUrl})},orderStatusStr:function(t,e,a){if(30===e||100===t)return"已退款";if(50===e||40===t)return"已取消";switch([t,e,a].join("")){case"110200":case"60200":case"110201":case"60201":case"60202":case"110202":return"已完成";case"20100":case"20202":case"20201":return"已支付,待录入";case"21100":return"未支付";default:return""}},payStatusColor:function(t){switch(t){case"未支付":return"color_1";case"已支付,待录入":return"color_2";case"已完成":return"color_0";default:return"color_3"}},goToPageProduct:function(t,e){this.$router.push({name:"ProductDescription",query:{servicePackId:t,licenceId:e}})},goToPageFilling:function(){this.removeOrderFilling(),this.$router.push({name:"OrderFilling",query:{orderId:this.orderId}})},goToPagePayList:function(){this.$router.push({name:"PayList",query:{orderId:this.orderId,paymentId:this.detail.paymentDto.id}})}})}},rMoQ:function(t,e){},zbjr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("eNtP"),i=a.n(r),s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"OrderDetail"},[a("div",{staticClass:"title bg_img_none"},[a("mt-cell",[a("p",{attrs:{slot:"title"},slot:"title"},[t._v("产品信息")])])],1),t._v(" "),a("div",{staticClass:"item_p",on:{click:function(e){t.goToPageProduct(t.detail.orderItemDtos[0].servicePackDto.servicePackId,t.detail.orderItemDtos[0].serviceOptionItem.licenceId)}}},[a("div",{staticClass:"item_img"},[a("img",{attrs:{src:t.detail.orderItemDtos[0].servicePackDto.fileUrl}})]),t._v(" "),a("div",{staticClass:"item_content"},[a("p",{staticClass:"item_over popup_color3"},[t._v(t._s(t.detail.orderItemDtos[0].servicePackDto.title))]),t._v(" "),a("p",{staticClass:"popup_color8",domProps:{innerHTML:t._s(t.detail.orderItemDtos[0].servicePackDto.summary)}})]),t._v(" "),a("div",{staticClass:"item_link"})]),t._v(" "),a("div",{staticClass:"title"},[a("mt-cell",[a("p",{attrs:{slot:"title"},slot:"title"},[t._v("客户信息")])])],1),t._v(" "),a("div",{staticClass:"content bg_img_none"},[a("div",{staticClass:"container"},[a("mt-cell",{attrs:{title:"客户姓名",value:t.detail.customerDto.customerName}})],1),t._v(" "),a("div",{staticClass:"container"},[a("mt-cell",{attrs:{title:"联系电话",value:t.detail.customerDto.phoneNumber}})],1)]),t._v(" "),a("div",{staticClass:"title"},[a("mt-cell",[a("p",{attrs:{slot:"title"},slot:"title"},[t._v("设备信息")])])],1),t._v(" "),a("div",{staticClass:"content bg_img_none"},[a("div",{staticClass:"container"},[a("mt-cell",{attrs:{title:"品类",value:t.detail.orderItemDtos[0].customerDeviceDto.productCategoriesName}})],1),t._v(" "),a("div",{staticClass:"container"},[a("mt-cell",{attrs:{title:"品牌",value:t.detail.orderItemDtos[0].customerDeviceDto.brandName}})],1),t._v(" "),t._l(t.expand.otherExpand,function(e){return a("div",{staticClass:"container"},[5!==e.objectExpandContentType?a("div",{staticClass:"container"},[a("mt-cell",{key:e.id,attrs:{title:e.text,value:e.value||" "}})],1):a("div",[a("div",{staticClass:"container"},[a("mt-cell",{attrs:{title:"省",value:t.address.province.name}})],1),t._v(" "),a("div",{staticClass:"container"},[a("mt-cell",{attrs:{title:"市",value:t.address.city.name}})],1),t._v(" "),a("div",{staticClass:"container"},[a("mt-cell",{attrs:{title:"县",value:t.address.county.name}})],1),t._v(" "),a("div",{staticClass:"container"},[a("mt-cell",{attrs:{title:"详细地址",value:t.address.desc}})],1)])])}),t._v(" "),a("div",{staticClass:"container"},[t.detail.orderItemDtos[0].customerDeviceDto.purchasePrice?a("mt-cell",{attrs:{title:"购机价格",value:"￥"+t.detail.orderItemDtos[0].customerDeviceDto.purchasePrice}}):t._e()],1),t._v(" "),a("div",{staticClass:"container"},[t.detail.orderItemDtos[0].customerDeviceDto.purchaseTime?a("mt-cell",{attrs:{title:"购机时间",value:t.detail.orderItemDtos[0].customerDeviceDto.purchaseTime}}):t._e()],1)],2),t._v(" "),t.expand.imageExpand.length>0?a("div",{staticClass:"equipment_pic content"},t._l(t.expand.imageExpand,function(e){return a("div",{staticClass:"pic"},[e.value&&""!==e.value?a("div",{staticClass:"img",style:{background:"url("+e.value+") no-repeat",backgroundSize:"cover",backgroundPosition:"center"},on:{click:function(a){t.previewImage(e.value)}}}):a("div",{staticClass:"text"},[t._v("未上传")]),t._v(" "),a("div",{staticClass:"nameplate"},[t._v(t._s(e.text))])])})):t._e(),t._v(" "),a("div",{staticClass:"title"},[a("mt-cell",[a("p",{attrs:{slot:"title"},slot:"title"},[t._v("支付信息")])])],1),t._v(" "),a("div",{staticClass:"content"},[a("mt-cell",{attrs:{title:"订单编号",value:t.detail.orderCode}}),t._v(" "),a("mt-cell",{attrs:{title:"产品",value:t.detail.orderItemDtos[0].serviceOptionItem.name}}),t._v(" "),a("mt-cell",{attrs:{title:"支付金额",value:"￥"+t.detail.paymentDto.payAmount}}),t._v(" "),a("mt-cell",{attrs:{title:"支付状态"}},[a("span",{class:t.payStatusColor(t.detail.orderStatusStr)},[t._v(t._s(t.detail.orderStatusStr))])])],1),t._v(" "),"已完成"===t.detail.orderStatusStr?a("div",{staticClass:"qrcode"},[a("p",[t._v("请用户微信扫描下方二维码，绑定手机即刻领取电子合同凭证。")]),t._v(" "),a("div",{staticClass:"img"},[a("img",{attrs:{src:t.scan}})])]):t._e(),t._v(" "),"已支付,待录入"===t.detail.orderStatusStr?a("div",{staticClass:"button",on:{click:function(e){t.goToPageFilling()}}},[a("mt-button",{attrs:{type:"primary",size:"large"}},[t._v("去录单,领佣金")])],1):t._e(),t._v(" "),"未支付"===t.detail.orderStatusStr?a("div",{staticClass:"button",on:{click:function(e){t.goToPageFilling()}}},[a("mt-button",{attrs:{type:"primary",size:"large"}},[t._v("去提交")])],1):t._e()])},staticRenderFns:[]},n=function(t){a("rMoQ")},o=a("VU/8")(i.a,s,!1,n,"data-v-29e90ad8",null);e.default=o.exports}});
//# sourceMappingURL=27.6bc508bf97b9ec954297.js.map