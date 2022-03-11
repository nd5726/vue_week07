<template>
  <div class="bg-gray-100 pt-16 pb-16">
    <div class="container mx-auto mb-8">
        <button v-if="cartList.carts" @click="removeCartAll" class="border border-red-700 text-red-700 rounded px-4 py-2 mb-6 float-right hover:bg-red-700 hover:text-white" type="button">清空購物車</button>
        <table class="w-full">
            <thead>
                <tr class="border-t border-b">
                    <th class="w-1/12 text-center py-3"></th>
                    <th class="w-7/12 text-center py-3">品名</th>
                    <th class="w-2/12 text-center py-3">數量</th>
                    <th class="w-1/12 text-center py-3">單位</th>
                    <th class="w-1/12 text-center py-3">單價</th>
                </tr>
            </thead>
            <tbody v-if="cartList.carts">
                <tr class="border-b" v-for="item in cartList.carts" :key="item.id">
                    <td class="w-1/12 text-center py-3">
                        <button @click="removeCartItem(item.id)" type="button"  :disabled="isLoadingitem === item.id" class="w-8 h-8 rounded-full border border-red-700 text-red-700 hover:bg-red-700 hover:text-white disabled:opacity-50">×</button></td>
                    <td class="w-7/12 text-center py-3 flex items-center ">
                        <div class="w-28 h-28 ml-2 mr-8 bg-cover rounded" :style="{ backgroundImage:`url( ${item.product.imageUrl} )` }"></div>
                        <p>{{ item.product.title }}</p></td>
                    <td class="w-2/12 text-center py-3">
                        <input type="number" @change="updateCart(item)" class="w-20 p-2 border rounded" mim="1" v-model.number="item.qty">
                    </td>
                    <td class="w-1/12 text-center py-3">{{ item.product.unit }}</td>
                    <td class="w-1/12 text-center py-3">{{ item.product.price }}</td>
                </tr>
                <tr>
                    <td class="w-10/12 " colspan="3"></td>
                    <td class="w-1/12 text-center" colspan="1">總計</td>
                    <td class="w-1/12  text-center py-8"> {{ cartList.total }} 元</td>
                </tr>
            </tbody>
        </table>
        <v-form v-slot="{ errors }" ref="cartForm" @submit="onSubmit" class="w-3/5 max-w-screen-xl mx-auto text-left" >

          <label for="name" class=" w-full text-base ">收件人姓名</label>
          <div  class="flex flex-col mb-4">
              <v-field v-model="form.user.name" id="name" name="name" type="text" class="w-full p-2 border rounded " :class="[ errors['name'] ? 'border-red-700':'border-gray-300']" placeholder="請輸入收件人姓名" rules="required"></v-field>
              <error-message name="name" class="text-red-700 pl-2"></error-message>
          </div>

          <label for="tel" class=" w-full text-base">收件人電話</label>
          <div  class="flex flex-col mb-4">
              <v-field v-model="form.user.tel" id="tel" name="tel" type="tel" class="w-full p-2 border rounded " :class="[ errors['tel'] ? 'border-red-700':'border-gray-300']" placeholder="請輸入收件人電話" rules="min:8|required"></v-field>
              <error-message name="tel" class="text-red-700 pl-2"></error-message>
          </div>

          <label for="address" class=" w-full text-base">收件地址</label>
          <div  class="flex flex-col mb-4">
              <v-field  v-model="form.user.address" id="address" name="address" type="address" class="w-full p-2 border rounded " :class="[ errors['address'] ? 'border-red-700':'border-gray-300']" placeholder="請輸入地址" rules="required"></v-field>
              <error-message name="address" class="text-red-700 pl-2"></error-message>
          </div>

          <label for="email" class=" w-full text-base">Email</label>
          <div  class="flex flex-col mb-4">
              <v-field  v-model="form.user.email" id="email" name="email" type="email" class="w-full p-2 border rounded " :class="[ errors['email'] ? 'border-red-700':'border-gray-300']" placeholder="請輸入 Email" rules="email|required"></v-field>
              <error-message name="email" class="text-red-700 pl-2"></error-message>
          </div>

          <label for="others" class=" w-full text-base">其他備註</label>
          <textarea v-model="form.message" name="others" id="others" class="w-full  p-2 border border-gray-300 rounded" cols="30" rows="10"></textarea>

          <button type="submit" class="float-right mt-2 mb-16 bg-blue-500  text-white focus:ring-4 focus:ring-gray-300 rounded border border-gray-200 text-base font-bold px-8 py-2  hover:bg-blue-600 disabled:opacity-50">送出訂單</button>
        </v-form>
    </div>
  </div>
  <VLoading :active="isLoading"></VLoading>
</template>

<script>

export default {
  data () {
    return {
      cartList: [],
      isLoadingitem: '',
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCart () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then(res => {
          this.cartList = res.data.data
          console.log(this.cartList)
        })
    },
    updateCart (item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, { data })
        .then(res => {
          alert(res.data.message)
          this.getCart()
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    removeCartItem (id) {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then(res => {
          alert(res.data.message)
          this.getCart()
          this.isLoading = false
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    removeCartAll () {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then(res => {
          alert(res.data.message)
          this.getCart()
          this.isLoading = false
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    onSubmit () {
      this.isLoading = true
      const data = this.form
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, { data })
        .then(res => {
          alert(res.data.message)
          this.$refs.cartForm.resetForm()
          this.getCart()
          this.isLoading = false
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
