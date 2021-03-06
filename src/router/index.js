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
    component: () => import('../views/admin/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/ProductsView.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/admin/OrdersView.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/CouponsView.vue'),
      },
      {
        path: 'articles',
        component: () => import('../views/admin/ArticlesView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
