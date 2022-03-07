<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !pagination.has_pre }">
        <a @click.prevent="get_prev_page" class="page-link" aria-label="Previous" href="#"
          ><i class="bi bi-arrow-left"></i
        ></a>
      </li>
      <li
        v-for="pageNum in pagination.total_pages"
        :key="pageNum + 123"
        class="page-item"
        :class="{ active: pageNum === pagination.current_page }"
      >
        <a @click.prevent="get_page(pageNum)" class="page-link" href="#">{{ pageNum }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pagination.has_next }">
        <a @click.prevent="get_next_page" class="page-link" aria-label="Next" href="#"
          ><i class="bi bi-arrow-right"></i
        ></a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pagination'],
  methods: {
    get_prev_page() {
      this.$emit('update', this.pagination.current_page - 1);
    },
    get_page(pageNum) {
      this.$emit('update', pageNum);
    },
    get_next_page() {
      this.$emit('update', this.pagination.current_page + 1);
    },
  },
};
</script>
