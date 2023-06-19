import { ref } from 'vue';
import {addDoc, collection, onSnapshot, getDoc, doc, updateDoc, deleteDoc,orderBy,query,where } from 'firebase/firestore'
import {firestore} from '../config/firebase'
import {usuario} from './sesion'
const dialog = ref( false )
const itemParam = ref ({})

const guardar = (itemParam) => {
    const referencia = collection(firestore, 'parametros')
    return addDoc(referencia, { ...itemParam, UserId: usuario.value.uid, 
        estado: true }).then(newdoc=> updateDoc(doc(firestore, 'parametros', newdoc.id) ,{id:newdoc.id}))
}

const actualizar = (itemParam) => {
    const referencia = doc(firestore, 'parametros', itemParam.id)
    return updateDoc(referencia, itemParam)
}

const eliminar = (id) => {
    const referencia = doc(firestore, 'parametros', id)
    return deleteDoc(referencia)
}

const registroParametro = ref([])
const obtenerTodos = () => {
    const referencia = collection(firestore, 'parametros')
    const referenciaOrden= query(referencia,where('UserId', '==',usuario.value.uid))
    return onSnapshot(
        referenciaOrden,
        collection => registroParametro.value = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    )
}

const leerparametro = id => {
    const referencia = doc(firestore, 'parametros', id)
    getDoc( referencia ).then( doc => itemParam.value = doc.data())
    return
}

const leerEnRegistro = id => {
    return itemParam.value = registroParametro.value.find( itemParam  => itemParam.id == id )
}
const limpiar=()=> {
    itemParam.value = {}
}

export {
    registroParametro,
    itemParam,
    guardar,
    obtenerTodos,
    leerparametro,
    leerEnRegistro,
    actualizar,
    eliminar,
    limpiar,
    dialog
}