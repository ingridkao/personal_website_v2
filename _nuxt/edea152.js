(window.webpackJsonp=window.webpackJsonp||[]).push([[9,7],{351:function(t,e,n){"use strict";n.r(e);var r={name:"Utterances",computed:{colorMode:function(){return"dark"===this.$colorMode.preference?"dark":"light"}},mounted:function(){this.createUtterances()},methods:{createUtterances:function(){var t=document.createElement("script"),e=document.getElementById("comment");t.type="text/javascript",t.src="https://utteranc.es/client.js",t.setAttribute("repo","ingridkao/personal_website_issue"),t.setAttribute("issue-term","pathname"),t.setAttribute("theme","github-".concat(this.colorMode)),t.crossorigin="anonymous",t.async=!0,e.appendChild(t)}}},c=r,o=n(20),component=Object(o.a)(c,(function(){return(0,this._self._c)("div",{attrs:{id:"comment"}})}),[],!1,null,null,null);e.default=component.exports},377:function(t,e,n){"use strict";n.r(e);var r=n(9),c=(n(52),{asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,t.params,e.prev=1,e.next=4,n({deep:!0}).fetch();case 4:return r=e.sent,e.abrupt("return",{document:r});case 8:e.prev=8,e.t0=e.catch(1),error({statusCode:404,message:"Page could not be found"});case 11:case"end":return e.stop()}}),e,null,[[1,8]])})))()}}),o=n(20),component=Object(o.a)(c,(function(){var t=this,e=t._self._c;return e("div",[e("NuxtContent",{staticClass:"prose dark:prose-invert lg:prose-lg xl:prose-2xl mx-auto",attrs:{document:t.document}}),t._v(" "),e("Utterances")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Utterances:n(351).default})}}]);