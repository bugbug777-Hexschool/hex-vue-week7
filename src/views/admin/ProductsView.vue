<template>
  <div class="container | p-3">
    <h1 class="mb-4">產品列表</h1>
    <div class="text-end | mb-4">
      <button class="btn btn-primary">建立新的產品</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.origin_price }}</td>
          <td>{{ product.price }}</td>
          <td>
            <span v-if="product.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm">編輯</button>
              <button type="button" class="btn btn-outline-danger btn-sm">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Modal -->
  <ProductModal />
</template>

<script>
import ProductModal from '@/components/ProductModal.vue';

export default {
  components: {
    ProductModal,
  },
  data() {
    return {
      products: [],
      pagination: {},
    };
  },
  methods: {
    get_products() {
      const api = `${process.env.VUE_APP_BASE}/v2/api/${process.env.VUE_APP_PATH}/admin/products`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      });
    },
  },
  mounted() {
    this.get_products();
  },
};
</script>
