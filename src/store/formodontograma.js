import { ref } from 'vue';

import {addDoc, collection, onSnapshot, getDoc, getFirestore, doc, updateDoc, deleteDoc, query, where} from 'firebase/firestore'
import {firestore} from '../config/firebase'
import { miUsuario } from './sesion';
import {useRouter} from 'vue-router'
const dialog = ref( false )
const regpasciente = ref([])
const item = ref ({
        tipo:'',
        especificaciones:'',
        observaciones:'',
        receta:'',
        fechaRegistro:new Date().toISOString().slice(0,10),
        userId: miUsuario()?.uid
})


const guardar = () => {

    const  fila = {
        tipo:'',
        especificaciones:'',
        observaciones:'',
        receta:'',
        fechaRegistro:new Date().toISOString().slice(0,10),
        userId: miUsuario()?.uid
    }
    const referencia = collection(firestore, 'odontograma')
    return addDoc(referencia, fila)

}

const actualizar = (item) => {
    const referencia = doc(firestore, 'odontograma', item.id)
    return updateDoc(referencia, item)
}

const eliminar = (id) => {
    const referencia = doc(firestore, 'odontograma', id)
    return deleteDoc(referencia)
}

const registroodonto = ref([])

const obtenerTodos = () => {
    if(!miUsuario() ) return

    const referenciaPac = doc(firestore, 'paciente', "36HX0wfqBHcIU6iVg4RD")
    getDoc( referenciaPac ).then( doc => regpasciente.value = doc.data())

    const referencia = collection(firestore, 'odontograma')

    const busqueda = query( referencia, where( "userId", "==", miUsuario()?.uid))
    return onSnapshot(
        busqueda,
        collection => registroodonto.value = collection.docs.map( doc => ({...doc.data(), id: doc.id }))
    )
}

const leer = id => {
    const referencia = doc(firestore, 'odontograma', id)
    return getDoc( referencia ).then( doc => item.value = doc.data())
}

const leerEnRegistro = id => {
    return item.value = registroodonto.value.find( item  => item.id == id )
}

const limpiar=()=> {
    item.value = {
        tipo:'',
        especificaciones:'',
        observaciones:'',
        receta:'',
        fechaRegistro:new Date().toISOString().slice(0,10),
        userId: miUsuario()?.uid
    }
}

export {
    registroodonto,
    item,
    guardar,
    dialog,
    obtenerTodos,
    eliminar,
    leerEnRegistro,
    regpasciente
}