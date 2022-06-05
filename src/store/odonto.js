import { ref } from 'vue';

import {addDoc, collection, onSnapshot, getDoc, getFirestore, doc, updateDoc, deleteDoc, setDoc, query, where} from 'firebase/firestore'
import {firestore} from '../config/firebase'


const item = ref ({
    nroOdontograma:'',
    diente:'0',
    hallazgo:'',
    pieza:''

})

const guardar = (idOdontograma, item) => {

    const referencia = collection(firestore, 'odontograma', idOdontograma, 'registro')
    return addDoc(referencia, item)

}

const eliminar = (id) => {
    const referencia = doc(firestore, 'odontograma', idOdontograma, 'registro', id)
    return deleteDoc(referencia)
}

const registro = ref([])

const obtenerTodos = (idOdontograma) => {
    const referencia =  collection(firestore, 'odontograma', idOdontograma, 'registro')
    
    return onSnapshot(
        referencia,
        collection => registro.value = collection.docs.map( doc => ({...doc.data(), id: doc.id }))
    )
}


function clearcanvas(id) {
    var canvas = document.getElementById(id);
    var contexto = canvas.getContext("2d");
	contexto.clearRect(0, 0, canvas.width, canvas.height);
}
const listaDiccionario = []

const obtenerTodoDiccionario = () => {
    const referencia = collection(firestore, 'diccionario')
    return onSnapshot(
        referencia,
        collection => listaDiccionario.value = collection.docs.map( doc => ({...doc.data(), id: doc.id }))
    )
}
const listaPieza = []
const obtenerTodoPieza = () => {
    const referencia = collection(firestore, 'pieza')
    return onSnapshot(
        referencia,
        collection => listaPieza.value = collection.docs.map( doc => ({...doc.data(), id: doc.id }))
    )
}
const listaHallazgo = []
const obtenerTodoHallazgo = () => {
    const referencia = collection(firestore, 'hallazgo')
    return onSnapshot(
        referencia,
        collection => listaHallazgo.value = collection.docs.map( doc => ({...doc.data(), id: doc.id }))
    )
}
const listaCaries = []
const obtenerTodoCaries = () => {
    const referencia = collection(firestore, 'caries')
    return onSnapshot(
        referencia,
        collection => listaCaries.value = collection.docs.map( doc => ({...doc.data(), id: doc.id }))
    )
}

export {
    registro,
    item,
    guardar,
    obtenerTodos,
    eliminar,
    obtenerTodoDiccionario,
    listaDiccionario,
    obtenerTodoPieza,
    listaPieza,
    obtenerTodoHallazgo,
    listaHallazgo,
    obtenerTodoCaries,
    listaCaries,
}

