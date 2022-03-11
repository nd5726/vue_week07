<template>
    <nav class="flex justify-center pt-4 pb-20">
        <ul class="pagination flex font-bold items-center">
            <li class="bg-gray-200 text-white">
                <a class="flex px-4 py-2 mr-1" :class="[ pages.has_pre ? 'text-black hover:text-white hover:bg-gray-700' : 'text-gray-300']" href="#" @click.prevent="updatePages(page)">＜</a>
            </li>
            <li class="bg-gray-200 text-black" v-for="page in pages.total_pages" :key="page+'page'">
                <a  class=" flex px-4 py-2 hover:bg-gray-700 hover:text-white" :class="{'text-white bg-gray-700' : pages.current_page == page }"  href="#" @click.prevent="updatePages(page)" >{{ page }}</a>
            </li>
            <li class="bg-gray-200 text-white">
                <a class="flex px-4 py-2" :class="[ pages.has_next ? 'text-black hover:text-white hover:bg-gray-700' : 'text-gray-300']" href="#" @click.prevent="updatePages(page)" >＞</a>
            </li>
        </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePages (page) {
      this.$emit('update-pages', page)
    }
  }
}
</script>
