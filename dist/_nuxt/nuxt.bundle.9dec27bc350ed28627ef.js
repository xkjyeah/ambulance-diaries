webpackJsonp([4],{100:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(94);n.n(r);r.initializeApp({apiKey:"AIzaSyADqAVhWfQ2NlaZPf_xhp2cqm7T5iDkvCk",authDomain:"case-calendar-4b522.firebaseapp.com",databaseURL:"https://case-calendar-4b522.firebaseio.com",projectId:"case-calendar-4b522",storageBucket:"",messagingSenderId:"528259250615"})},101:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(17),o=n.n(r),i=n(185),a=n.n(i),s={_default:function(){return n.e(1).then(n.bind(null,196))}};e.default={head:{title:"starter",meta:[{charset:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{hid:"description",name:"description",content:"Nuxt.js project"}],link:[{rel:"icon",type:"image/x-icon",href:"/favicon.ico"}],style:[],script:[]},data:function(){return{layout:null,layoutName:""}},mounted:function(){this.$loading=this.$refs.loading,this.$nuxt.$loading=this.$loading},methods:{setLayout:function(t){t&&s["_"+t]||(t="default"),this.layoutName=t;var e="_"+t;return this.layout=s[e],this.layout},loadLayout:function(t){var e=this;t&&s["_"+t]||(t="default");var n="_"+t;return"function"!=typeof s[n]?o.a.resolve(s[n]):s[n]().then(function(t){return s[n]=t,s[n]}).catch(function(t){if(e.$nuxt)return e.$nuxt.error({statusCode:500,message:t.message});console.error(t)})}},components:{NuxtLoading:a.a}}},102:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"nuxt-error",props:["error"],head:function(){return{title:this.error.message||"An error occured"}}}},103:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(4);e.default={name:"nuxt-loading",data:function(){return{percent:0,show:!1,canSuccess:!0,duration:5e3,height:"2px",color:"#3B8070",failedColor:"red"}},methods:{start:function(){var t=this;return this.show=!0,this.canSuccess=!0,this._timer&&(clearInterval(this._timer),this.percent=0),this._cut=1e4/Math.floor(this.duration),this._timer=setInterval(function(){t.increase(t._cut*Math.random()),t.percent>95&&t.finish()},100),this},set:function(t){return this.show=!0,this.canSuccess=!0,this.percent=Math.floor(t),this},get:function(){return Math.floor(this.percent)},increase:function(t){return this.percent=this.percent+Math.floor(t),this},decrease:function(t){return this.percent=this.percent-Math.floor(t),this},finish:function(){return this.percent=100,this.hide(),this},pause:function(){return clearInterval(this._timer),this},hide:function(){var t=this;return clearInterval(this._timer),this._timer=null,setTimeout(function(){t.show=!1,r.default.nextTick(function(){setTimeout(function(){t.percent=0},200)})},500),this},fail:function(){return this.canSuccess=!1,this}}}},104:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(4),o=n(67),i=n(91),a=n.n(i);e.default={name:"nuxt",beforeCreate:function(){r.default.util.defineReactive(this,"nuxt",this.$root.$options._nuxt)},created:function(){r.default.prototype.$nuxt=this,this.$root.$nuxt=this,this.setLayout=this.$root.setLayout.bind(this.$root),"undefined"!=typeof window&&(window.$nuxt=this),this.error=this.$root.error},mounted:function(){this.$root.$loading&&this.$root.$loading.start&&(this.$loading=this.$root.$loading)},watch:{"nuxt.err":"errorChanged"},methods:{errorChanged:function(){this.nuxt.err&&this.$loading&&(this.$loading.fail&&this.$loading.fail(),this.$loading.finish&&this.$loading.finish())}},components:{NuxtChild:o.a,NuxtError:a.a}}},150:function(t,e,n){e=t.exports=n(62)(!0),e.push([t.i,".progress[data-v-0093547b]{position:fixed;top:0;left:0;right:0;height:2px;width:0;-webkit-transition:width .2s,opacity .4s;-o-transition:width .2s,opacity .4s;transition:width .2s,opacity .4s;opacity:1;background-color:#efc14e;z-index:999999}","",{version:3,sources:["C:/Users/Daniel/Desktop/case-calendar/.nuxt/components/nuxt-loading.vue"],names:[],mappings:"AACA,2BACE,eAAgB,AAChB,MAAS,AACT,OAAU,AACV,QAAW,AACX,WAAY,AACZ,QAAU,AACV,yCAA6C,AAC7C,oCAAwC,AACxC,iCAAqC,AACrC,UAAW,AACX,yBAA0B,AAC1B,cAAgB,CACjB",file:"nuxt-loading.vue",sourcesContent:["\n.progress[data-v-0093547b] {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  height: 2px;\n  width: 0%;\n  -webkit-transition: width 0.2s, opacity 0.4s;\n  -o-transition: width 0.2s, opacity 0.4s;\n  transition: width 0.2s, opacity 0.4s;\n  opacity: 1;\n  background-color: #efc14e;\n  z-index: 999999;\n}\n"],sourceRoot:""}])},151:function(t,e,n){e=t.exports=n(62)(!0),e.push([t.i,".error-page[data-v-76277d07]{color:#000;background:#fff;top:0;bottom:0;left:0;right:0;position:absolute;font-family:SF UI Text,Helvetica Neue,Lucida Grande;text-align:center;padding-top:20%}.error-code[data-v-76277d07]{display:inline-block;font-size:24px;font-weight:500;vertical-align:top;border-right:1px solid rgba(0,0,0,.298039);margin:0 20px 0 0;padding:10px 23px}.error-wrapper-message[data-v-76277d07]{display:inline-block;text-align:left;line-height:49px;height:49px;vertical-align:middle}.error-message[data-v-76277d07]{font-size:14px;font-weight:400;margin:0;padding:0}.error-link[data-v-76277d07]{color:#00bcd4;font-weight:400;text-decoration:none;font-size:14px}","",{version:3,sources:["C:/Users/Daniel/Desktop/case-calendar/.nuxt/components/nuxt-error.vue"],names:[],mappings:"AACA,6BACE,WAAY,AACZ,gBAAiB,AACjB,MAAO,AACP,SAAU,AACV,OAAQ,AACR,QAAS,AACT,kBAAmB,AACnB,oDAA6D,AAC7D,kBAAmB,AACnB,eAAiB,CAClB,AACD,6BACE,qBAAsB,AACtB,eAAgB,AAChB,gBAAiB,AACjB,mBAAoB,AACpB,2CAAgD,AAChD,kBAAyB,AACzB,iBAAmB,CACpB,AACD,wCACE,qBAAsB,AACtB,gBAAiB,AACjB,iBAAkB,AAClB,YAAa,AACb,qBAAuB,CACxB,AACD,gCACE,eAAgB,AAChB,gBAAoB,AACpB,SAAY,AACZ,SAAa,CACd,AACD,6BACE,cAAe,AACf,gBAAoB,AACpB,qBAAsB,AACtB,cAAgB,CACjB",file:"nuxt-error.vue",sourcesContent:['\n.error-page[data-v-76277d07] {\n  color: #000;\n  background: #fff;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  position: absolute;\n  font-family: "SF UI Text", "Helvetica Neue", "Lucida Grande";\n  text-align: center;\n  padding-top: 20%;\n}\n.error-code[data-v-76277d07] {\n  display: inline-block;\n  font-size: 24px;\n  font-weight: 500;\n  vertical-align: top;\n  border-right: 1px solid rgba(0, 0, 0, 0.298039);\n  margin: 0px 20px 0px 0px;\n  padding: 10px 23px;\n}\n.error-wrapper-message[data-v-76277d07] {\n  display: inline-block;\n  text-align: left;\n  line-height: 49px;\n  height: 49px;\n  vertical-align: middle;\n}\n.error-message[data-v-76277d07] {\n  font-size: 14px;\n  font-weight: normal;\n  margin: 0px;\n  padding: 0px;\n}\n.error-link[data-v-76277d07] {\n  color: #00BCD4;\n  font-weight: normal;\n  text-decoration: none;\n  font-size: 14px;\n}\n'],sourceRoot:""}])},184:function(t,e,n){var r=n(23)(n(101),n(189),null,null,null);t.exports=r.exports},185:function(t,e,n){function r(t){n(191)}var o=n(23)(n(103),n(187),r,"data-v-0093547b",null);t.exports=o.exports},186:function(t,e,n){var r=n(23)(n(104),n(190),null,null,null);t.exports=r.exports},187:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"progress",style:{width:t.percent+"%",height:t.height,"background-color":t.canSuccess?t.color:t.failedColor,opacity:t.show?1:0}})},staticRenderFns:[]}},188:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"error-page"},[n("div",[n("h1",{staticClass:"error-code"},[t._v(t._s(t.error.statusCode))]),n("div",{staticClass:"error-wrapper-message"},[n("h2",{staticClass:"error-message"},[t._v(t._s(t.error.message))])]),404===t.error.statusCode?n("p",[n("nuxt-link",{staticClass:"error-link",attrs:{to:"/"}},[t._v("Back to the home page")])],1):t._e()])])},staticRenderFns:[]}},189:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"__nuxt"}},[n("nuxt-loading",{ref:"loading"}),t.layout?n(t.layout,{tag:"component"}):t._e()],1)},staticRenderFns:[]}},190:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.nuxt.err?n("nuxt-error",{attrs:{error:t.nuxt.err}}):n("nuxt-child")},staticRenderFns:[]}},191:function(t,e,n){var r=n(150);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(63)("df18edde",r,!0)},192:function(t,e,n){var r=n(151);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(63)("4542d7b9",r,!0)},194:function(t,e){function n(t){throw new Error("Cannot find module '"+t+"'.")}n.keys=function(){return[]},n.resolve=n,t.exports=n,n.id=194},55:function(t,e,n){"use strict";function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.options.data||R;t.options.data=function(){var t=n.call(this);return E()({},t,e)},t._Ctor&&t._Ctor.options&&(t._Ctor.options.data=t.options.data)}function o(t){return t.options?(t._Ctor=t,t.extendOptions=t.options):(t=T.default.extend(t),t._Ctor=t),!t.options.name&&t.options.__file&&(t.options.name=t.options.__file),t}function i(t){return[].concat.apply([],t.matched.map(function(t){return $()(t.components).map(function(e){return t.components[e]})}))}function a(t){return[].concat.apply([],t.matched.map(function(t){return $()(t.instances).map(function(e){return t.instances[e]})}))}function s(t,e){return Array.prototype.concat.apply([],t.matched.map(function(t,n){return $()(t.components).map(function(r){return e(t.components[r],t.instances[r],t,r,n)})}))}function u(t,e){var n={isServer:!!t.isServer,isClient:!!t.isClient,isDev:!1,app:e,store:t.store,route:t.to?t.to:t.route,payload:t.payload,error:t.error,base:"/",env:{},hotReload:t.hotReload||!1},r=t.next;return n.params=n.route.params||{},n.query=n.route.query||{},n.redirect=function(t,e,o){t&&(n._redirected=!0,"string"!=typeof t||void 0!==e&&"object"!==(void 0===e?"undefined":b()(e))||(o=e||{},e=t,t=302),r({path:e,query:o,status:t}))},t.req&&(n.req=t.req),t.res&&(n.res=t.res),n}function c(t,e){return!t.length||e._redirected?_.a.resolve():d(t[0],e).then(function(){return c(t.slice(1),e)})}function d(t,e){var n=void 0;return n=2===t.length?new _.a(function(n){t(e,function(t,r){t&&e.error(t),r=r||{},n(r)})}):t(e),n&&(n instanceof _.a||"function"==typeof n.then)||(n=_.a.resolve(n)),n}function l(t){var e=window.location.pathname;return t&&0===e.indexOf(t)&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}function f(t,e){return v(p(t,e))}function p(t,e){for(var n,r=[],o=0,i=0,a="",s=e&&e.delimiter||"/";null!=(n=D.exec(t));){var u=n[0],c=n[1],d=n.index;if(a+=t.slice(i,d),i=d+u.length,c)a+=c[1];else{var l=t[i],f=n[2],p=n[3],h=n[4],A=n[5],v=n[6],g=n[7];a&&(r.push(a),a="");var C=null!=f&&null!=l&&l!==f,y="+"===v||"*"===v,_="?"===v||"*"===v,w=n[2]||s,b=h||A;r.push({name:p||o++,prefix:f||"",delimiter:w,optional:_,repeat:y,partial:C,asterisk:!!g,pattern:b?m(b):g?".*":"[^"+x(w)+"]+?"})}}return i<t.length&&(a+=t.substr(i)),a&&r.push(a),r}function h(t){return encodeURI(t).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function A(t){return encodeURI(t).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function v(t){for(var e=new Array(t.length),n=0;n<t.length;n++)"object"===b()(t[n])&&(e[n]=new RegExp("^(?:"+t[n].pattern+")$"));return function(n,r){for(var o="",i=n||{},a=r||{},s=a.pretty?h:encodeURIComponent,u=0;u<t.length;u++){var c=t[u];if("string"!=typeof c){var d,l=i[c.name];if(null==l){if(c.optional){c.partial&&(o+=c.prefix);continue}throw new TypeError('Expected "'+c.name+'" to be defined')}if(Array.isArray(l)){if(!c.repeat)throw new TypeError('Expected "'+c.name+'" to not repeat, but received `'+C()(l)+"`");if(0===l.length){if(c.optional)continue;throw new TypeError('Expected "'+c.name+'" to not be empty')}for(var f=0;f<l.length;f++){if(d=s(l[f]),!e[u].test(d))throw new TypeError('Expected all "'+c.name+'" to match "'+c.pattern+'", but received `'+C()(d)+"`");o+=(0===f?c.prefix:c.delimiter)+d}}else{if(d=c.asterisk?A(l):s(l),!e[u].test(d))throw new TypeError('Expected "'+c.name+'" to match "'+c.pattern+'", but received "'+d+'"');o+=c.prefix+d}}else o+=c}return o}}function x(t){return t.replace(/([.+*?=^!:()[\]|\/\\])/g,"\\$1")}function m(t){return t.replace(/([=!:$\/()])/g,"\\$1")}e.e=r,e.g=o,e.b=i,e.i=a,e.f=s,e.a=u,e.h=c,e.d=d,e.j=l,e.c=f;var g=n(105),C=n.n(g),y=n(17),_=n.n(y),w=n(57),b=n.n(w),B=n(106),$=n.n(B),k=n(65),E=n.n(k),T=n(4),R=function(){return{}},D=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},67:function(t,e,n){"use strict";var r=(n(4),["name","mode","css","type","duration","enterClass","leaveClass","enterActiveClass","enterActiveClass","leaveActiveClass","enterToClass","leaveToClass"]),o=["beforeEnter","enter","afterEnter","enterCancelled","beforeLeave","leave","afterLeave","leaveCancelled"];e.a={name:"nuxt-child",functional:!0,render:function(t,e){var n=e.parent,i=e.data;i.nuxtChild=!0;for(var a=n.$nuxt.nuxt.transitions,s=n.$nuxt.nuxt.defaultTransition,u=0;n;)n.$vnode&&n.$vnode.data.nuxtChild&&u++,n=n.$parent;i.nuxtChildDepth=u;var c=a[u]||s,d={};r.forEach(function(t){void 0!==c[t]&&(d[t]=c[t])});var l={};return o.forEach(function(t){"function"==typeof c[t]&&(l[t]=c[t])}),t("transition",{props:d,on:l},[t("router-view",i)])}}},91:function(t,e,n){function r(t){n(192)}var o=n(23)(n(102),n(188),r,"data-v-76277d07",null);t.exports=o.exports},92:function(t,e,n){"use strict";n.d(e,"b",function(){return k});var r=n(58),o=n.n(r),i=n(33),a=n.n(i),s=n(65),u=n.n(s),c=n(17),d=n.n(c),l=n(56),f=n.n(l),p=n(4),h=n(59),A=n.n(h),v=n(98),x=n(99),m=n(67),g=n(97),C=n(91),y=n.n(C),_=n(186),w=n.n(_),b=n(184),B=n.n(b),$=n(55);n.d(e,"a",function(){return y.a});var k=function(){var t=f()(o.a.mark(function t(e){var r,i,s,c,l;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(r=n.i(x.a)(),i=n.i(v.a)(),!e||!e.url){t.next=5;break}return t.next=5,new d.a(function(t,n){i.push(e.url,t,n)});case 5:if(window.__NUXT__&&window.__NUXT__.state&&r.replaceState(window.__NUXT__.state),s=u()({router:i,store:r,_nuxt:{defaultTransition:T,transitions:[T],setTransitions:function(t){return Array.isArray(t)||(t=[t]),t=t.map(function(t){return t=t?"string"==typeof t?a()({},T,{name:t}):a()({},T,t):T}),this.$options._nuxt.transitions=t,t},err:null,dateErr:null,error:function(t){return t=t||null,"string"==typeof t&&(t={statusCode:500,message:t}),this.$options._nuxt.dateErr=Date.now(),this.$options._nuxt.err=t,t}}},B.a),c=e?e.next:function(t){return s.router.push(t)},l=n.i($.a)({isServer:!!e,isClient:!e,route:i.currentRoute,next:c,store:r,req:e?e.req:void 0,res:e?e.res:void 0},s),delete l.error,"function"!=typeof E){t.next=13;break}return t.next=13,E(l);case 13:return t.abrupt("return",{app:s,router:i,store:r});case 14:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}();window._nuxtReadyCbs=[],window.onNuxtReady=function(t){window._nuxtReadyCbs.push(t)};var E=n(100);E=E.default||E,p.default.component(m.a.name,m.a),p.default.component(g.a.name,g.a),p.default.component(w.a.name,w.a),p.default.use(A.a,{keyName:"head",attribute:"data-n-head",ssrAttribute:"data-n-head-ssr",tagIDKeyName:"hid"});var T={name:"page",mode:"out-in"}},93:function(t,e,n){"use strict";var r=n(64),o=n.n(r),i=n(95),a=i.keys(),s={},u=!0,c=!1,d=void 0;try{for(var l,f=o()(a);!(u=(l=f.next()).done);u=!0){var p=l.value;s[p.replace(/^\.\//,"").replace(/\.(js|ts)$/,"")]=function(t){var e=i(t);return e.default?e.default:e}(p)}}catch(t){c=!0,d=t}finally{try{!u&&f.return&&f.return()}finally{if(c)throw d}}e.a=s},95:function(t,e){function n(t){throw new Error("Cannot find module '"+t+"'.")}n.keys=function(){return[]},n.resolve=n,t.exports=n,n.id=95},96:function(t,e,n){"use strict";function r(t,e,n){return t.map(function(t){var r=t.options.transition;return"function"==typeof r?r(e,n):r})}function o(t,e,r){var o=this,i=n.i(y.f)(t,function(t,e,r,o){return"function"!=typeof t||t.options?(t=n.i(y.g)(t),r.components[o]=t,r.components[o]):new x.a(function(e,i){var a=function(t){t=n.i(y.g)(t),r.components[o]=t,e(t)};t().then(a).catch(i)})}),a=e.fullPath.split("#")[0],s=t.fullPath.split("#")[0];this._hashChanged=a===s,this._hashChanged||this.$loading.start&&this.$loading.start(),x.a.all(i).then(function(){return r()}).catch(function(t){var e=t.statusCode||t.status||t.response&&t.response.status||500;o.error({statusCode:e,message:t.message}),r(!1)})}function i(t,e,r){var o=this,i=[],a=!1;if(void 0!==r&&(i=[],r.middleware&&(i=i.concat(r.middleware)),t.forEach(function(t){t.options.middleware&&(i=i.concat(t.options.middleware))})),i=i.map(function(t){return"function"!=typeof g.a[t]&&(a=!0,o.error({statusCode:500,message:"Unknown middleware "+t})),g.a[t]}),!a)return n.i(y.h)(i,e)}function a(t,e){n.i(y.f)(t,function(t,e,n,r){return"object"!==(void 0===t?"undefined":l()(t))||t.options||(t=m.default.extend(t),t._Ctor=t,n.components[r]=t),t})}function s(t,e){var r=this;this._hashChanged||m.default.nextTick(function(){var e=n.i(y.i)(t);B=e.map(function(t,e){if(!t)return"";if(b[e]===t.constructor._path&&"function"==typeof t.constructor.options.data){var n=t.constructor.options.data.call(t);for(var r in n)m.default.set(t.$data,r,n[r])}return t.constructor.options.__file}),r._hadError&&r._dateLastError===r.$options._nuxt.dateErr&&r.error();var o=r.$options._nuxt.err?C.a.layout:t.matched[0].components.default.options.layout;"function"==typeof o&&(o=o(r._context)),r.setLayout(o),setTimeout(function(){return u(r)},100)})}function u(t){return}function c(t){window._nuxtReadyCbs.forEach(function(e){"function"==typeof e&&e(t)}),"function"==typeof window._onNuxtLoaded&&window._onNuxtLoaded(t),k.afterEach(function(e,n){t.$nuxt.$emit("routeChanged",e,n)})}Object.defineProperty(e,"__esModule",{value:!0});var d=n(57),l=n.n(d),f=n(58),p=n.n(f),h=n(56),A=n.n(h),v=n(17),x=n.n(v),m=n(4),g=n(93),C=n(92),y=n(55),_=this,w=function(){var t=A()(p.a.mark(function t(e,o,a){var s,u,c,d,l,f,h,A=this;return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this._hashChanged){t.next=2;break}return t.abrupt("return",a());case 2:if(s=void 0,u=!1,c=function(t){this.$loading.finish&&this.$loading.finish(),u||(u=!0,a(t))},d=n.i(y.a)({to:e,store:E,isClient:!0,next:c.bind(this),error:this.error.bind(this)},$),l=n.i(y.b)(e),this._context=d,this._dateLastError=this.$options._nuxt.dateErr,this._hadError=!!this.$options._nuxt.err,l.length){t.next=24;break}return t.next=13,i.call(this,l,d);case 13:if(!d._redirected){t.next=15;break}return t.abrupt("return");case 15:return t.next=17,this.loadLayout("function"==typeof C.a.layout?C.a.layout(d):C.a.layout);case 17:return s=t.sent,t.next=20,i.call(this,l,d,s);case 20:if(!d._redirected){t.next=22;break}return t.abrupt("return");case 22:return this.error({statusCode:404,message:"This page could not be found."}),t.abrupt("return",a());case 24:return l.forEach(function(t){t._Ctor&&t._Ctor.options&&(t.options.asyncData=t._Ctor.options.asyncData,t.options.fetch=t._Ctor.options.fetch)}),this.setTransitions(r(l,e,o)),t.prev=26,t.next=29,i.call(this,l,d);case 29:if(!d._redirected){t.next=31;break}return t.abrupt("return");case 31:return s=l[0].options.layout,"function"==typeof s&&(s=s(d)),t.next=35,this.loadLayout(s);case 35:return s=t.sent,t.next=38,i.call(this,l,d,s);case 38:if(!d._redirected){t.next=40;break}return t.abrupt("return");case 40:if(f=!0,l.forEach(function(t){f&&"function"==typeof t.options.validate&&(f=t.options.validate({params:e.params||{},query:e.query||{},store:d.store}))}),f){t.next=45;break}return this.error({statusCode:404,message:"This page could not be found."}),t.abrupt("return",a());case 45:return t.next=47,x.a.all(l.map(function(t,r){if(t._path=n.i(y.c)(e.matched[r].path)(e.params),!A._hadError&&t._path===b[r]&&r+1!==l.length)return x.a.resolve();var o=[];if(t.options.asyncData&&"function"==typeof t.options.asyncData){var i=n.i(y.d)(t.options.asyncData,d);i.then(function(e){n.i(y.e)(t,e),A.$loading.increase&&A.$loading.increase(30)}),o.push(i)}if(t.options.fetch){var a=t.options.fetch(d);a&&(a instanceof x.a||"function"==typeof a.then)||(a=x.a.resolve(a)),a.then(function(){return A.$loading.increase&&A.$loading.increase(30)}),o.push(a)}return x.a.all(o)}));case 47:b=l.map(function(t,r){return n.i(y.c)(e.matched[r].path)(e.params)}),this.$loading.finish&&this.$loading.finish(),u||a(),t.next=59;break;case 52:t.prev=52,t.t0=t.catch(26),b=[],t.t0.statusCode=t.t0.statusCode||t.t0.status||t.t0.response&&t.t0.response.status||500,h=C.a.layout,"function"==typeof h&&(h=h(d)),this.loadLayout(h).then(function(){A.error(t.t0),a(!1)});case 59:case"end":return t.stop()}},t,this,[[26,52]])}));return function(e,n,r){return t.apply(this,arguments)}}(),b=[],B=[],$=void 0,k=void 0,E=void 0,T=window.__NUXT__||{};if(!T)throw new Error("[nuxt.js] cannot find the global variable __NUXT__, make sure the server is working.");var R=function(t){var e=n.i(y.j)(t.options.base);return n.i(y.f)(t.match(e),function(t,e,r,o,i){return"function"!=typeof t||t.options?(t=n.i(y.g)(t),r.components[o]=t,t):new x.a(function(e,a){var s=function(t){t=n.i(y.g)(t),T.serverRendered&&n.i(y.e)(t,T.data[i]),r.components[o]=t,e(t)};t().then(s).catch(a)})})};n.i(C.b)().then(function(){var t=A()(p.a.mark(function t(e){var i,d,l,f;return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return $=e.app,k=e.router,E=e.store,t.next=5,x.a.all(R(k));case 5:return i=t.sent,d=new m.default($),l=T.layout||"default",t.next=10,d.loadLayout(l);case 10:if(d.setLayout(l),f=function(){d.$mount("#__nuxt"),m.default.nextTick(function(){u(d),c(d)})},d.setTransitions=d.$options._nuxt.setTransitions.bind(d),i.length&&(d.setTransitions(r(i,k.currentRoute)),b=k.currentRoute.matched.map(function(t){return n.i(y.c)(t.path)(k.currentRoute.params)}),B=i.map(function(t){return t.options.__file})),d.error=d.$options._nuxt.error.bind(d),d.$loading={},T.error&&d.error(T.error),k.beforeEach(o.bind(d)),k.beforeEach(w.bind(d)),k.afterEach(a),k.afterEach(s.bind(d)),!T.serverRendered){t.next=24;break}return f(),t.abrupt("return");case 24:w.call(d,k.currentRoute,k.currentRoute,function(t){if(t){var e=!1;return k.afterEach(function(){e||(e=!0,f())}),void k.push(t)}a(k.currentRoute,k.currentRoute),s.call(d,k.currentRoute,k.currentRoute),f()});case 25:case"end":return t.stop()}},t,_)}));return function(e){return t.apply(this,arguments)}}()).catch(function(t){console.error("[nuxt.js] Cannot load components",t)})},97:function(t,e,n){"use strict";n(4);e.a={name:"nuxt-link",functional:!0,render:function(t,e){return t("router-link",e.data,e.children)}}},98:function(t,e,n){"use strict";function r(){return new i.default({mode:"hash",base:"/",linkActiveClass:"nuxt-link-active",linkExactActiveClass:"nuxt-link-exact-active",scrollBehavior:u,routes:[{path:"/",component:a,name:"index"},{path:"/diaries/:id?/:date?",component:s,name:"diaries-id-date"}]})}e.a=r;var o=n(4),i=n(60);o.default.use(i.default);var a=function(){return n.e(2).then(n.bind(null,198))},s=function(){return n.e(0).then(n.bind(null,197))},u=function(t,e,n){if(n)return n;var r={};return t.matched.length<2?r={x:0,y:0}:t.matched.some(function(t){return t.components.default.options.scrollToTop})&&(r={x:0,y:0}),t.hash&&(r={selector:t.hash}),r}},99:function(t,e,n){"use strict";function r(t){var e=l(t),n=e.default||e;if(n.commit)throw new Error("[nuxt] store/"+t.replace("./","")+" should export a method which returns a Vuex instance.");if(n.state&&"function"!=typeof n.state)throw new Error("[nuxt] state should be a function in store/"+t.replace("./",""));return n}function o(t,e){if(1===e.length)return t.modules;var n=e.shift();return t.modules[n]=t.modules[n]||{},t.modules[n].namespaced=!0,t.modules[n].modules=t.modules[n].modules||{},o(t.modules[n],e)}n.d(e,"a",function(){return w});var i=n(33),a=n.n(i),s=n(64),u=n.n(s),c=n(4),d=n(61);c.default.use(d.default);var l=n(194),f=l.keys(),p={},h=f.find(function(t){return t.includes("./index.")});if(h&&(p=r(h)),"function"!=typeof p){p.modules||(p.modules={});var A=!0,v=!1,x=void 0;try{for(var m,g=u()(f);!(A=(m=g.next()).done);A=!0){var C=m.value,y=C.replace(/^\.\//,"").replace(/\.(js|ts)$/,"");if("index"!==y){var _=y.split(/\//),t=o(p,_);y=_.pop(),t[y]=r(C),t[y].namespaced=!0}}}catch(t){v=!0,x=t}finally{try{!A&&g.return&&g.return()}finally{if(v)throw x}}}var w=p instanceof Function?p:function(){return new d.default.Store(a()({},p,{state:p.state instanceof Function?p.state():{}}))}}},[96]);