<template>
  <div class="event-card w-100 bg-primary container">
    <div class="row h-100" v-if="value">
      <div class="col py-4">
        <div class="row">
          <h3 class="col">Event: {{ value.name }}</h3>
        </div>
        <div class="row">
          <h4 class="col">Location: {{ value.location }}</h4>
        </div>
        <div class="row">
          <h5 class="col">{{ value.description }}</h5>
        </div>
      </div>
    </div>
    <div class="date">
      <h1
        class="d-flex align-items-center justify-content-center h-100 ml-auto"
      >
        <div class="day">{{ day }}</div>
        <div class="month ml-1">{{ month }}</div>
      </h1>
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
  computed: {
    day() {
      if (!this.value || !this.value.date) return null;
      return this.$date(this.value.date).date();
    },
    month() {
      if (!this.value || !this.value.date) return null;
      return this.$date(this.value.date).format('MMM').toUpperCase();
    },
  },
};
</script>
<style lang="sass" scoped>
@import @/assets/styles/variables
.event-card
  border: 2px solid $warning
  border-radius: 10px
  min-height: 200px
  cursor: pointer
  box-shadow: 1px 1px 4px
.date
  border-bottom: 4px solid $secondary
  border-left: 3px solid $secondary
  border-top: 1px solid $info
  border-right: 1px solid $info
  border-radius: 10px
  position: absolute
  top: 10px
  right: 10px
  width: 140px !important
  height: 80px !important
  background: $light
  box-shadow: 1px 3px 3px
.month
  font-weight: bold
</style>
