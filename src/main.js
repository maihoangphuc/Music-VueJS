import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import FloatingVue from "floating-vue";
import "./assets/style/index.css";
import "floating-vue/dist/style.css";

const app = createApp(App);
app.use(router);
app.use(FloatingVue);
app.mount("#app");
