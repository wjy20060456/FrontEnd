import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path:'/', redirect:'/home'},
  {path:'/home', component:() => import('../views/Home.vue')},
  {path:'/note', component:() => import('../views/Note.vue')},
  {path:'/chart', component:() => import('../views/Chart.vue')},
  {path:'/login', component:() => import('../views/LogIn.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
