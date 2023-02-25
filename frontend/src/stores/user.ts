import { defineStore } from "pinia";
import { ref } from "vue";
import {defaultInstance} from "@/api";
import type {Router} from "vue-router";

export const useUserStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("token") || "");
  const authorized = ref(false);
  const reporter = ref(false);

  if (token.value !== "") {
    defaultInstance.get("user/profile")
      .then((res) => {
        if (res.status === 200) {
          setAuth(true);
          setRole(res.data.reporter);
        }
      })
      .catch((e) => console.log(e));
  }

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem("token", newToken);
  }

  const setAuth = (state: boolean) => {
    authorized.value = state;
  }
  
  const setRole = (rep: boolean) => {
    reporter.value = rep;
  }

  const authUser = (token: string, rep: boolean, router: Router) => {
    setToken(token)
    setAuth(true);
    setRole(rep);

    router.push("profile");
  }

  return { token, authorized, reporter, setToken, setAuth, setRole, authUser }
});