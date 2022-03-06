<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>新增產品</span>
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
            <!-- 新增產品圖片 -->
            <div class="col-sm-4">
              <h2>主要圖片</h2>
              <div class="mb-2">
                <div class="mb-3">
                  <input
                    v-model="product.imageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入主要圖片連結"
                  />
                </div>
                <img
                  v-if="product.imageUrl"
                  class="img-fluid img-control"
                  :src="product.imageUrl"
                  alt="圖片無法顯示"
                  style="height: 200px"
                />
              </div>
              <h2>新增多圖</h2>
              <div v-if="Array.isArray(product.imagesUrl)">
                <div v-for="(imageUrl, index) in product.imagesUrl" :key="index + 123">
                  <div class="mb-3">
                    <input
                      v-model="product.imagesUrl[index]"
                      type="text"
                      class="form-control"
                      :placeholder="`請輸入圖片 ${index+1} 連結`"
                    />
                  </div>
                  <img
                    v-if="imageUrl"
                    class="img-fluid img-control"
                    :src="imageUrl"
                    alt="圖片無法顯示"
                    style="height: 200px"
                  />
                </div>
                <div
                  v-if="
                    !product.imagesUrl.length || product.imagesUrl[product.imagesUrl.length - 1]
                  "
                >
                  <!-- 如果 imagesUrl 是陣列，但想要新增新的圖片 -->
                  <button @click="add_image" class="btn btn-outline-primary btn-sm d-block w-100">
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <!-- 當最後一個圖片網址為空時，才能刪除 -->
                  <button @click="del_image" class="btn btn-outline-danger btn-sm d-block w-100">
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <!-- 如果 imagesUrl 不是陣列 -->
                <button @click="add_image" class="btn btn-outline-primary btn-sm d-block w-100">
                  新增圖片
                </button>
              </div>
            </div>
            <!-- 新增產品資料 -->
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  v-model="product.title"
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    v-model="product.category"
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    v-model="product.unit"
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    v-model.number="product.origin_price"
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    v-model.number="product.price"
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  v-model="product.description"
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  v-model="product.content"
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    v-model="product.is_enabled"
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button @click="add_product" type="button" class="btn btn-primary">確認</button>
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
      product: {},
    };
  },
  methods: {
    open_modal() {
      this.product = {}; // when add a new product, clean the data
      this.modal.show();
    },
    add_product() {
      const api = `${process.env.VUE_APP_BASE}/v2/api/${process.env.VUE_APP_PATH}/admin/product`;
      const data = this.product;
      this.$http
        .post(api, { data })
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
    add_image() {
      if (!this.product.imagesUrl) {
        this.product.imagesUrl = [];
        this.product.imagesUrl.push('');
      } else {
        this.product.imagesUrl.push('');
      }
    },
    del_image() {
      this.product.imagesUrl.pop();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.productModal);
  },
};
</script>

<style scoped>
.img-control {
  width: 100%;
  object-position: center;
  object-fit: cover;
}
</style>
