<template>
  <div class="container mx-auto shrink px-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="border-l-8 border-slate-600 text-2xl font-bold text-slate-600 leading-none tracking-wider pl-4">產品管理</h2>
      <button class="block text-white text-lg font-bold bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 rounded-lg px-8 py-2 text-center " type="button" data-modal-toggle="defaultModal" v-on:click="openFormModal( 'new' , item)">新增產品</button>
    </div>
    <table class="w-full">
      <tbody>
        <tr class="text-base bg-slate-600 text-white">
          <th class="w-2/12 flex-shrink-0 py-3 px-4 text-left"><p>產品分類</p></th>
          <th class="w-4/12 flex-shrink-0 py-3 px-4 text-left"><p>產品名稱</p></th>
          <th class="w-1/12 py-3 px-4"><p>原價</p></th>
          <th class="w-1/12 py-3 px-4"><p>售價</p></th>
          <th class="w-1/12 py-3 px-4"><p>是否啟用</p></th>
          <th class="w-3/12 py-3 px-4"><p>動作</p></th>
        </tr>
        <tr v-for="product in products" :key="product.name" class="text-center odd:bg-gray-100 text-gray-500 font-bold">
          <td class="w-2/12 py-3 px-4 text-left">
            <p>{{ product.category }}</p>
          </td>
          <td class="w-4/12 py-3 px-4 text-left">
            <p>{{ product.title }}</p>
          </td>
          <td class="w-1/12 py-3 px-4">
            <p>{{ product.origin_price }}</p>
          </td>
          <td class="w-1/12 py-3 px-4">
            <p>{{ product.price }}</p>
          </td>
          <td class="w-1/12 py-3 px-4">
            <p v-if="product.is_enabled"><span class="text-green-600">啟用</span></p>
            <p v-else><span class="text-black">未啟用</span></p>
          </td>
          <td class="w-3/12 py-3 px-4 ">
            <button type="button" class="bg-slate-300 font-bold rounded px-4 py-2 mx-2" @click="openFormModal('edit', product)">
              編輯
            </button>
            <button type="button" class="bg-red-700 text-white font-bold rounded px-4 py-2 mx-2" @click="openFormModal('delete', product)">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="font-bold text-slate-500 my-4 text-right tracking-wider">目前有 {{ products.length }} 項產品</p>
  </div>
  <PaginationComponent :pages="pagination" @update-pages="getProducts"></PaginationComponent>
  <ProductModal :title="productmodalTitle" @update-product="updateProduct" @add-image="addImage" :temp-product="tempProduct" ref="productModal"></ProductModal>
  <DeleteModal @delete-item="deleteProduct" :item="tempProduct" ref="deleteModal"></DeleteModal>
  <VLoading :active="isLoading"></VLoading>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      products: [],
      pagination: [],
      tempProduct: {
        imagesUrl: []
      },
      isNew: false,
      isLoading: false,
      productmodalTitle: ''
    }
  },
  components: {
    ProductModal, DeleteModal, PaginationComponent
  },
  methods: {
    getProducts (page = 1) {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
    },
    updateProduct (temp) {
      this.isLoading = true
      if (this.isNew === false) {
        this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${temp.id}`, { data: temp })
          .then(res => {
            alert(res.data.message)
            this.getProducts()
            this.closeFormModal()
            this.isLoading = false
          })
          .catch(err => {
            alert(err.response.data.message)
          })
      } else {
        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`, { data: temp })
          .then((res) => {
            alert(res.data.message)
            this.getProducts()
            this.closeFormModal()
            this.isLoading = false
          })
          .catch(err => {
            alert(err.response.data.message)
          })
      }
    },
    deleteProduct () {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          alert(res.data.message)
          this.getProducts()
          this.closeDeleteModal()
          this.isLoading = false
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    addImage () {
      if (this.tempProduct.imagesUrl === undefined) {
        this.tempProduct.imagesUrl = [] // 如果原本沒有更多圖片，新增一個空陣列
      }
      this.tempProduct.imagesUrl.push('')
    },
    openFormModal (option, item) {
      if (option === 'edit') {
        this.productmodalTitle = '編輯產品'
        this.tempProduct = { ...item }
        this.isNew = false
        this.$refs.productModal.showFormModal = true
      } else if (option === 'new') {
        this.productmodalTitle = '新增產品'
        this.isNew = true
        this.tempProduct = {
          imagesUrl: []
        }
        this.$refs.productModal.showFormModal = true
      } else {
        this.tempProduct = { ...item }
        this.$refs.deleteModal.showDeleteModal = true
      }
    },
    closeFormModal () {
      this.$refs.productModal.showFormModal = false
    },
    closeDeleteModal () {
      this.$refs.deleteModal.showDeleteModal = false
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
