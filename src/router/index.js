import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },

  {
    path: "/build",
    name: "BuildForm",
    component: () => import("@/views/BuildForm.vue")
  },
  {
    path: "/fill",
    name: "FillForm",
    component: () => import("@/views/FillForm.vue")
  }
];

export default new Router({
  mode: "history",
  routes
});
