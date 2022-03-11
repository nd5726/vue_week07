<template>
    <div aria-hidden="true" v-show="showDeleteModal" class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-white bg-opacity-60 ">
    <div class="relative  w-1/3 bg-white rounded-lg shadow-xl">
        <div class="flex justify-between items-start px-8 py-4 rounded-t  bg-red-700 border-b border-gray-600">
            <h3 class="text-lg font-semibold lg:text-2xl text-white">確認刪除</h3>
            <button type="button" @click="showDeleteModal= false" class="text-gray-200 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="defaultModal">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
        <div class="p-6 flex">
            <p class="text-gray-700 font-bold">是否刪除 {{item.title }} ? (刪除後無法回覆)</p>
        </div>
        <div class="flex justify-end items-center px-8 py-4 space-x-2 rounded-b border-t border-gray-600">
            <button data-modal-toggle="defaultModal" type="button" @click="showDeleteModal= false" class=" bg-gray-500  text-white focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-base font-bold px-8 py-2.5 focus:z-10  hover:bg-gray-600">取消</button>
            <button data-modal-toggle="defaultModal" type="button" @click="deleteItem" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-base px-8 py-2.5 text-center">確認刪除</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      temp: {},
      showDeleteModal: false
    }
  },
  props: ['item'],
  methods: {
    deleteItem () {
      this.$emit('delete-item')
    }
  }
}
</script>
