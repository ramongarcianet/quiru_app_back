import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      path: '/',
      name: 'index',
      component: ()=>import('../views/dashboard.vue')
    },
    {
        path: '/admision',
        name: 'admision',
        component: ()=>import('../views/1.Admision/index.vue')
    },
    {
        path: '/usuarios',
        name: 'usuarios',
        component: ()=>import('../views/2.Usuarios/index.vue')
    },
    {
        path: '/paciente',
        name: 'paciente',
        component: ()=>import('../views/3.Paciente/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router