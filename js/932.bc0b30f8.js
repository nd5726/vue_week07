"use strict";(self["webpackChunkvue_cli01"]=self["webpackChunkvue_cli01"]||[]).push([[932],{1932:function(t,e,o){o.r(e),o.d(e,{default:function(){return y}});var i=o(3396),s=o(7139);const a={class:"prolist flex flex-wrap container mx-auto"},l={class:"p-3 bg-gray-200"},d={class:"font-bold text-gray-700 text-xl pt-3 pb-1"},r={class:"mr-4 inline-flex mb-3"},n=(0,i.Uk)("原價 : "),c={class:"line-through"},u={class:"font-bold inline-flex mb-3 text-lg"},g=(0,i.Uk)("特價 : "),p={class:"flex justify-between"},h=(0,i.Uk)("詳細介紹"),b=["onClick","disabled"];function f(t,e,o,f,x,m){const v=(0,i.up)("router-link"),y=(0,i.up)("VLoading");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("ul",a,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(x.productList,(t=>((0,i.wg)(),(0,i.iD)("li",{class:"w-1/5 px-2 mb-4",key:t.id},[(0,i._)("div",l,[(0,i._)("div",{class:"product-image w-full bg-cover",style:(0,s.j5)({backgroundImage:`url( ${t.imageUrl} )`})},null,4),(0,i._)("p",d,(0,s.zw)(t.title),1),(0,i._)("p",r,[n,(0,i._)("span",c,(0,s.zw)(t.origin_price),1)]),(0,i._)("p",u,[g,(0,i._)("span",null,(0,s.zw)(t.price)+" 元",1)]),(0,i._)("div",p,[(0,i.Wm)(v,{to:`/product/${t.id}`,class:"bg-gray-500 text-white focus:ring-4 focus:ring-gray-300 rounded border border-gray-200 text-sm font-bold px-4 py-2 hover:bg-gray-600 disabled:opacity-50",disabled:x.isLoadingitem===t.id},{default:(0,i.w5)((()=>[h])),_:2},1032,["to","disabled"]),(0,i._)("button",{type:"button",class:"bg-blue-500 text-white focus:ring-4 focus:ring-gray-300 rounded border border-gray-200 text-sm font-bold px-4 py-2 hover:bg-blue-600 disabled:opacity-50",onClick:e=>m.addtoCart(t.id),disabled:x.isLoadingitem===t.id},"加入購物車",8,b)])])])))),128))]),(0,i.Wm)(y,{active:x.isLoading},null,8,["active"])],64)}var x={data(){return{productList:{},isLoadingitem:"",isLoading:!1}},methods:{getProducts(){this.$http.get("https://vue3-course-api.hexschool.io/v2/api/nd5726-hexschool/products/all").then((t=>{this.productList=t.data.products}))},addtoCart(t,e=1){this.isLoading=!0;const o={product_id:t,qty:e};this.$http.post("https://vue3-course-api.hexschool.io/v2/api/nd5726-hexschool/cart",{data:o}).then((t=>{console.log(t),alert(t.data.message),this.isLoading=!1})).catch((t=>{console.log(t)}))}},mounted(){console.log(this.$http),this.getProducts()}},m=o(89);const v=(0,m.Z)(x,[["render",f]]);var y=v}}]);
//# sourceMappingURL=932.bc0b30f8.js.map