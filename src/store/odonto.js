import { ref } from 'vue';

import {addDoc, collection, onSnapshot, getDoc, getFirestore, doc, updateDoc, deleteDoc, setDoc} from 'firebase/firestore'
import {firestore} from '../config/firebase'

const dialog = ref( false )

const item = ref ({
    nroOdontograma:'',
    diente:'0',
    hallazgo:'',
    pieza:''

})

export const crearUsuarioConId = item => {
    const referencia = doc(firestore, 'detalleOdontograma', item.id)
    return setDoc( referencia, item)
}

const guardar = () => {
    const  fila = {
        nroOdontograma:'',
        diente:  comboPieza.value,
        hallazgo: comboHallazgo.value,
        pieza: ((piezatopcar.value=="1")?"Vestibular,":"")+((piezaleftCar.value=="1")?"Distal,":"")+ ((piezacenterCar.value=="1")?"Oclusal,":"")+((piezarigthCar.value=="1")?"Mesial,":"")+((piezabotCar.value=="1")?"Palatino,":"")
    }
    const referencia = collection(firestore, 'detalleOdontograma')
    return addDoc(referencia, fila)
}
const actualizar = (item) => {
    const referencia = doc(firestore, 'detalleOdontograma', item.id)
    return updateDoc(referencia, item)
}

const eliminar = (id) => {
    const referencia = doc(firestore, 'detalleOdontograma', id)
    return deleteDoc(referencia)
}

const registro = ref([])

const obtenerTodos = () => {
    const referencia = collection(firestore, 'detalleOdontograma')
    return onSnapshot(
        referencia,
        collection => registro.value = collection.docs.map( doc => ({...doc.data(), id: doc.id }))
    )
}

const leer = id => {
    const referencia = doc(firestore, 'detalleOdontograma', id)
    return getDoc( referencia ).then( doc => item.value = doc.data())
}

const leerEnRegistro = id => {
    return item.value = registro.value.find( item  => item.id == id )
}
const limpiar=()=> {
    item.value = {
        nroOdontograma:'',
        diente:'0',
        hallazgo:'',
        pieza:''
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
    dialog
}

