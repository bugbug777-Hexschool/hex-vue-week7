<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from '@/components/AdminNavbar.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    Navbar,
  },
  methods: {
    check_login_status() {
      const api = `${process.env.VUE_APP_BASE}/v2/api/user/check`;
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = token;
      this.$http.post(api).catch((err) => {
        if (!err.response.data.success) {
          Swal.fire({
            text: '驗證失敗，請確認 api 路徑是否為本人使用',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        this.$router.replace('/login');
      });
    },
  },
  mounted() {
    this.check_login_status();
  },
};
</script>
