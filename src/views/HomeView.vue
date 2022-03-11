<template>
  <div class=" w-full fixed top-0 bg-white">
    <nav class="flex  py-4 justify-center mx-auto items-center frontend container ">
        <div class="text-xl mx-4"><router-link to="/">首頁</router-link></div>
        <div class="text-xl mx-4"><router-link to="/products">前台產品列表</router-link></div>
        <div class="text-xl mx-4"><router-link to="/cart">前台購物車</router-link></div>
        <div class="text-xl mx-4"><router-link to="/admin/product">後台管理</router-link></div>
    </nav>
  </div>
  <div  class="mt-20">
    <router-view/>
  </div>
</template>
