import { createRouter, createWebHistory } from "vue-router";
import RegisterView from '@/views/RegisterView.vueView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: RegisterView
    }
  ],
});

export default router;
