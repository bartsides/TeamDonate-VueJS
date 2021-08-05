<template>
  <ValidationProvider
    :rules="rules"
    v-slot="{ errors, failed }"
    :mode="mode"
    :vid="name"
    slim
  >
    <div class="TextInput" :class="{ 'has-error': failed }">
      <label :for="name" class="d-flex justify-content-center">
        {{ label }}
      </label>
      <money
        v-if="type == 'money'"
        :name="name"
        :id="name"
        type="text"
        v-model="inputValue"
        :placeholder="placeholder"
        v-maska="mask"
        @blur="onBlur"
      />
      <input
        v-else
        :name="name"
        :id="name"
        :type="type"
        v-model="inputValue"
        :placeholder="placeholder"
        v-maska="mask"
        @blur="onBlur"
      />

      <p class="help-message text-danger" v-if="failed">
        {{ errors[0] }}
      </p>
    </div>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import { Money } from 'v-money';

export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
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
    placeholder: {
      type: String,
      default: '',
    },
    mask: {
      type: [String, Array],
      default: '',
    },
    rules: {
      type: [String, Object],
    },
    mode: {
      type: String,
      default: 'eager',
    },
  },
  components: { ValidationProvider, Money },
  data() {
    return { inputValue: '' };
  },
  methods: {
    onBlur() {
      this.$emit('blur', this);
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val !== undefined) this.inputValue = val;
      },
    },
    inputValue(val) {
      this.$emit('input', val);
    },
  },
};
</script>

<style lang="sass" scoped>
@import @/assets/styles/variables
.TextInput
  position: relative
  margin-bottom: $input-margin-bottom
  width: 100%

label
  display: block
  margin-bottom: 4px
  width: 100%

input
  border-radius: $radius
  border: 1px solid $dark
  padding: $input-padding
  outline: none
  background-color: #f2f5f7
  width: 100%
  transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out

.v-money
  text-align: right

.help-message
  position: absolute
  font-size: 14px

.TextInput.has-error input
  background-color: $primary
  border-color: $secondary
  color: $dark

.TextInput.has-error .help-message
  color: $danger
</style>
