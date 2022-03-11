<template>
    <div class="container mx-auto shrink px-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="border-l-8 border-sky-700 text-2xl font-bold text-sky-700 leading-none tracking-wider pl-4">訂單管理</h2>
    </div>
    <table class="w-full">
      <tbody>
        <tr class="text-base bg-sky-700 text-white">
          <th class="w-1/12 flex-shrink-0 py-3"><p>購買時間</p></th>
          <th class="w-3/12 py-3"><p>Email</p></th>
          <th class="w-3/12 py-3"><p class="text-left">購買品項</p></th>
          <th class="w-1/12 py-3"><p>應付金額</p></th>
          <th class="w-2/12 py-3"><p>是否付款</p></th>
          <th class="w-3/12 py-3"><p>動作</p></th>
        </tr>
        <tr v-for="order in orders" :key="order.id" class="text-center odd:bg-gray-100 text-gray-500 font-bold">
          <td class="w-1/12 py-3 px-1">
            <p>{{ $timeFormat.formatTime(order.create_at) }}</p>
          </td>
          <td class="w-3/12 py-3 px-1">
            <p>{{ order.user.email }}</p>
          </td>
          <td class="w-3/12 py-3 px-1">
            <ul class=" list-disc">
                <li v-for="item in order.products" :key="item.product.id">
                    <p class="text-left">{{ item.product.title }} ：<span class="ml-2">{{ item.qty }} {{ item.product.unit }}</span></p>
                </li>
            </ul>
          </td>
          <td class="w-1/12 py-3 px-1">
            <p>{{ order.total }}</p>
          </td>
          <td class="w-2/12 py-3 px-1">
           <div class="flex-row items-start">
              <label :for="order.id+'paid'" class="inline-flex items-center justify-center">
                <div class="relative">
                  <input type="checkbox" :id="order.id+'paid'" class="sr-only" @change="updateOrderPaid(order)" :true-value="true" :false-value="false" v-model="order.is_paid"/>
                  <div class="block bg-white w-14 h-8 rounded-full border"></div>
                  <div class="dot absolute left-1 top-1 bg-gray-200 w-6 h-6 rounded-full transition"></div>
                </div>
              </label>
            </div>
          </td>
          <td class="w-3/12 py-3 px-1">
            <button type="button" class="bg-slate-300 font-bold rounded px-4 py-2 mx-2" @click="openFormModal('edit', order)">
              檢視
            </button>
            <button type="button" class="bg-red-700 text-white font-bold rounded px-4 py-2 mx-2" @click="openFormModal('delete', order)">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <PaginationComponent :pages="pagination" @update-pages="getOrders"></PaginationComponent>
    <OrderModal ref="orderModal" @update-order-paid="updateOrderPaid" :temp-order="tempOrder"></OrderModal>
    <DeleteModal @delete-item="deleteOrder" :item="tempOrder" ref="deleteModal"></DeleteModal>
    <VLoading :active="isLoading"></VLoading>
</template>
<script>
import DeleteModal from '@/components/DeleteModal.vue'
import OrderModal from '@/components/OrderModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      orders: {},
      tempOrder: {},
      pagination: {},
      isLoading: false
    }
  },
  components: {
    DeleteModal, PaginationComponent, OrderModal
  },
  methods: {
    getOrders (page = 1) {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`)
        .then(res => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          console.log(this.orders)
        })
    },
    deleteOrder () {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`)
        .then(res => {
          console.log(this.tempOrder)
          alert(res.data.message)
          this.$refs.deleteModal.showDeleteModal = false
          this.getOrders()
          this.isLoading = false
        })
    },
    updateOrderPaid (item) {
      this.isLoading = true
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`, { data: item })
        .then(res => {
          alert(res.data.message)
          this.$refs.orderModal.showOrderModal = false
          this.getOrders()
          this.isLoading = false
        })
    },
    openFormModal (option, item) {
      this.tempOrder = { ...item }
      if (option === 'edit') {
        console.log('edit')
        this.$refs.orderModal.showOrderModal = true
      } else if (option === 'delete') {
        this.$refs.deleteModal.showDeleteModal = true
      }
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
