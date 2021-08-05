<template>
  <div class="loading">
    <loading
      :active.sync="value"
      :can-cancel="canCancel"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      :color="color"
      :background-color="bgColor"
      :width="width"
      :height="height"
    />
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    canCancel: {
      type: Boolean,
      default: false,
    },
    fullPage: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: '#ffffff',
    },
    width: {
      type: Number,
      default: 60,
    },
    height: {
      type: Number,
      default: 60,
    },
  },
  components: { Loading },
  data() {
    return {
      color: '#007bff',
    };
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
  },
};
</script>
