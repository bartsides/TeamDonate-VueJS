<template>
  <div class="organization-card">
    <div
      class="
        organization-card-border
        bg-primary
        w-100
        h-100
        d-flex
        justify-content-center
        align-items-center
      "
      v-if="value"
    >
      <h3 class="m-0">{{ value.name }}</h3>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="sass" scoped>
@import @/assets/styles/variables
.organization-card
  min-height: 100px
  cursor: pointer
  padding-bottom: 15px
.organization-card-border
  border: 2px solid $secondary
  border-radius: 10px
.date
  border-left: 2px solid $secondary
  width: 140px
.month
  font-weight: bold
</style>
