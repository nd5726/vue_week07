import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: '/product/:id',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: '/cart',
        component: () => import('../views/CartView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'product',
        component: () => import('../views/Admin/ProductView.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/Admin/OrdersView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
