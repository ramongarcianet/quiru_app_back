import {auth} from '../config/firebase'
import {ref} from 'vue'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, getAuth } from 'firebase/auth'
import {crearUsuarioConId} from './usuario'
import router from '../config/router'
export const usuario = ref({});
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
export const iniciarSesion = ({email, password}) =>new Promise ((resolve, reject) => {
  return signInWithEmailAndPassword( auth, email, password)
    .then(()=>resolve())
    .catch(e => {
      let mensajeDeError
      switch( e.code ){
        case 'auth/wrong-password':
          mensajeDeError = 'Contraseña equivocada, intenta nuevamente'
          break
        case 'auth/user-not-found':
          mensajeDeError = 'No existe ninguna cuenta asociada a este correo'
          break
        default:
          mensajeDeError = e.code
          break
      }
      reject(mensajeDeError)
    })
})

export const resetContraseña = ({email}) => {
  return sendPasswordResetEmail(auth, email)

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
        if(user) {
            usuario.value.uid=user.uid
            resolve( true )
        }
        else resolve( false )
    }
)})

export const miUsuario = () => auth?.currentUser