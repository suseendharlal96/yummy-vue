import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
import Success from "../views/Success.vue";
import MyOrders from "../views/MyOrders.vue";
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
  { path: "/orders", component: MyOrders },
  {
    path: "/success",
    component: Success,
    beforeEnter: (to, from) => {
      if (
        from.matched &&
        from.matched.length > 0 &&
        from.matched[0].path === "/hotel/:id/pay"
      ) {
        return true;
      } else {
        return { path: "/" };
      }
    },
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
