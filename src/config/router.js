import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      path: '/',
      component: ()=>import('../views/6. Sesion/index.vue'),
      children: [
        {
            path:'',
            name: 'landing',
            component: ()=>import('../views/6. Sesion/3. Landing.vue'),
        },
        {
            path: 'sesion',
            component: ()=>import('../views/6. Sesion/1. Sesion.vue'),
            children: [
                {
                    path: '',
                    name: 'iniciar-sesion',
                    component: ()=>import('../views/6. Sesion/1.1 IniciarSesion.vue')
                },
                {
                    path: 'registro',
                    name: 'registro',
                    component: ()=>import('../views/6. Sesion/1.2 Registro.vue')
                },

            ]
        
        },

      ]
    },
    {

        path:'/dashboard',
        component: ()=>import('../views/dashboard.vue'),
        children:[
            {
                path: 'admision',
                name: 'admision',
                component: ()=>import('../views/1.Admision/index.vue')
            },
            {
                path: 'usuarios',
                name: 'usuarios',
                component: ()=>import('../views/2.Usuarios/index.vue')
            },
            {

                path: '/paciente',
                name: 'paciente',
                component: ()=>import('../views/3.Paciente/index.vue')
            },
            {
                path: '/diccionario',
                name: 'diccionario',
                component: ()=>import('../views/4.Diccionario/index.vue')
            },
            {
                path: 'odontograma/:idPaciente?',
                name: 'odontograma',
                component: ()=>import('../views/5.Odontograma/index.vue')
            },
            {
                path: 'Detalle/:idOdontograma?',
                name: 'Detalle',
                component: ()=>import('../views/5.Odontograma/Detalle.vue')
            },
        ]
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router