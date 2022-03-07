<template>
  <div class="container | p-3">
    <h1 class="mb-4">Orders</h1>
    <table class="table | mb-4">
      <thead>
        <tr>
          <th width="120">建立日期</th>
          <th width="120">訂單編號</th>
          <th width="100">付款方式</th>
          <th width="120">訂單狀態</th>
          <th width="120">訂單操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.create_at }}</td>
          <td>{{ order.id }}</td>
          <td>{{ order.payment_method }}</td>
          <td>
            <span v-if="order.is_paid" class="text-success">已付款</span>
            <span v-else>尚未付款</span>
          </td>
          <td>
            <div class="btn-group">
              <button @click="open_modal(order)" type="button" class="btn btn-sm btn-primary">
                查看
              </button>
              <button type="button" class="btn btn-sm btn-outline-danger">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Modal -->
  <OrderModal ref="orderModal" />
</template>

<script>
import OrderModal from '@/components/OrderModal.vue';

export default {
  components: {
    OrderModal,
  },
  data() {
    return {
      orders: [],
      pagination: {},
    };
  },
  methods: {
    get_orders(currentPage = 1) {
      const api = `${process.env.VUE_APP_BASE}/v2/api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
        }
      });
    },
    open_modal(order) {
      this.$refs.orderModal.open_modal(order);
    },
  },
  mounted() {
    this.get_orders();
  },
};
</script>
