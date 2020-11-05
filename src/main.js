import { createApp } from "vue";

import App from "./App.vue";
import route from "./router/router";
import store from "./store/store";
import "./index.css";

const app = createApp(App);
app.use(route);
app.use(store);
app.mount("#app");
