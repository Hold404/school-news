import { createRouter, createWebHistory } from "vue-router";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import NewPostView from "@/views/NewPostView.vue";
import EditPostView from "@/views/EditPostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: RegisterView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: LoginView,
    },
    {
      path: '/newpost',
      name: 'newpost',
      component: NewPostView,
    },
    {
      path: '/editpost/:id',
      name: 'editpost',
      component: EditPostView,
    }
  ],
});

export default router;
