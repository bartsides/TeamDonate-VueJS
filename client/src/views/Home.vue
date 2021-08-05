<template>
  <div class="home">
    {{ profile }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['profile']),
  },
};
</script>
