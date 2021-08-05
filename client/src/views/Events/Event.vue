<template>
  <div class="update-event">
    <!-- TODO Event page. Only offer edit if admin -->
    <div v-if="event">
      <h1 class="d-flex justify-content-center mb-4">Update event details</h1>
      <EventDetails :value="event" @submit="submit" buttonText="Update Event" />
    </div>
    <Loading v-else />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import router from '@/router';
import EventDetails from '@/components/EventDetails';
import Loading from '@/components/Loading';

export default {
  components: {
    EventDetails,
    Loading,
  },
  data() {
    return {
      event: null,
    };
  },
  computed: {
    ...mapGetters(['isAdmin', 'events']),
  },
  methods: {
    ...mapActions(['updateEvent', 'getEvent']),
    submit(eventData) {
      if (!this.isAdmin) router.push('/');
      const data = {
        id: this.$newid(),
        ...eventData,
      };

      this.updateEvent(data).then((res) => {
        if (res) {
          // TODO Redirect to event page
          this.$toast.success('Event updated successfully!');
        } else {
          this.$toast.error('An error occurred. Try again in a bit.');
        }
      });
    },
  },
  async mounted() {
    const eventId = this.$route.params['id'];
    // Get data from store if possible
    if (this.events && this.events.length)
      this.event = this.events.find((event) => event.id == eventId);
    else this.event = await this.getEvent(eventId);
  },
};
</script>
