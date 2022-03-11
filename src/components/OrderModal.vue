<template>
  <div id="defaultModal" aria-hidden="true" v-show="showOrderModal" class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-white bg-opacity-60">
    <form class="relative w-2/3 rounded-lg shadow bg-gray-700" @submit.prevent="$emit('updateOrderPaid', temp)">
      <div class="flex justify-between items-start px-8 py-4 rounded-t border-b border-gray-600">
          <h3 class="text-lg font-semibold lg:text-2xl text-white">訂單內容</h3>
          <button type="button" @click="showOrderModal= false" class="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white" data-modal-toggle="defaultModal">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
      </div>
      <div class="p-6 flex items-start">
        <div class="flex flex-col w-1/3 p-4 bg-white bg-opacity-30 rounded "  v-if="temp.user">
          <h2 class="text-white font-bold text-xl text-left mb-4">用戶資料</h2>
          <div class="w-full flex mb-1">
            <p class="text-white font-bold mr-2 text-base w-16 text-left">姓名 : </p>
            <p class="text-white text-base">{{ temp.user.name }}</p>
          </div>
          <div class="w-full flex mb-1">
            <p class="text-white font-bold mr-2 text-base w-16 text-left">Email : </p>
            <p class="text-white">{{ temp.user.email }}</p>
          </div>
          <div class="w-full flex mb-1 ">
            <p class="text-white font-bold mr-2 text-base w-16 text-left">電話 : </p>
            <p class="text-white">{{ temp.user.tel }}</p>
          </div>
          <div class="w-full flex mb-1 ">
            <p class="text-white font-bold mr-2 text-base w-16 text-left">地址 : </p>
            <p class="text-white">{{ temp.user.address }}</p>
          </div>
        </div>
        <div class="w-2/3 ml-4 px-4 overflow-y-auto">
          <h2 class="text-white font-bold text-xl text-left mb-4">訂單細節</h2>
          <div class="w-full flex mb-1">
            <p class="text-white font-bold mr-2 text-base w-24 text-left">訂單編號 : </p>
            <p class="text-white text-base">{{ temp.id }}</p>
          </div>
          <div class="w-full flex mb-1">
            <p class="text-white font-bold mr-2 text-base w-24 text-left">下單時間 : </p>
            <p class="text-white">{{ $timeFormat.formatTime(temp.create_at) }}</p>
          </div>
          <div class="w-full flex mb-1 ">
            <p class="text-white font-bold mr-2 text-base w-24 text-left">付款時間 : </p>
            <p class="text-white" v-if="tempOrder.paid_date">{{ $timeFormat.formatTime(tempOrder.paid_date) }}</p>
            <p class="text-white" v-else>時間不正確</p>
          </div>
          <div class="w-full flex mb-1 ">
            <p class="text-white font-bold mr-2 text-base w-24 text-left">付款狀態 : </p>
            <p v-if="temp.is_paid"><span class="text-green-300">已付款</span></p>
            <p v-else><span class="text-white">未付款</span></p>
          </div>
          <div class="w-full flex mb-1 ">
            <p class="text-white font-bold mr-2 text-base w-24 text-left">總金額 : </p>
            <p class="text-white">NT$ {{ temp.total }}</p>
          </div>
          <div class="w-full flex items-center mt-2 mb-1">
            <label class="text-white font-bold mr-2 text-base w-24 text-left">是否付款</label>
            <div class="flex-row items-start">
              <label for="is_paid" class="flex items-center">
                <div class="relative">
                  <input type="checkbox" id="is_paid" class="sr-only" :true-value="true" :false-value="false" v-model="temp.is_paid"/>
                  <div class="block bg-white w-14 h-8 rounded-full border"></div>
                  <div class="dot absolute left-1 top-1 bg-gray-200 w-6 h-6 rounded-full transition"></div>
                </div>
              </label>
            </div>
          </div>
          <br><br>
          <h2 class="text-white font-bold text-xl text-left mb-4">選購商品</h2>
          <ul class=" list-disc">
              <li v-for="item in temp.products" :key="item.product.id" class="flex border-b py-1">
                  <p class="text-left text-white text-base w-2/4">{{ item.product.title }} </p>
                  <p class="text-right text-white text-base w-1/4">{{ item.qty }}{{ item.product.unit }}</p>
                  <p class="text-right text-white text-base w-1/4">共 {{ item.total }} 元</p>
              </li>
          </ul>
           <br><br>
        </div>
      </div>
      <div class="flex justify-end items-center p-6 space-x-2 rounded-b border-t border-gray-600">
          <button data-modal-toggle="defaultModal" type="button" @click="showOrderModal= false" class="font-bold bg-gray-500  text-white focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-base  px-8 py-2.5 focus:z-10  hover:bg-gray-600">取消</button>
          <button data-modal-toggle="defaultModal" type="submit"  class="font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-base px-8 py-2.5 text-center">修改付款狀態</button>
      </div>
    </form>
    <VLoading :active="isLoading"></VLoading>
  </div>
</template>
<script>
export default {
  data () {
    return {
      temp: {},
      showOrderModal: false,
      isLoading: false
    }
  },
  props: ['tempOrder', 'title'],
  watch: {
    tempOrder () {
      this.temp = this.tempOrder
    }
  }
}
</script>
