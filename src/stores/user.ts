import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
  const token = ref("");
  const authorized = ref(false);
  const reporter = ref(false);

  return { token, authorized, reporter }
})