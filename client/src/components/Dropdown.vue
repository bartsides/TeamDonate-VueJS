<template>
  <ValidationProvider
    :rules="rules"
    v-slot="{ errors, failed }"
    :mode="mode"
    :vid="name"
    slim
  >
    <div class="Dropdown" :class="{ 'has-error': failed }">
      <label :for="name" class="d-flex justify-content-center">
        {{ label }}
      </label>
      <v-select
        name="name"
        class="v-select"
        v-model="inputValue"
        :options="options"
        :label="display"
      />

      <p class="help-message text-danger" v-show="failed">
        {{ errors[0] }}
      </p>
    </div>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate';

export default {
  props: {
    value: {
      type: [Object, String],
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
    },
    display: {
      type: String,
      default: 'name',
    },
    rules: {
      type: String,
    },
    mode: {
      type: String,
      default: 'eager',
    },
  },
  components: { ValidationProvider },
  data() {
    return {
      inputValue: null,
    };
  },
  watch: {
    value(val) {
      if (val !== undefined) {
        this.inputValue = val;
      }
    },
    inputValue(val) {
      this.$emit('input', val);
    },
  },
};
</script>
<style lang="sass">
@import @/assets/styles/variables
.vs__dropdown-toggle
  border-radius: $radius
  border: 1px solid $dark
  padding: $input-padding
  outline: none
  background-color: #f2f5f7
  width: 100%
  transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out

.Dropdown.has-error .vs__dropdown-toggle
  background-color: $primary
  border-color: $secondary
  color: $dark
</style>
<style lang="sass" scoped>
@import @/assets/styles/variables
.Dropdown
  position: relative
  margin-bottom: $input-margin-bottom
  width: 100%

label
  display: block
  margin-bottom: 4px
  width: 100%

.help-message
  position: absolute
  font-size: 14px

.Dropdown.has-error .help-message
  color: $danger
</style>
