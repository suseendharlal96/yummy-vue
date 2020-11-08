import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
import Success from "../views/Success.vue";
import Hotel from "../components/Hotel.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  { path: "/auth", component: Auth },
  {
    path: "/hotel/:id",
    component: Hotel,
  },
  {
    path: "/hotel/:id/pay",
    component: Hotel,
  },
  {
    path: "/success",
    component: Success,
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
