import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
import Sample from "../components/Sample.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  { path: "/auth", component: Auth },
  {
    path: "/sample",
    component: Sample,
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
