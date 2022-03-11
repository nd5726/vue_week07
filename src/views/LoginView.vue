<template>
    <div class="flex  w-full justify-center mt-24 ">
        <v-form v-slot="{ errors }" class="w-1/2 max-w-xl bg-white flex flex-col px-8 py-12 shadow-lg" @submit="loginForm">
            <h1 class="text-2xl font-bold mb-8 text-slate-500">後台管理介面</h1>
            <div class="mb-8 flex flex-col items-start">
              <v-field  rules="email|required" name="account" type="text" :class="{ 'border border-red-700' : errors['account']}" class="bg-gray-200 py-4 px-4 outline-0 w-full   placeholder:text-gray-400 placeholder:font-light  placeholder:text-base tracking-wider" v-model="user.username" placeholder="帳號"></v-field>
              <error-message name="account" class="text-red-700 pl-2"></error-message>
            </div>
            <div class="mb-8 flex flex-col items-start">
              <v-field  rules="required" type="password" name="password" :class="{ 'border border-red-700' : errors['password']}" class="bg-gray-200 py-4 px-4 outline-0 w-full placeholder:text-gray-400 placeholder:font-light  placeholder:text-base tracking-wider" v-model="user.password" placeholder="密碼"></v-field>
              <error-message name="password" class="text-red-700 pl-2"></error-message>
            </div>
            <button type="submit" class="w-full bg-slate-500 text-white py-4 tracking-wider">LOGIN</button>
        </v-form>
    </div>
    <VLoading :active="isLoading"></VLoading>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    loginForm () {
      this.isLoading = true
      this.$http.post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then(res => {
          alert(res.data.message)
          const { expired, token } = res.data
          document.cookie = `hextoken=${token}; expires= ${new Date(expired)}; `
          this.isLoading = false
          this.$router.push('/admin/product')
        })
        .catch(err => {
          this.isLoading = false
          alert(err.response.data.message)
          this.user.username = ''
          this.user.password = ''
        })
    }
  }
}
</script>
