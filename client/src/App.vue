<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/layout/Header';

export default {
  components: { Header },
};
</script>
