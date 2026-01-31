import { createRouter, createWebHistory } from "vue-router";
import FiliacaoForm from "../components/FiliacaoForm.vue";
import ShowFiliados from "../components/ShowFiliados.vue";

const routes = [
  {
    path: "/",
    name: "filiacao",
    component: FiliacaoForm,
  },
  {
    path: "/filiados",
    name: "filiados",
    component: ShowFiliados,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
