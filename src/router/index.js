import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import MoviesView from '../views/MoviesView.vue';
import DetailsView from '../views/DetailsView.vue';
import CartView from '../views/CartView.vue';
import SettingsView from '../views/SettingsView.vue';
import { useStore } from '../store';

const routes = [
     { path: '/', meta: { auth: false }, component: HomeView },
    { path: '/register', meta: { auth: false }, component: RegisterView },
    { path: '/login', meta: { auth: false }, component: LoginView },
    { path: '/cart', meta: { auth: true }, component: CartView },
    { path: '/movies', meta: { auth: true }, component: MoviesView },
    { path: '/movies/:id', meta: { auth: true }, component: DetailsView },
    { path: '/setting', meta: { auth: true}, component: SettingsView }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const store = useStore();
    
    store.userAuthorized.then(() => {
      if (!store.user && to.meta.auth) {
        next("/login");
      } else {
        next();
      }
    });
  });
export default router;
