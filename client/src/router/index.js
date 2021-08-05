import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/donate',
    name: 'Donate',
    component: () => import('@/views/Donate.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/organizations',
    name: 'Charities',
    component: () => import('@/views/Organizations/Organizations.vue'),
  },
  {
    path: '/organizations/register',
    name: 'Register Charity',
    component: () => import('@/views/Organizations/CreateOrganization.vue'),
  },
  {
    path: '/organizations/:id',
    name: 'Charity',
    component: () => import('@/views/Organizations/Organization.vue'),
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('@/views/Events/Events.vue'),
  },
  {
    path: '/events/create',
    name: 'Create Event',
    component: () => import('@/views/Events/CreateEvent.vue'),
  },
  {
    path: '/events/:id',
    name: 'Event',
    component: () => import('@/views/Events/Event.vue'),
  },
  {
    path: '/profile',
    name: 'Profile Home',
    component: () => import('@/views/Profile/Home.vue'),
  },
  {
    path: '/profile/update',
    name: 'Update Profile',
    component: () => import('@/views/Profile/Update.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
