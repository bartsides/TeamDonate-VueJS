<template>
  <div class="create-event">
    <h1 class="d-flex justify-content-center mb-4">Create new event</h1>
    <EventDetails @submit="submit" buttonText="Create Event" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import router from '@/router';
import EventDetails from '@/components/EventDetails';
export default {
  components: {
    EventDetails,
  },
  computed: {
    ...mapGetters(['isAdmin']),
  },
  methods: {
    ...mapActions(['createEvent']),
    submit(event) {
      if (!this.isAdmin) router.push('/');
      const data = {
        id: this.$newid(),
        ...event,
      };

      this.createEvent(data).then((res) => {
        if (res) {
          // TODO Redirect to event page
          this.$toast.success('Event registered successfully!');
        } else {
          this.$toast.error('An error occurred. Try again in a bit.');
        }
      });
    },
  },
};
</script>
