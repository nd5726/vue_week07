<template>
    <ul class="prolist flex flex-wrap container  mx-auto">
            <li class="w-1/5 px-2 mb-4" v-for="product in productList" :key="product.id">
                <div class="p-3 bg-gray-200">
                    <div class="product-image w-full bg-cover" :style="{backgroundImage:`url( ${product.imageUrl} )`}"></div>
                    <p class="font-bold text-gray-700 text-xl pt-3 pb-1">{{ product.title }}</p>
                    <p class="mr-4 inline-flex mb-3">原價 : <span class="line-through">{{ product.origin_price }}</span></p>
                    <p class="font-bold inline-flex mb-3 text-lg">特價 : <span> {{ product.price }} 元</span></p>
                    <div class="flex justify-between">
                        <router-link :to="`/product/${product.id}`" class="bg-gray-500  text-white focus:ring-4 focus:ring-gray-300 rounded border border-gray-200 text-sm font-bold px-4 py-2  hover:bg-gray-600 disabled:opacity-50" :disabled="isLoadingitem === product.id">詳細介紹</router-link>
                        <button type="button" class="bg-blue-500  text-white focus:ring-4 focus:ring-gray-300 rounded border border-gray-200 text-sm font-bold px-4 py-2  hover:bg-blue-600 disabled:opacity-50" @click="addtoCart(product.id)" :disabled="isLoadingitem === product.id">加入購物車</button>
                    </div>
                </div>
            </li>
        </ul>
        <VLoading :active="isLoading"></VLoading>
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
      isLoading: false
    }
  },
  methods: {
    getProducts () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then(res => {
          this.productList = res.data.products
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
          console.log(res)
          alert(res.data.message)
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    console.log(this.$http)
    this.getProducts()
  }
}
</script>
