<template>
    <div class="w-full lg:w-3/5 shrink-0 mx-auto flex flex-col items-start bg-gray-200 p-8">
      <button class="text-white bg-gray-400 rounded px-4 py-2 mb-4" @click="$router.go(-1)">＜回列表</button>
      <div class="flex item-start">
        <div class="flex w-1/2 flex-shrink-0 flex-col items-stretch">
            <div class="w-full">
                <img v-bind:src="tempProduct.imageUrl" v-bind:alt="tempProduct.title">
            </div>
            <ul class="w-full mt-4 flex imageslist">
                <li v-for="images in tempProduct.imagesUrl" :key="images.id" class="mb-4 w-1/5 pr-4">
                    <img v-bind:src="images" alt="">
                </li>
            </ul>
        </div>
        <div class="flex flex-col items-start p-8">
            <div class="flex items-center">
                <h1 class="text-slate-600 text-2xl font-bold mr-4">{{ tempProduct.title }}</h1>
                <span class="text-white bg-gray-500 rounded text-sm px-2 py-1">{{ tempProduct.category }}</span>
            </div>
            <p class="text-gray-500 text-base font-bold my-2">{{ tempProduct.description }}</p>
            <p class="text-gray-500 text-base font-bold my-2">{{ tempProduct.content }}</p>
            <p class="text-slate-600 text-lg font-bold mr-4">售價 : {{ tempProduct.price }} /<span class="line-through ml-2">{{ tempProduct.origin_price }}</span> {{ tempProduct.unit }}</p>
            <!--<div class="flex mt-8">
                <input type="number" v-model="qty" class="w-40 p-2 border rounded">
                <button type="button" @click="$emit('add-to-cart', tempProduct.id ,qty)"  class="bg-blue-500  text-white focus:ring-4 focus:ring-gray-300 rounded border border-gray-200 text-sm font-bold px-4 py-2  hover:bg-blue-600" >加入購物車</button>
            </div> -->
        </div>
      </div>
    </div>
    <Loading :active="isLoading"></Loading>
</template>

<style>
    .product-image{
        padding-bottom: 100%;
    }
</style>

<script>
export default {
  data () {
    return {
      productList: {},
      isLoadingitem: '',
      isLoading: false,
      tempProduct: [],
      qty: '1'
    }
  },
  methods: {
    getProducts () {
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then(res => {
          this.tempProduct = res.data.product
        })
    },
    addtoCart (id, qty = 1) {
      this.isLoading = true
      const data = {
        product_id: id,
        qty
      }
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then(res => {
          // console.log(res)
          alert(res.data.message)
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
