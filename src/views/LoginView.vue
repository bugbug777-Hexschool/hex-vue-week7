<template>
  <!-- 在使用 vee-validate 驗證的同時，記錄一下到底要不要使用 form 進行包裹，如果要使用如何包裹 -->
  <div style="height: 100vh">
    <div class="container | h-100">
      <div class="row justify-content-center align-items-center | h-100">
        <div class="col-3">
          <h1 class="text-center | mb-3">管理員登入</h1>
          <v-form @submit="login">
            <div class="form-floating | mb-3">
              <v-field
                v-model="user.username"
                type="email"
                id="email"
                name="email"
                rules="email|required"
                placeholder="請輸入帳號"
                class="form-control"
              />
              <label for="email">帳號</label>
              <error-message name="email"></error-message>
            </div>
            <div class="form-floating | mb-3">
              <v-field
                v-model="user.password"
                type="password"
                id="password"
                name="password"
                rules="required"
                placeholder="請輸入帳號"
                class="form-control"
              />
              <label for="password">密碼</label>
              <error-message name="password"></error-message>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-primary w-100">登入</button>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const api = `${process.env.VUE_APP_BASE}/v2/admin/signin`;
      this.$http
        .post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token}; expires=${new Date(
              expired,
            )}; SameSite=None; Secure`;
            this.$router.replace('/admin/products');
          }
        })
        .catch((err) => {
          if (!err.response.data.success) {
            Swal.fire({
              text: '請檢查帳號或密碼有無錯誤！！',
              icon: 'error',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        });
    },
  },
};
</script>
