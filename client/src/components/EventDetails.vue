<template>
  <div class="event-details d-flex justify-content-center pb-5">
    <ValidationObserver class="container" slim v-slot="{ handleSubmit }">
      <div class="row d-flex justify-content-center">
        <form
          @submit.prevent="handleSubmit(save)"
          class="col-12 col-md-10 col-lg-8"
        >
          <div class="row">
            <TextInput
              name="name"
              type="text"
              label="Event name"
              class="col-12"
              v-model="data.name"
              rules="required"
            />
            <TextInput
              name="location"
              type="text"
              label="Location"
              class="col-12"
              v-model="data.location"
              rules="required"
            />
            <DatePicker
              name="date"
              label="Date"
              class="col-12"
              v-model="data.date"
              rules="required"
            />
            <TextInput
              name="description"
              type="text"
              label="Description"
              class="col-12"
              v-model="data.description"
            />
            <TextEditor
              name="content"
              label="Page content / agenda"
              class="col-12"
              v-model="data.content"
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
import DatePicker from '@/components/DatePicker';
import TextEditor from '@/components/TextEditor';
import TextInput from '@/components/TextInput';
export default {
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      default: undefined,
    },
  },
  components: {
    ValidationObserver,
    DatePicker,
    TextEditor,
    TextInput,
  },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    save() {
      this.$emit('submit', this.data);
    },
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        this.data = val ?? { date: null };
      },
    },
  },
};
</script>
