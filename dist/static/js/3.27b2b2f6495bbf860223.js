webpackJsonp([3],{I4t6:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=a(n("Dd8w")),o=a(n("Xxa5")),i=a(n("exGp")),s=n("NYxO"),c=n("JaHG"),u=a(n("M4fF")),d=a(n("3D1+"));e.default={name:"login",created:function(){var t=(0,i.default)(o.default.mark(function t(){var e,n,a,r=this;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e=this.$store.state.person.personId)){t.next=10;break}if(n=window.localStorage.getItem("dimension2"),a=window.localStorage.getItem("dimension1"),n&&a){t.next=8;break}return t.next=7,(0,c.loadData)(function(){return r.loadProject(e)});case 7:this.setGaDimension();case 8:this.$ga.set("userId",e),this.$router.push({path:"/home"});case 10:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),methods:(0,r.default)({},(0,s.mapActions)(["getOrganizationInfo"]),{loadProject:function(){var t=(0,i.default)(o.default.mark(function t(e){var n,a=this;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.getOrganizationInfo(e);case 3:if(!(n=this.$store.state.person.orgInfo[0])){t.next=9;break}if(u.default.find(this.$store.state.project,{organizationId:n.organizationId})){t.next=9;break}return t.next=9,(0,c.loadData)(function(){return d.default.getProjects(n.organizationId)},function(t){var e={partnerId:n.partnerId,organizationId:n.organizationId,response:t,organizationNamePath:n.organizationNamePath,positionType:n.positionType,organizationName:n.organizationName};a.$store.commit("setProject",e)},c.defaultPreHandler,!0);case 9:t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.error(t.t0);case 14:case"end":return t.stop()}},t,this,[[0,11]])}));return function(e){return t.apply(this,arguments)}}(),setGaDimension:function(){try{var t=this.$store.state.person.orgInfo[0];if(t.organizationNamePath){var e=void 0,n=t.organizationNamePath.indexOf("/");e=-1!==n?t.organizationNamePath.slice(0,n):t.organizationName,this.$ga.set("dimension2",e),localStorage.setItem("dimension2",e)}var a=u.default.find(this.$store.state.project,{organizationId:t.organizationId});a&&a.projectList.length>0&&(this.$ga.set("dimension1",a.projectList[0].projectName),localStorage.setItem("dimension1",a.projectList[0].projectName))}catch(t){console.error(t)}}})}},K31e:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("I4t6"),r=n.n(a),o={render:function(){var t=this.$createElement;return(this._self._c||t)("div")},staticRenderFns:[]},i=n("VU/8")(r.a,o,!1,null,null,null);e.default=i.exports}});
//# sourceMappingURL=3.27b2b2f6495bbf860223.js.map