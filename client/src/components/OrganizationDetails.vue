<template>
  <div class="organization-details d-flex justify-content-center pb-5">
    <ValidationObserver class="container" slim v-slot="{ handleSubmit }">
      <div class="row d-flex justify-content-center">
        <form
          @submit.prevent="handleSubmit(submit)"
          class="col-12 col-md-10 col-lg-8"
        >
          <div class="row">
            <TextInput
              name="name"
              type="text"
              label="Organization name"
              class="col-12"
              v-model="data.name"
              rules="required"
            />
            <div class="col-6" />
            <TextInput
              name="goal"
              label="Fundraising goal"
              class="col-6"
              v-model="data.goal"
              type="money"
              rules="required"
            />
            <TextEditor
              name="description"
              label="Description"
              class="col-12"
              v-model="data.description"
            />
          </div>
          <button class="btn btn-primary btn-lg float-right">
            {{ buttonText }}
          </button>
        </form>
      </div>
    </ValidationObserver>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate';
import TextEditor from '@/components/TextEditor';
import TextInput from './TextInput.vue';
export default {
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: { ValidationObserver, TextEditor, TextInput },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    submit() {
      this.$emit('submit', this.data);
    },
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        this.data = val ?? {};
      },
    },
  },
};
</script>
