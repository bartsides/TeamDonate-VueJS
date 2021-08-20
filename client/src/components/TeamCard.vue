<template>
    <div class="team-card">
        <div
            class="
                team-card-border
                bg-primary
                w-100
                h-100
                d-flex
                justify-content-center
                align-items-center
            "
            v-if="value"
        >
            {{ value.name }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Object,
            required: true,
        }
    }
}
</script>
<style lang="sass" scoped>
@import @/assets/styles/variables
.team-card
  min-height: 100px
  cursor: pointer
  padding-bottom: 15px
.team-card-border
  border: 2px solid $secondary
  border-radius: 10px
</style>
