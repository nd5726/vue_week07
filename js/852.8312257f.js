"use strict";(self["webpackChunkvue_cli01"]=self["webpackChunkvue_cli01"]||[]).push([[852],{5852:function(t,e,s){s.r(e),s.d(e,{default:function(){return k}});var l=s(3396),o=s(7139);const c={class:"w-full lg:w-3/5 shrink-0 mx-auto flex flex-col items-start bg-gray-200 p-8"},i={class:"flex item-start"},a={class:"flex w-1/2 flex-shrink-0 flex-col items-stretch"},r={class:"w-full"},d=["src","alt"],u={class:"w-full mt-4 flex imageslist"},n=["src"],p={class:"flex flex-col items-start p-8"},m={class:"flex items-center"},h={class:"text-slate-600 text-2xl font-bold mr-4"},g={class:"text-white bg-gray-500 rounded text-sm px-2 py-1"},x={class:"text-gray-500 text-base font-bold my-2"},f={class:"text-gray-500 text-base font-bold my-2"},w={class:"text-slate-600 text-lg font-bold mr-4"},_={class:"line-through ml-2"};function v(t,e,s,v,b,P){const y=(0,l.up)("Loading");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("div",c,[(0,l._)("button",{class:"text-white bg-gray-400 rounded px-4 py-2 mb-4",onClick:e[0]||(e[0]=e=>t.$router.go(-1))},"＜回列表"),(0,l._)("div",i,[(0,l._)("div",a,[(0,l._)("div",r,[(0,l._)("img",{src:b.tempProduct.imageUrl,alt:b.tempProduct.title},null,8,d)]),(0,l._)("ul",u,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(b.tempProduct.imagesUrl,(t=>((0,l.wg)(),(0,l.iD)("li",{key:t.id,class:"mb-4 w-1/5 pr-4"},[(0,l._)("img",{src:t,alt:""},null,8,n)])))),128))])]),(0,l._)("div",p,[(0,l._)("div",m,[(0,l._)("h1",h,(0,o.zw)(b.tempProduct.title),1),(0,l._)("span",g,(0,o.zw)(b.tempProduct.category),1)]),(0,l._)("p",x,(0,o.zw)(b.tempProduct.description),1),(0,l._)("p",f,(0,o.zw)(b.tempProduct.content),1),(0,l._)("p",w,[(0,l.Uk)("售價 : "+(0,o.zw)(b.tempProduct.price)+" /",1),(0,l._)("span",_,(0,o.zw)(b.tempProduct.origin_price),1),(0,l.Uk)(" "+(0,o.zw)(b.tempProduct.unit),1)])])])]),(0,l.Wm)(y,{active:b.isLoading},null,8,["active"])],64)}var b={data(){return{productList:{},isLoadingitem:"",isLoading:!1,tempProduct:[],qty:"1"}},methods:{getProducts(){const{id:t}=this.$route.params;this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/nd5726-hexschool/product/${t}`).then((t=>{this.tempProduct=t.data.product}))},addtoCart(t,e=1){this.isLoading=!0;const s={product_id:t,qty:e};this.$http.post("https://vue3-course-api.hexschool.io/v2/api/nd5726-hexschool/cart",{data:s}).then((t=>{alert(t.data.message),this.isLoading=!1})).catch((t=>{console.log(t)}))}},mounted(){this.getProducts()}},P=s(89);const y=(0,P.Z)(b,[["render",v]]);var k=y}}]);
//# sourceMappingURL=852.8312257f.js.map