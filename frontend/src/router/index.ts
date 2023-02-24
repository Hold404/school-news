import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: RegisterView
    },
    {
      path: '/signin',
      name: 'signin',
      component: LoginView
    }
  ],
});

export default router;
