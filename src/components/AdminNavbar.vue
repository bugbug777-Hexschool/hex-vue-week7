<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">Wagashi</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav | w-100">
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link active" aria-current="page"
              >產品</router-link
            >
          </li>
          <li class="nav-item | me-auto">
            <router-link to="/admin/orders" class="nav-link">訂單</router-link>
          </li>
          <li class="nav-item">
            <a @click.prevent="logout" href="#" class="nav-link">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_BASE}/v2/logout`;
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          this.$router.replace('/login');
        }
      });
    },
  },
};
</script>
