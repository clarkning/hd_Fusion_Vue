webpackJsonp([16],{"1MfQ":function(t,s){},Yx07:function(t,s,e){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(s,"__esModule",{value:!0});var n=a(e("Gu7T")),i=a(e("BO1k")),r=a(e("mvHQ")),l=a(e("Dd8w")),o=a(e("Xxa5")),u=a(e("exGp")),c=e("NYxO"),d=a(e("M4fF")),f=e("JaHG");s.default={name:"TaskSchedule",data:function(){return{personTaskId:null,sameLevelSubTask:[],subLevelSubTask:[],showSubLevelSubTask:[],detail:{task:{taskItems:[],amerce:[],reward:[]},personTaskStatus:null,progress:[]},noMore:!0,loading:!1}},created:function(){var t=(0,u.default)(o.default.mark(function t(){var s=this;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.personTaskId=Number(this.$route.query.personTaskId),t.next=3,this.getTaskList();case 3:return this.getTaskDetail(),t.next=6,(0,f.loadData)(function(){return s.getSubTaskDetail()});case 6:this.getTaskDetail(),this.showSubTaskDetail(),this.showSubLevelSubTask=this.subLevelSubTask.slice(0,10);case 9:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),methods:(0,l.default)({},(0,c.mapActions)(["getOrganizationInfo","getSameInfo","getSubInfo"]),(0,c.mapActions)("task",["getPersonTaskList","getSubTask","getDetail"]),{getTaskDetail:function(){var t=d.default.find(this.storePersonTask,{personTaskId:this.personTaskId});this.detail=JSON.parse((0,r.default)(t))},showSubTaskDetail:function(){this.detail.sameLevelSubTask&&(this.getSameLevelSubTask(),this.getSubLevelSubTask())},getSubTaskDetail:function(){var t=(0,u.default)(o.default.mark(function t(){var s;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.detail.sameLevelSubTask||"分解任务"!==this.detail.task.taskType){t.next=6;break}return t.next=3,this.getSubTaskPerson();case 3:return s={subPersonTaskIds:this.detail.subPersonTaskIds,partnerId:this.detail.partnerId,taskId:this.detail.taskId},t.next=6,this.getSubTask(s);case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getSubTaskPerson:function(){var t=(0,u.default)(o.default.mark(function t(){var s;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getOrganizationInfo(this.$store.state.person.personId);case 2:return s=d.default.find(this.$store.state.person.orgInfo,{partnerId:this.detail.partnerId}).organizationId,t.next=5,this.getSameInfo(s);case 5:return t.next=7,this.getSubInfo(s);case 7:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),taskProgress:function(t){var s=!0,e=!1,a=void 0;try{for(var n,r=(0,i.default)(t.task.taskItems);!(s=(n=r.next()).done);s=!0){var l=n.value,o=d.default.find(t.progress,{taskItemId:l.taskItemId}),u=parseInt(o.distribute||0),c=u/l.target*100,f=o.progress||0,v=f/l.target*100;c=c>0&&c<1?1:Math.floor(c),v=v>0&&v<1?1:Math.floor(v);var k={status:o.status,progress:f,progressRate:v,distribute:u,taskAllotRate:c};d.default.assign(l,k)}}catch(t){e=!0,a=t}finally{try{!s&&r.return&&r.return()}finally{if(e)throw a}}},getSameLevelSubTask:function(){var t=this,s=this.detail.sameLevelSubTask.filter(function(t){return t.taskStatus&&"新建"!==t.taskStatus});this.sameLevelSubTask=JSON.parse((0,r.default)(s)),d.default.forEach(this.sameLevelSubTask,function(s){t.taskProgress(s)})},getSubLevelSubTask:function(){var t=this,s=this.detail.subLevelSubTask.filter(function(t){return t.taskStatus&&"新建"!==t.taskStatus});this.subLevelSubTask=JSON.parse((0,r.default)(s)),this.noMore=this.subLevelSubTask.length<10,d.default.forEach(this.subLevelSubTask,function(s){t.taskProgress(s)})},getTaskList:function(){var t=(0,u.default)(o.default.mark(function t(){var s,e,a;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!d.default.isEmpty(this.storePersonTask)){t.next=6;break}return s=1,e=this,a=function(){var t=(0,u.default)(o.default.mark(function t(){var n,i;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getPersonTaskList(s);case 2:if(n=d.default.find(e.storePersonTask,{personTaskId:e.personTaskId})){t.next=9;break}return s++,t.next=7,a();case 7:t.next=12;break;case 9:return i={taskId:n.taskId,personTaskId:n.personTaskId},t.next=12,e.getDetail(i);case 12:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),t.next=6,a();case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),loadMore:function(){var t=this;this.noMore||(this.loading=!0,setTimeout(function(){var s,e=t.showSubLevelSubTask.length,a=e+10;t.noMore=t.subLevelSubTask.slice(e,a).length<10,(s=t.showSubLevelSubTask).push.apply(s,(0,n.default)(t.subLevelSubTask.slice(e,a))),t.loading=!1},2e3))}}),computed:(0,l.default)({},(0,c.mapState)("task",{storePersonTask:function(t){return t.taskList.personTask}}))}},ueq0:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("Yx07"),n=e.n(a),i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"TaskSchedule SubTaskDetail"},[t._l(t.sameLevelSubTask,function(s){return e("div",{staticClass:"case"},[e("div",{staticClass:"subTask bg_img_none"},[e("mt-cell",[e("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(s.personName)),e("mt-badge",{attrs:{size:"normal",type:"warning"}},[t._v(t._s(s.taskStatus))])],1),t._v(" "),e("span",{staticClass:"subTaskSpan"},[t._v("完成进度: "+t._s(s.task.finishRate)+"%")])]),t._v(" "),e("mt-cell",[e("span",{staticClass:"organizeTitle",attrs:{slot:"title"},slot:"title"},[t._v("组织")]),t._v(" "),e("span",{staticClass:"organizeValue"},[t._v(t._s(s.organizationNamePath))])]),t._v(" "),e("mt-cell",[e("span",{staticClass:"organizeTitle",attrs:{slot:"title"},slot:"title"},[t._v("职位")]),t._v(" "),e("span",{staticClass:"organizeValue"},[t._v(t._s(s.positionName))])])],1),t._v(" "),e("div",{staticClass:"form"},[e("div",{staticClass:"bg_img_none"},t._l(s.task.taskItems,function(s){return e("div",{key:s.id},[e("div",{staticClass:"bg_img_none"},[e("mt-cell",{attrs:{title:s.name}},[e("span",{staticClass:"fontfamily"},[t._v(t._s(s.target))]),t._v(" "),"销售量"===s.targetType?e("span",{staticClass:"fontfamily"},[t._v("单")]):e("span",{staticClass:"fontfamily"},[t._v("元")])])],1),t._v(" "),e("div",{staticClass:"bg_img_none computed"},[e("mt-cell",{attrs:{title:"已完成"}},[e("div",{staticClass:"flex t-l"},[t._v(t._s(s.progressRate)+"%")]),t._v(" "),e("div",{staticClass:"flex t-r"},[t._v(t._s(s.progress))])])],1)])})),t._v(" "),s.task.reward.length>0?e("div",{staticClass:"bg_img_none"},[e("mt-cell",[e("p",{attrs:{slot:"title"},slot:"title"},t._l(s.task.reward,function(s){return e("span",{staticClass:"t-l w-3 f-s-10",class:{database:"佣金"===s.taskIncomeObject,star:"经验"===s.taskIncomeObject,leaf:"积分"===s.taskIncomeObject}},[e("i",{staticClass:"fa",attrs:{"aria-hidden":"true"}}),t._v(" "),"佣金"===s.taskIncomeObject?e("span",[t._v("+"+t._s(s.incomeValue)+" 元")]):e("span",[t._v("+"+t._s(s.incomeValue)+"/"+t._s(s.taskIncomeObject))])])}))])],1):t._e()])])}),t._v(" "),e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"300"}},t._l(t.showSubLevelSubTask,function(s){return e("div",{directives:[{name:"show",rawName:"v-show",value:s.decomposition,expression:"subTask.decomposition"}],staticClass:"case"},[e("div",{staticClass:"subTask bg_img_none"},[e("mt-cell",[e("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(s.personName)),e("mt-badge",{attrs:{size:"normal",type:"warning"}},[t._v(t._s(s.taskStatus))])],1),t._v(" "),e("span",{staticClass:"subTaskSpan"},[t._v("完成进度: "+t._s(s.task.finishRate)+"%")])]),t._v(" "),e("mt-cell",[e("span",{staticClass:"organizeTitle",attrs:{slot:"title"},slot:"title"},[t._v("组织")]),t._v(" "),e("span",{staticClass:"organizeValue"},[t._v(t._s(s.organizationNamePath))])]),t._v(" "),e("mt-cell",[e("span",{staticClass:"organizeTitle",attrs:{slot:"title"},slot:"title"},[t._v("职位")]),t._v(" "),e("span",{staticClass:"organizeValue"},[t._v(t._s(s.positionName))])])],1),t._v(" "),e("div",{staticClass:"form"},[e("div",{staticClass:"bg_img_none"},t._l(s.task.taskItems,function(s){return e("div",{key:s.id},[e("div",{staticClass:"bg_img_none"},[e("mt-cell",{attrs:{title:s.name}},[e("span",{staticClass:"fontfamily"},[t._v(t._s(s.target))]),t._v(" "),"销售量"===s.targetType?e("span",{staticClass:"fontfamily"},[t._v("单")]):e("span",{staticClass:"fontfamily"},[t._v("元")])])],1),t._v(" "),e("div",{staticClass:"bg_img_none computed"},[e("mt-cell",{attrs:{title:"已分配"}},[e("div",{staticClass:"flex t-l"},[t._v(t._s(s.taskAllotRate)+"%")]),t._v(" "),e("div",{staticClass:"flex t-r"},[t._v(t._s(s.distribute))])]),t._v(" "),e("mt-cell",{attrs:{title:"已完成"}},[e("div",{staticClass:"flex t-l"},[t._v(t._s(s.progressRate)+"%")]),t._v(" "),e("div",{staticClass:"flex t-r"},[t._v(t._s(s.progress))])])],1)])})),t._v(" "),s.task.reward.length>0?e("div",{staticClass:"bg_img_none"},[e("mt-cell",[e("p",{attrs:{slot:"title"},slot:"title"},t._l(s.task.reward,function(s){return e("span",{staticClass:"t-l w-3 f-s-10",class:{database:"佣金"===s.taskIncomeObject,star:"经验"===s.taskIncomeObject,leaf:"积分"===s.taskIncomeObject}},[e("i",{staticClass:"fa",attrs:{"aria-hidden":"true"}}),t._v(" "),"佣金"===s.taskIncomeObject?e("span",[t._v("+"+t._s(s.incomeValue)+" 元")]):e("span",[t._v("+"+t._s(s.incomeValue)+"/"+t._s(s.taskIncomeObject))])])}))])],1):t._e()])])})),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"load"},[e("mt-spinner",{attrs:{color:"#d4d4d4",type:"fading-circle"}}),t._v("\n    正在加载\n  ")],1)],2)},staticRenderFns:[]},r=function(t){e("1MfQ")},l=e("VU/8")(n.a,i,!1,r,"data-v-16d21b0f",null);s.default=l.exports}});
//# sourceMappingURL=16.8e0659f8862eab628d7f.js.map