<template>
  <div
    id="delOrderModal"
    ref="delOrderModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delOrderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delOrderModalLabel" class="modal-title">
            <span>刪除訂單：{{ order.id }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除編號為
          <strong class="text-danger">{{ order.id }}</strong> 的此筆訂單(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button @click="delete_order" type="button" class="btn btn-danger">確認刪除</button>
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
    };
  },
  methods: {
    open_modal(order) {
      this.order = order;
      this.modal.show();
    },
    delete_order() {
      const api = `${process.env.VUE_APP_BASE}/v2/api/${process.env.VUE_APP_PATH}/admin/order/${this.order.id}`;
      this.$http
        .delete(api)
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
    this.modal = new Modal(this.$refs.delOrderModal);
  },
};
</script>
