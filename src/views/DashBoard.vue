<template>
  <div class=" fixed w-full top-0 bg-gray-600 mb-6 z-20">
    <nav class="flex px-4  py-4 justify-start mx-auto items-center backend container">
      <div class="text-xl mx-2"><router-link to="/">回到前台</router-link></div>
      <div class="text-xl mx-2"><router-link to="/admin/product">後台產品列表</router-link></div>
      <div class="text-xl mx-2"><router-link to="/admin/orders">訂單列表</router-link></div>
      <a href="#" class="text-xl mx-2" @click.prevent="logout">登出</a>
    </nav>
  </div>
  <div class="relative mt-20">
    <router-view v-if="checkSuccess" />
  </div>
</template>

<script>
export default {
  name: 'DashBoard',
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkLogin () {
      this.$http.post(`${process.env.VUE_APP_API}/api/user/check`)
        .then(() => {
          this.checkSuccess = true
        })
        .catch(err => {
          if (err) {
            alert('您尚未登入')
            this.$router.push('/login')
          }
        })
    },
    logout () {
      this.$http.post(`${process.env.VUE_APP_API}/logout`)
        .then(res => {
          document.cookie = 'hextoken=;expires=;'
          alert(res.data.message)
          this.$router.push('/login')
        })
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1') // Eslint等號前面的斜線刪除
    this.$http.defaults.headers.common.Authorization = token // 使用.Authorization取代['Authorization'],axios改成this.$http
    if (token) {
      this.checkLogin()
    } else {
      alert('您尚未登入')
      this.$router.push('/login')
    }
  }
}
</script>
