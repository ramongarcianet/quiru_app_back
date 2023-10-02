import { auth } from '../config/firebase'
import { ref } from 'vue'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, signInAnonymously   } from 'firebase/auth'
import { crearUsuarioConId, crearUsuarioConGoogle, crearUsuarioConFacebook } from './usuario'
import router from '../config/router'
export const providerG = new GoogleAuthProvider();
export const logGoogle = () => signInWithPopup(auth, providerG)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(result.user)
    crearUsuarioConGoogle( {
      nombre: result.user.displayName,
      email: result.user.email,
      id: result.user.uid
    })
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
export const providerF = new FacebookAuthProvider();
export const logFacebook = () => {
  const auth = getAuth();
  signInWithPopup(auth, providerF)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log(result.user)
      crearUsuarioConGoogle( {
        nombre: result.user.displayName,
        email: result.user.email,
        id: result.user.uid
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
    });
}
export const usuario = ref({});
export const item = ref({})
const devolverError = e => {
  let mensajeDeError
  switch( e.code ){
    case 'auth/wrong-password':
      mensajeDeError = 'Contraseña equivocada, intenta nuevamente'
      break
    case 'auth/user-not-found':
      mensajeDeError = 'No existe ninguna cuenta asociada a este correo'
      break
    case 'auth/too-many-requests':
      mensajeDeError = 'Demasiadas solicitudes, vuelve a intentarlo en 15 min.'
      break
    case 'auth/invalid-email':
      mensajeDeError = 'Email inválido'
      break
    case 'auth/email-already-in-use':
      mensajeDeError = 'Este correo ya tiene una cuenta registrada'
      break
    default:
      mensajeDeError = e.code
      break
  }
  return mensajeDeError
}

export const crearCuenta = ({email, password, nombre, apellidoPaterno, apellidoMaterno}) =>new Promise ((resolve, reject) =>{
  return createUserWithEmailAndPassword(auth, email, password)
    .then(({user}) => {
      crearUsuarioConId( {
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        email: email,
        id: user.uid
      })
        .then( ()=> resolve() )
        .catch( (e)=> reject(devolverError(e)) )
    })
    .catch( (e)=> reject(devolverError(e)) )
})
export const iniciarSesion = ({email, password}) =>new Promise ((resolve, reject) => {
  return signInWithEmailAndPassword( auth, email, password)
    .then(()=>resolve())
    .catch(e => {
      
      reject(devolverError(e))
    })
})
export const resetContraseña = ({email}) => {
  return sendPasswordResetEmail(auth, email)

}

export const cerrarSesion = () => signOut(auth)

export const sesion = () => onAuthStateChanged(
    auth,
    ( user ) => {
        if( user ) 
          router.push({name: 'estadisticas'})
        else if( router.currentRoute.value.meta.requiereAuth && !user ) 
          router.push({name:'landing'})
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