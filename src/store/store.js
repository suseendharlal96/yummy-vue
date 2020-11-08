import { createStore } from "vuex";

import authModule from "./modules/auth/authModule";
import orderModule from "./modules/order/orderModule";

const store = createStore({
  modules: {
    auth: { ...authModule, namespaced: true },
    order: { ...orderModule, namespaced: true },
  },
});

export default store;
