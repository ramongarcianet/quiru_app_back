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
            path:'demo/:codigo?',
            name: 'demo',
            component: ()=>import('../views/6. Sesion/2. Demo.vue'),
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
    {

        path:'/dashboard',
        component: ()=>import('../views/dashboard.vue'),
        meta: { requiereAuth: true },
        children:[
           {
                path: 'admision',
                name: 'admision',
                component: ()=>import('../views/1.Admision/index.vue')
            },
            {
                path: 'usuarios',
                name: 'usuarios',
                component: ()=>import('../views/2.Usuarios/usuarios.vue')
            },
            {
                path: 'usuario/:idUsuario?',
                name: 'usuario',
                component: ()=>import('../views/2.Usuarios/usuario.vue')
            },
            {

                path: 'pacientes',
                name: 'pacientes',
                component: ()=>import('../views/3.Paciente/pacientes.vue')
            },
            {

                path: 'paciente/:idPaciente?',
                name: 'paciente',
                component: ()=>import('../views/3.Paciente/paciente.vue')
            },
            {

                path: 'pacienteVer/:idPaciente?',
                name: 'pacienteVer',
                component: ()=>import('../views/3.Paciente/pacienteVer.vue')
            },
            {
                path: 'diccionarios',
                name: 'diccionarios',
                component: ()=>import('../views/4.Diccionario/diccionarios.vue')
            },
            {
                path: 'diccionario/:idDiccionario?',
                name: 'diccionario',
                component: ()=>import('../views/4.Diccionario/diccionario.vue')
            },
            {
                path: 'Detalle/:idOdontograma?/:idPaciente?',
                name: 'Detalle',
                component: ()=>import('../views/5.Odontograma/1.AsistenteDeVoz.vue')
            },
            {
                path: 'impresion/:idOdontograma?/:idPaciente?',
                name: 'impresion',
                component: ()=>import('../views/5.Odontograma/2.impresion.vue')
            },
            {
                path: 'adicionales/:idOdontograma?/:idPaciente?',
                name: 'adicionales',
                component: ()=>import('../views/5.Odontograma/3.adicionales.vue')
            },
        ]
    }

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