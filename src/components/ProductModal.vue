<template>
  <div id="defaultModal" aria-hidden="true" v-show="showFormModal" class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-white bg-opacity-60">
    <form class="relative w-2/3 rounded-lg shadow bg-gray-700" @submit.prevent="$emit('updateProduct', temp)">
      <div class="flex justify-between items-start px-8 py-4 rounded-t border-b border-gray-600">
          <h3 class="text-lg font-semibold lg:text-2xl text-white">{{ title }}</h3>
          <button type="button" @click="showFormModal= false" class="text-gray-400 bg-transparentrounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white" data-modal-toggle="defaultModal">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
      </div>
      <div class="p-6 flex">
        <div class="flex flex-wrap w-2/3">
          <div class="w-full flex items-start flex-col mb-2 px-2">
            <label for="title" class="text-white">標題</label>
            <input ype="text" class="rounded px-2 py-2 w-full" id="title"  v-model="temp.title" required/>
          </div>
          <div class="w-1/2 flex items-start flex-col mb-3 px-2">
            <label for="category" class="text-white">分類</label>
            <input type="text" class="rounded px-2 py-2 w-full" id="category" v-model="temp.category" required/>
          </div>
          <div class="w-1/2 flex items-start flex-col mb-3 px-2">
            <label for="unit" class="text-white">單位</label>
            <input type="text" class="rounded px-2 py-2 w-full" id="unit" v-model="temp.unit" required/>
          </div>
          <div class="w-1/2 flex items-start flex-col mb-3 px-2">
            <label for="origin_price" class="text-white">原價</label>
            <input type="number" class="rounded px-2 py-2 w-full" id="origin_price" v-model="temp.origin_price" required/>
          </div>
          <div class="w-1/2 flex items-start flex-col mb-6 px-2">
            <label for="price" class="text-white">售價</label>
            <input type="number" class="rounded px-2 py-2 w-full" id="price" v-model="temp.price" required/>
          </div>
          <div class="w-full flex items-start flex-col mb-3 px-2">
            <label for="description" class="text-white">產品描述</label>
            <textarea class="rounded px-2 py-2 w-full" id="description" v-model="temp.description"></textarea>
          </div>
          <div class="w-full flex items-start flex-col mb-3 px-2">
            <label for="content" class="text-white">說明內容</label>
            <textarea class="rounded px-2 py-2 w-full" id="content" v-model="temp.content"></textarea>
          </div>
          <div class="w-full flex items-center mb-3 px-2">
            <label class="text-white mr-4">是否啟用</label>
            <div class="flex-row items-start">
              <label for="is_enabled" class="flex items-center">
                <div class="relative">
                  <input type="checkbox" id="is_enabled" class="sr-only" :true-value="1" :false-value="0" v-model="temp.is_enabled"/>
                  <div class="block bg-white w-14 h-8 rounded-full border"></div>
                  <div class="dot absolute left-1 top-1 bg-gray-200 w-6 h-6 rounded-full transition"></div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div
          class="w-1/3 ml-4 p-2 bg-white bg-opacity-30 rounded imglist overflow-y-auto"
        >
          <div class="w-full flex flex-col mb-3 px-2">
            <label for="imageUrl" class="text-white">主要圖片</label>

            <div v-if="tempProduct.imageUrl">
              <img
                class="mt-2"
                :src="tempProduct.imageUrl"
                :alt="tempProduct.title"
              />
            </div>
            <form
              class="mt-2"
              action="/api/thisismycourse2/admin/upload"
              enctype="multipart/form-data"
              method="post"
            >
              <input
                id="file"
                type="file"
                name="file-to-upload"
                @change="imgupload"
              />
            </form>
          </div>
          <div class="px-2">
            <p class="text-xl font-bold text-white  pt-4 pb-2">新增其他圖片</p>
            <div  v-if="Array.isArray(temp.imagesUrl)">
                <div class="w-full flex flex-col mb-3" v-for="(image , key) in temp.imagesUrl"   :key="key">
                    <label :for="key"  class="text-white">圖片網址</label>
                    <input type="text" class="rounded px-2 py-2" :id="key" v-model="temp.imagesUrl[key]">
                </div>
                <button type="button" v-if="!temp.imagesUrl.length || temp.imagesUrl[tempProduct.imagesUrl.length - 1]"  @click="temp.imagesUrl.push('')" class="bg-gray-500 text-white w-full py-2 rounded border-2 transition-colors ease-linear hover:bg-gray-700 ">新增圖片</button>
                <button type="button" v-else @click="temp.imagesUrl.pop()" class="bg-red-700 text-white w-full py-2 rounded border-2 border-red-700 transition-colors ease-linear hover:bg-red-900">刪除最後一筆</button>
            </div>
            <div v-else>
                <button type="button"   @click="$emit('addImage')" class="bg-gray-500 text-white w-full py-2 rounded border-2 transition-colors ease-linear hover:bg-gray-700 ">新增圖片</button>
            </div>
        </div>
        </div>
      </div>
      <div class="flex justify-end items-center p-6 space-x-2 rounded-b border-t border-gray-600">
          <button data-modal-toggle="defaultModal" type="button" @click="showFormModal= false" class="font-bold bg-gray-500  text-white focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-base  px-8 py-2.5 focus:z-10  hover:bg-gray-600">取消</button>
          <button data-modal-toggle="defaultModal" type="submit"  class="font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-base px-8 py-2.5 text-center">送出</button>
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
      showFormModal: false,
      isLoading: false
    }
  },
  props: ['tempProduct', 'title'],
  watch: {
    tempProduct () {
      this.temp = this.tempProduct
    }
  },
  methods: {
    imgupload () {
      this.isLoading = true
      const fileInput = document.querySelector('#file')
      const file = fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)

      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`, formData)
        .then(res => {
          console.log('success')
          this.temp.imageUrl = res.data.imageUrl
          this.isLoading = false
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>
