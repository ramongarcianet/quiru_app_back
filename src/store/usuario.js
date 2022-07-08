import { ref } from 'vue';

import {addDoc, collection, onSnapshot, getDoc, doc, updateDoc, deleteDoc, setDoc,orderBy,query} from 'firebase/firestore'
import {firestore} from '../config/firebase'

const registro = ref([])
const item = ref ({
    tipoDocumento:'DNI',
    sexo:'',
    fechaNacimiento:new Date().toISOString().slice(0,10),
    fechaIngreso: new Date().toISOString().slice(0, 10)

})

export const crearUsuarioConId = item => {
    const referencia = doc(firestore, 'usuario', item.id)
    return setDoc( referencia, item)
}

const guardar = item => {
    const referencia = collection(firestore, 'usuario')
    return addDoc(referencia, item)
}

const actualizar = (item) => {
    const referencia = doc(firestore, 'usuario', item.id)
    return updateDoc(referencia, item)
}

const eliminar = (id) => {
    const referencia = doc(firestore, 'usuario', id)
    return deleteDoc(referencia)
}



const obtenerTodos = () => {
    const referencia = collection(firestore, 'usuario')
    const referenciaOrden= query(referencia,orderBy("fechaIngreso", "desc"))
    return onSnapshot(
        referenciaOrden,
        collection => registro.value = collection.docs.map( doc => ({...doc.data(), id: doc.id }))
    )
}

const leer = id => {
    const referencia = doc(firestore, 'usuario', id)
    return getDoc( referencia ).then( doc => item.value = doc.data())
}

const leerEnRegistro = id => {
    return item.value = registro.value.find( item  => item.id == id )
}
const limpiar=()=> {
    item.value = {
        tipoDocumento:'DNI',
        sexo:'',
        fechaNacimiento:new Date().toISOString().slice(0,10),
        fechaIngreso: new Date().toISOString().slice(0, 10)

    }
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
}

