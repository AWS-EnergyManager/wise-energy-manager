import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/consumption',
    name: 'consumption',
    component: () => import('../views/monitor/EnergyConsumption.vue')
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('../views/analyze/EnergyConsumptionRank.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/MultiTarget',
    name: 'MultiTarget',
    component: () => import('../views/analyze/MultiTarget.vue')
  },{
    path: '/MultiTime',
    name: 'MultiTime',
    component: () => import('../views/analyze/MultiTime.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
