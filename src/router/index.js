import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
