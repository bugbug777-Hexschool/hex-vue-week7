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
            <span>訂單編號：{{ order.id }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- 訂單資訊 -->
            <div class="col-7">
              <h2 class="mb-3">訂單資訊</h2>
              <table class="table">
                <tbody>
                  <template v-if="order.create_at">
                    <tr>
                      <th>訂單編號：</th>
                      <td>{{ order.id }}</td>
                    </tr>
                    <tr>
                      <th>建立日期：</th>
                      <td>{{ new Date(order.create_at).toISOString().split('T')[0] }}</td>
                    </tr>
                    <tr>
                      <th>付款方式</th>
                      <td>{{ order.payment_method || '尚未選擇付款方式' }}</td>
                    </tr>
                    <tr>
                      <th>訂單金額：</th>
                      <td>{{ order.total }}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <h2 class="mb-3">購買品項</h2>
              <table class="table">
                <tbody>
                  <template v-if="order.create_at">
                    <tr v-for="(item, key) in order.products" :key="key">
                      <td>
                        {{ `${item.product.title} * ${item.qty} ${item.product.unit}` }}
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <!-- 聯絡資訊 -->
            <div class="col-5">
              <h2 class="mb-3">顧客資訊</h2>
              <div class="row | mb-3">
                <label for="name" class="col-sm-2 col-form-label | text-nowrap | me-2"
                  >顧客姓名：</label
                >
                <div class="col-sm-9">
                  <input
                    v-model="user.name"
                    type="text"
                    id="name"
                    class="form-control-plaintext"
                    style="padding: 6px 12px"
                    readonly
                  />
                </div>
              </div>
              <div class="row | mb-3">
                <label for="tel" class="col-sm-2 col-form-label | text-nowrap | me-2"
                  >顧客電話：</label
                >
                <div class="col-sm-9">
                  <input v-model="user.tel" type="tel" id="tel" class="form-control" />
                </div>
              </div>
              <div class="row | mb-3">
                <label for="email" class="col-sm-2 col-form-label | text-nowrap | me-2"
                  >顧客信箱：</label
                >
                <div class="col-sm-9">
                  <input v-model="user.email" type="email" id="email" class="form-control" />
                </div>
              </div>
              <div class="row | mb-3">
                <label for="address" class="col-sm-2 col-form-label | text-nowrap | me-2"
                  >顧客地址：</label
                >
                <div class="col-sm-9">
                  <input v-model="user.address" type="text" id="address" class="form-control" />
                </div>
              </div>
              <div class="row | mb-3">
                <label for="message" class="col-sm-2 col-form-label | text-nowrap | me-2"
                  >顧客留言：</label
                >
                <div class="col-sm-9">
                  <textarea
                    v-model="order.message"
                    type="text"
                    id="message"
                    class="form-control"
                  ></textarea>
                </div>
              </div>
              <div class="row | mb-3">
                <label class="col-sm-2 col-form-label | text-nowrap | me-2" for="isPaid"
                  >付款狀態：</label
                >
                <div class="col-sm-9 d-flex align-items-center">
                  <input
                    v-model="order.is_paid"
                    class="form-check-input | mt-0"
                    type="checkbox"
                    value=""
                    id="isPaid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button v-if="hasEdited" @click="edit_order" type="button" class="btn btn-primary">
            儲存
          </button>
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
  watch: {
    order: {
      handler(now, old) {
        if (Object.keys(old).length !== 0) {
          this.hasEdited = true;
        }
      },
      deep: true,
    },
  },
  methods: {
    open_modal(order) {
      this.order = { ...order };
      this.user = { ...order.user };
      this.modal.show();
    },
    edit_order() {
      const api = `${process.env.VUE_APP_BASE}/v2/api/${process.env.VUE_APP_PATH}/admin/order/${this.order.id}`;
      const data = this.order;
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
    to_iso_string(timestamp) {
      console.log(typeof timestamp);
      const d = new Date(timestamp * 1000);
      const str = d.toISOString().split('T').join(' ');
      return str;
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.orderModal);
  },
};
</script>
