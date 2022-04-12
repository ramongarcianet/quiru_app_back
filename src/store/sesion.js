
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
const {push} = router

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
        if(user) push({name:'admision'})
        else push({name:'landing'})
    }
)

export const miUsuario = () => auth.currentUser