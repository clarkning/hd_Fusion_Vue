webpackJsonp([62],{hOM7:function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(r,"__esModule",{value:!0});var u=n(t("Xxa5")),a=n(t("exGp")),d=n(t("3D1+")),i=t("JaHG");r.default={name:"BaiPay",data:function(){return{orderId:null,orderCode:null,returnFruit:null}},created:function(){var e=(0,a.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.orderId=this.$route.query.orderId,this.submitOrder();case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),methods:{submitOrder:function(){var e=(0,a.default)(u.default.mark(function e(){var r=this;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,i.loadData)(function(){return d.default.submitOrders(r.orderId)},function(e){r.returnFruit=e,r.returnFruit&&r.$router.replace({name:"OrderBai",query:{orderId:r.orderId}})},i.boolPreHandler,!0);case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}}},"iqy+":function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t("hOM7"),u=t.n(n),a={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]},d=t("VU/8")(u.a,a,!1,null,null,null);r.default=d.exports}});
//# sourceMappingURL=62.db9ffc9b3b0ce355dd8e.js.map