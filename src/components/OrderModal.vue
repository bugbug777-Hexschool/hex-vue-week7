<template>
  <div
    id="orderModal"
    ref="orderModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="orderModalLabel" class="modal-title">
            <span>訂單編號</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row row-cols-1 row-cols-md-2">
            <!-- 聯絡資訊 -->
            <div class="col">
              <h2 class="mb-3">聯絡資訊</h2>
              <div class="mb-3">
                <label for="name" class="form-label">姓名</label>
                <input v-model="user.name" type="text" id="name" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="tel" class="form-label">電話</label>
                <input v-model="user.tel" type="tel" id="tel" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">信箱</label>
                <input v-model="user.email" type="email" id="email" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">地址</label>
                <input v-model="user.address" type="text" id="address" class="form-control" />
              </div>
            </div>
            <!-- 訂單資訊 -->
            <div class="col">
              <h2 class="mb-3">訂單資訊</h2>
              <div v-for="(item, key) in order.products" :key="key" class="mb-3">
                <label :for="key" class="form-label">{{ item.product.title }}</label>
                <input v-model.number="item.qty" type="number" :id="key" class="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button v-if="hasEdited" type="button" class="btn btn-primary">儲存</button>
          <button v-else type="button" class="btn btn-primary" data-bs-dismiss="modal">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      modal: '',
      order: {},
      user: {},
      hasEdited: false,
    };
  },
  methods: {
    open_modal(order) {
      this.order = { ...order };
      this.user = { ...order.user };
      this.modal.show();
    },
    edit_product() {
      const api = `${process.env.VUE_APP_BASE}/v2/api/${process.env.VUE_APP_PATH}/admin/product/${this.product.id}`;
      const data = this.product;
      this.$http
        .put(api, { data })
        .then((res) => {
          if (res.data.success) {
            this.$emit('update');
            this.modal.hide();
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.orderModal);
  },
};
</script>
