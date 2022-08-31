import { createRouter, createWebHistory } from 'vue-router'
import { obtenerEstadoDeAutentificacion } from '../store/sesion'
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
            path:':codigo?',
            name: 'landingConCodigo',
            component: ()=>import('../views/6. Sesion/3. Landing.vue'),

        },
        {
            path:'inscripcion/:codigo?',
            name: 'inscripcion',
            component: ()=>import('../views/6. Sesion/4. Inscripcion.vue'),
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
]

const router = createRouter({
    history: createWebHistory(),
    routes,

})

router.beforeEach( async (to, from, next) => {
    const hayUsuario = await obtenerEstadoDeAutentificacion()
    const requiereAutentificacion = to.meta.requiereAuth
    if ( requiereAutentificacion && !hayUsuario ) next({name: "landing"})
    else next()
})

export default router