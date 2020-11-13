webpackJsonp([28],{"0kdL":function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(r("BO1k")),s=a(r("Gu7T")),i=a(r("Dd8w")),o=a(r("Xxa5")),u=a(r("exGp")),c=a(r("3D1+")),d=r("JaHG"),l=a(r("PJh5")),f=(0,r("NYxO").createNamespacedHelpers)("order").mapMutations;t.default={name:"MyOrder",data:function(){return{orderList:[],page:1,noMore:!0,loading:!1,showList:!1}},created:function(){var e=(0,u.default)(o.default.mark(function e(){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getList();case 2:this.showList=!0;case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),methods:(0,i.default)({},f(["removeOrderFilling"]),{getList:function(){var e=(0,u.default)(o.default.mark(function e(){var t=this;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,d.loadData)(function(){return c.default.getOrders(t.page)},function(){var e=(0,u.default)(o.default.mark(function e(r){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.setDraw(r);case 2:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}(),d.defaultPreHandler);case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),setDraw:function(){var e=(0,u.default)(o.default.mark(function e(t){var r,a,i,u,f,p,v,m=this;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=!0,i=!1,u=void 0,e.prev=3,f=o.default.mark(function e(){var t;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=v.value,t.submitTime=(0,l.default)(t.submitTime).format("YYYY-MM-DD HH:mm:ss"),t.status=m.orderStatusStr(t.orderStatus,t.paymentDto.paymentStatus,t.paymentDto.payType),3!==t.awardStatus){e.next=6;break}return e.next=6,(0,d.loadData)(function(){return c.default.getIsDraw(t.orderId)},function(e){var r=e;m.$set(t,"award",r.awardName.slice(0,16))},d.defaultPreHandler,!0);case 6:case"end":return e.stop()}},e,m)}),p=(0,n.default)(t);case 6:if(a=(v=p.next()).done){e.next=11;break}return e.delegateYield(f(),"t0",8);case 8:a=!0,e.next=6;break;case 11:e.next=17;break;case 13:e.prev=13,e.t1=e.catch(3),i=!0,u=e.t1;case 17:e.prev=17,e.prev=18,!a&&p.return&&p.return();case 20:if(e.prev=20,!i){e.next=23;break}throw u;case 23:return e.finish(20);case 24:return e.finish(17);case 25:(r=this.orderList).push.apply(r,(0,s.default)(t)),this.noMore=this.orderList.length<5*this.page;case 27:case"end":return e.stop()}},e,this,[[3,13,17,25],[18,,20,24]])}));return function(t){return e.apply(this,arguments)}}(),LoadMore:function(){var e=(0,u.default)(o.default.mark(function e(){var t=this;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.noMore){e.next=2;break}return e.abrupt("return");case 2:return this.loading=!0,this.page+=1,e.next=6,(0,d.loadData)(function(){return c.default.getOrders(t.page)},function(){var e=(0,u.default)(o.default.mark(function e(r){var a;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=r,e.next=3,(0,d.loadData)(function(){t.setDraw(a)},null,null,!0);case 3:case"end":return e.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}(),d.defaultPreHandler,!0);case 6:this.loading=!1;case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),goToPageOrderDetail:function(e){this.$router.push({name:"OrderDetail",query:{orderId:e}})},goToPagePayList:function(e,t){this.$router.push({name:"PayList",query:{orderId:e,paymentId:t}})},goToPageOrderFilling:function(e){this.removeOrderFilling(),this.$router.push({name:"OrderFilling",query:{orderId:e}})},goToPageDraw:function(e){this.$router.push({name:"Draw",query:{orderId:e}})},color:function(e){switch(e){case"未支付":return"color_1";case"已支付,待录入":return"color_2";case"已完成":return"color_0";default:return"color_3"}},orderStatusStr:function(e,t,r){if(30===t||100===e)return"已退款";if(50===t||40===e)return"已取消";switch([e,t,r].join("")){case"110200":case"60200":case"110201":case"60201":case"60202":case"110202":return"已完成";case"20100":case"20202":case"20201":return"已支付,待录入";case"21100":return"未支付";default:return""}}})}},WpRF:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("0kdL"),n=r.n(a),s={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"show",rawName:"v-show",value:e.showList,expression:"showList"}],staticClass:"MyOrder"},[0===e.orderList.length?r("div",{staticClass:"null_data"},[r("div",{staticClass:"null"}),e._v(" "),r("p",[e._v("暂无历史订单")])]):r("div",[r("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.LoadMore,expression:"LoadMore"}],attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"300"}},e._l(e.orderList,function(t){return r("div",{staticClass:"bg_img_none",on:{click:function(r){e.goToPageOrderDetail(t.orderId)}}},[r("mt-cell",{attrs:{title:"产品："+t.orderItemDtos[0].serviceOptionItem.name}},[r("span",{class:e.color(t.status)},[e._v(e._s(t.status))])]),e._v(" "),r("div",{staticClass:"content"},[r("mt-cell",{attrs:{title:"订单编号",value:t.orderCode}}),e._v(" "),r("mt-cell",{attrs:{title:"品牌品类"}},[r("span",[e._v(e._s(t.orderItemDtos[0].customerDeviceDto.brandName||""))]),e._v(" "),r("span",{staticClass:"m-l5"},[e._v(e._s(t.orderItemDtos[0].customerDeviceDto.productCategoriesName||""))])]),e._v(" "),r("mt-cell",{attrs:{title:"客户姓名",value:t.customerDto.customerName}}),e._v(" "),r("mt-cell",{attrs:{title:"订单金额",value:"￥"+t.paymentDto.payAmount}}),e._v(" "),r("mt-cell",{attrs:{title:"下单时间",value:t.submitTime}}),e._v(" "),"已完成"===t.status&&t.awardStatus&&1!==t.awardStatus?r("div",[r("mt-cell",{attrs:{title:"抽奖结果"}},[3===t.awardStatus?r("span",[e._v(e._s(t.award))]):e._e(),e._v(" "),2===t.awardStatus?r("span",[e._v("未中奖")]):e._e()])],1):e._e()],1),e._v(" "),"未支付"===t.status?r("div",[r("mt-button",{attrs:{type:"primary",size:"large"},on:{click:function(r){r.stopPropagation(),e.goToPageOrderFilling(t.orderId)}}},[e._v("去提交\n          ")])],1):e._e(),e._v(" "),"已支付,待录入"===t.status?r("div",[r("mt-button",{attrs:{type:"primary",size:"large"},on:{click:function(r){r.stopPropagation(),e.goToPageOrderFilling(t.orderId)}}},[e._v("去录单,领佣金")])],1):e._e(),e._v(" "),"已完成"===t.status?r("div",[1===t.awardStatus?r("mt-button",{attrs:{type:"danger",size:"large"},on:{click:function(r){r.stopPropagation(),e.goToPageDraw(t.orderId)}}},[e._v("去抽奖\n          ")]):e._e()],1):e._e()],1)})),e._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:e.noMore,expression:"noMore"}],staticClass:"load noMore"},[e._v("已无更多")]),e._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"load"},[r("mt-spinner",{attrs:{color:"#d4d4d4",type:"fading-circle"}}),e._v("\n      正在加载\n    ")],1)])])},staticRenderFns:[]},i=function(e){r("a8Av")},o=r("VU/8")(n.a,s,!1,i,"data-v-d687b18e",null);t.default=o.exports},a8Av:function(e,t){}});
//# sourceMappingURL=28.32ddb147d2e2850c9fbf.js.map