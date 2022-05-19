
import {auth} from '../config/firebase'
import {ref} from 'vue'
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth'
import {crearUsuarioConId} from './usuario'
import router from '../config/router'


export const item = ref({})

export const crearCuenta = ({email, password, nombre, apellido})=>{
    return createUserWithEmailAndPassword(auth, email, password).then(({user}) => {
        crearUsuarioConId( {
            nombre,
            apellido,
            email,
            id: user.uid
        })
    })
}

export const iniciarSesion = ({email, password}) =>{
    return signInWithEmailAndPassword( auth, email, password)
}

export const cerrarSesion = () => signOut(auth)

export const sesion = () => onAuthStateChanged( 
    auth,
    ( user ) => {
        if( user ) router.push({name:'pacientes'})
        else if( router.currentRoute.value.meta.requiereAuth && !user ) router.push({name:'landing'})
        else return

    }
)

export const obtenerEstadoDeAutentificacion = ()=> new Promise( resolve =>{ 
    const unsub = onAuthStateChanged( 
    auth,
    ( user ) => {
        unsub()
        if(user) resolve( true )
        else resolve( false )
    }
)})

export const miUsuario = () => auth.currentUser