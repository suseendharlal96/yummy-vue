import { createStore } from "vuex";

import authModule from "./modules/auth/authModule";

const store = createStore({
  modules: {
    auth: { ...authModule, namespaced: true },
  },
});

export default store;
