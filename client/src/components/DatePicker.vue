<template>
  <ValidationProvider
    :rules="rules"
    v-slot="{ errors, failed }"
    :mode="mode"
    :vid="name"
    slim
  >
    <div class="DatePicker" :class="{ 'has-error': failed }">
      <label :for="name" class="d-flex justify-content-center">
        {{ label }}
      </label>
      <VuejsDatepicker
        :name="name"
        v-model="inputValue"
        :disabled-dates="disabledDates"
      />

      <p class="help-message text-danger" v-if="failed">
        {{ errors[0] }}
      </p>
    </div>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate';
import VuejsDatepicker from 'vuejs-datepicker';
export default {
  props: {
    value: {
      type: [Date, String],
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    successMessage: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    mask: {
      type: [String, Array],
      default: '',
    },
    minDate: {
      type: Date,
    },
    rules: {
      type: [String, Object],
    },
    mode: {
      type: String,
      default: 'eager',
    },
  },
  components: { ValidationProvider, VuejsDatepicker },
  data() {
    return { inputValue: null };
  },
  computed: {
    disabledDates() {
      return this.minDate ? { ranges: [{ from: this.minDate }] } : {};
    },
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
/* datepicker input styling */
.vdp-datepicker input
  width: 100% !important
  outline: none
  background-color: #f2f5f7
  border: none

.DatePicker.has-error input
  background-color: $primary
  border-color: $secondary
  color: $dark
</style>
<style lang="sass" scoped>
@import @/assets/styles/variables
.DatePicker
  position: relative
  margin-bottom: $input-margin-bottom
  width: 100%

label
  display: block
  margin-bottom: 4px
  width: 100%

.vdp-datepicker
  border-radius: $radius
  border: 1px solid $dark
  padding: $input-padding
  outline: none
  background-color: #f2f5f7
  width: 100%
  transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out

.help-message
  position: absolute
  font-size: 14px

.DatePicker.has-error .vdp-datepicker
  background-color: $primary
  border-color: $secondary
  color: $dark

.DatePicker.has-error .help-message
  color: $danger
</style>
