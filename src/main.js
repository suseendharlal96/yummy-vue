import { createApp } from "vue";
import VueForm from "vue-form";
import App from "./App.vue";
import route from "./router/router";
import store from "./store/store";
import "./index.css";

const app = createApp(App);
app.use(route);
app.use(store);
app.use(VueForm);
app.mount("#app");
