<template>
  <div class="slider d-flex flex-row">
    <div
      class="slider-option d-flex w-100"
      :class="{ 'slider-option-selected': value === option }"
      v-for="option in options"
      :key="option"
      @click="click(option)"
    >
      <div class="m-auto h3 slider-option-text">
        {{ option }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    click(option) {
      this.$emit('input', option);
    },
  },
};
</script>
<style lang="sass" scoped>
@import @/assets/styles/variables
.slider
    margin-bottom: $input-margin-bottom
.slider-option
    cursor: pointer
    border: 1px solid $dark
    background: $light
    min-height: 60px
    transition: background 1s
.slider-option:first-child
    border-top-left-radius: $radius
    border-bottom-left-radius: $radius
.slider-option:last-child
    border-top-right-radius: $radius
    border-bottom-right-radius: $radius
.slider-option-selected
    background: $primary
.slider-option-selected > .slider-option-text
    font-weight: 600
</style>
