<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from '@/components/AdminNavbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>
