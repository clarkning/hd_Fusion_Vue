webpackJsonp([1],{HfX5:function(t,e){},wIux:function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=s(i("BO1k")),o=s(i("Dd8w")),n=s(i("Xxa5")),a=s(i("exGp")),c=i("NYxO"),l=i("JaHG"),h=s(i("31Wn")),u=s(i("hb1U"));e.default={name:"ChooseProject",components:{bottomNav:u.default,sellProgress:h.default},data:function(){return{isSell:!1,isRanking:!1,isReport:!1,bottomNav:"sales",project:{list:[],listNone:!1},showList:!1,pushName:""}},created:function(){var t=(0,a.default)(n.default.mark(function t(){var e=this;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.setType(),t.next=3,(0,l.loadData)(function(){return e.getProject()});case 3:this.getProjectList(),this.setNamePath(),this.redirect();case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),methods:(0,o.default)({},(0,c.mapActions)(["getProject"]),{setType:function(){this.isSell="ChooseProject"===this.$route.name,this.isRanking="ChooseRankingProject"===this.$route.name,this.isReport="ChooseReportProject"===this.$route.name,this.isSell&&(this.pushName=this.$route.meta.pushName)},setNamePath:function(){var t=!0,e=!1,i=void 0;try{for(var s,o=(0,r.default)(this.project.list);!(t=(s=o.next()).done);t=!0){var n=s.value;if(n.organizationNamePath){var a=n.organizationNamePath.indexOf("/");n.namePath=-1!==a?n.organizationNamePath.slice(0,a):n.organizationName}}}catch(t){e=!0,i=t}finally{try{!t&&o.return&&o.return()}finally{if(e)throw i}}},getProjectList:function(){var t=[];if(this.isSell){var e=!0,i=!1,s=void 0;try{for(var o,n=(0,r.default)(this.$store.state.project);!(e=(o=n.next()).done);e=!0){var a=o.value;if(a.positionType){a.positionType.split(",").find(function(t){return"销售"===t})&&t.push(a)}}}catch(t){i=!0,s=t}finally{try{!e&&n.return&&n.return()}finally{if(i)throw s}}}else t=this.$store.state.project.filter(function(t){return t.projectList.length>0});this.project.list=t.filter(function(t){return t.projectList.length>0}),this.project.listNone=0===this.project.list.length},setGaDimension:function(t,e){try{var i=this.project.list.find(function(e){return e.organizationId===t}),s=i.projectList.find(function(t){return t.projectId===e});this.$ga.set("dimension2",i.namePath),this.$ga.set("dimension1",s.projectName),localStorage.setItem("dimension2",i.namePath),localStorage.setItem("dimension1",s.projectName)}catch(t){console.error(t)}},goToPage:function(t,e,i){this.setGaDimension(t,e);var s={store:t,project:e};this.isRanking?this.pushName="Ranking":this.isReport&&(this.pushName="Overview",s.partnerId=i),this.$router.push({name:this.pushName,query:s})},redirect:function(){if(1===this.project.list.length&&1===this.project.list[0].projectList.length){var t=this.project.list[0].organizationId,e=this.project.list[0].projectList[0].projectId,i=this.project.list[0].partnerId;this.isSell?(this.setGaDimension(t,e),this.$router.replace({name:this.pushName,query:{store:t,project:e,redirect:!0}})):this.goToPage(t,e,i)}else this.showList=!0}})}},yMuG:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("wIux"),r=i.n(s),o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bg"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.showList,expression:"showList"}]},[t.project.listNone?i("div",{staticClass:"null_data"},[i("div",{staticClass:"null"}),t._v(" "),i("p",[t._v("暂无可选项目")])]):i("div",{staticClass:"ChooseProject bg_img_none"},[t.isSell?i("div",[i("sellProgress")],1):t._e(),t._v(" "),i("div",{class:{margin:t.isSell}},t._l(t.project.list,function(e){return e.namePath?i("div",[i("div",{staticClass:"title"},[i("mt-cell",[i("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.namePath))])])],1),t._v(" "),e.projectList.length>0?i("div",{staticClass:"choose clear"},t._l(e.projectList,function(s){return i("div",{staticClass:"pic",on:{click:function(i){t.goToPage(e.organizationId,s.projectId,e.partnerId)}}},[i("div",[i("img",{staticClass:"img",attrs:{src:s.projectLogo}})]),t._v(" "),i("div",[t._v(t._s(s.projectName))])])})):t._e()]):t._e()}))])]),t._v(" "),t.isSell?i("div",[i("bottomNav",{attrs:{select:t.bottomNav}})],1):t._e()])},staticRenderFns:[]},n=function(t){i("HfX5")},a=i("VU/8")(r.a,o,!1,n,"data-v-1143d2fe",null);e.default=a.exports}});
//# sourceMappingURL=1.8cd249609e162267ed63.js.map