import { ref } from 'vue';

import {addDoc, collection, onSnapshot, getDoc, getFirestore, doc, updateDoc, deleteDoc} from 'firebase/firestore'
import {firestore} from '../config/firebase'

const dialog = ref( false )
const item = ref ({})

const guardar = item => {
    const referencia = collection(firestore, 'listaprecios')
    return addDoc(referencia, item)
}

const actualizar = (item) => {
    const referencia = doc(firestore, 'listaprecios', item.id)
    return updateDoc(referencia, item)
}

const eliminar = (id) => {
    const referencia = doc(firestore, 'listaprecios', id)
    return deleteDoc(referencia)
}

const registro = ref([])

const obtenerTodos = () => {
    const referencia = collection(firestore, 'listaprecios')
    return onSnapshot(
        referencia,
        collection => registro.value = collection.docs.map( doc => ({...doc.data(), id: doc.id }))
    )
}

const leer = id => {
    const referencia = doc(firestore, 'listaprecios', id)
    return getDoc( referencia ).then( doc => item.value = doc.data())
}

const leerEnRegistro = id => {
    return item.value = registro.value.find( item  => item.id == id )
}
const limpiar=()=> {
    item.value = {}
}

export {
    registro,
    item,
    guardar,
    obtenerTodos,
    leer,
    leerEnRegistro,
    actualizar,
    eliminar,
    limpiar,
    dialog
}