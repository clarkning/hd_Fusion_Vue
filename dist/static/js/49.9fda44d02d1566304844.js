webpackJsonp([49],{I3BM:function(e,t){},mZLc:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("zZWP"),n=s.n(a),r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"MessageDetails"},[s("div",[s("h4",[e._v(e._s(e.detail.title))])]),e._v(" "),s("div",{staticClass:"des",domProps:{innerHTML:e._s(e.detail.content)}}),e._v(" "),s("div",{staticClass:"time"},[e._v(e._s(e.detail.publishTime))]),e._v(" "),"可接任务"===e.detail.messageType?s("div",{staticClass:"looktask"},[s("mt-button",{attrs:{type:"primary",size:"large",disabled:!e.taskStatus},on:{click:function(t){e.goToPageTaskSchedule(e.detail.objectId)}}},[e._v("\n      查看任务\n    ")])],1):e._e()])},staticRenderFns:[]},i=function(e){s("I3BM")},u=s("VU/8")(n.a,r,!1,i,"data-v-5dd11e22",null);t.default=u.exports},zZWP:function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(s("Dd8w")),r=a(s("Xxa5")),i=a(s("exGp")),u=s("NYxO"),c=s("JaHG");t.default={name:"MessageDetails",created:function(){var e=(0,i.default)(r.default.mark(function e(){return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.messageId=Number(this.$route.query.messageId),e.next=3,this.getList();case 3:return e.next=5,this.getDetail();case 5:0===this.$store.state.messages.filter(function(e){return e.status}).length?this.$store.commit("deleteMessage",this.messageId):this.$store.commit("setMessageStatus",this.messageId);case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),data:function(){return{messageId:null,detail:{title:"",content:"",publishTime:"",messageType:"",objectId:"",personMessageId:"",taskStatusDesc:""},taskId:null,taskStatus:!1}},methods:(0,n.default)({},(0,u.mapActions)(["getMessageList","getTaskListAcceptable"]),{getDetail:function(){var e=(0,i.default)(r.default.mark(function e(){var t,s=this;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=this.$store.state.messages.find(function(e){return e.personMessageId===s.messageId}),this.detail=t,"生效"===this.detail.taskStatusDesc?this.taskStatus=!0:this.taskStatus=!1;case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),getList:function(){var e=(0,i.default)(r.default.mark(function e(){var t,s,a,n=this;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this,this.$store.state.messages.find(function(e){return e.personMessageId===n.messageId})){e.next=7;break}return s={page:1,read:!0},a=function(){var e=(0,i.default)(r.default.mark(function e(){return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,c.loadData)(function(){return t.getMessageList(s)});case 2:if(!t.$store.state.messages.find(function(e){return e.personMessageId===t.messageId})){e.next=6;break}e.next=9;break;case 6:return s.page++,e.next=9,a();case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),e.next=7,a();case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),goToPageTaskSchedule:function(){var e=(0,i.default)(r.default.mark(function e(t){return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.$router.push({name:"TaskSchedule",query:{taskId:t,content:"detail"}});case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()})}}});
//# sourceMappingURL=49.9fda44d02d1566304844.js.map