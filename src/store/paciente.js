import { ref } from 'vue';

import { addDoc, collection, onSnapshot, getDoc, getFirestore, doc, updateDoc, deleteDoc,orderBy,query,where } from 'firebase/firestore'
import { firestore } from '../config/firebase'
import {usuario} from '../store/sesion'

const dialog = ref(false)

const item = ref({
    tipoDocumento: 'DNI',
    sexo: '',
    fechaNacimiento: new Date().toISOString().slice(0, 10),
    fechaIngreso: new Date().toISOString().slice(0, 10),
    constancia:'N'
})

const guardar = item => {
    const referencia = collection(firestore, 'paciente')
    return addDoc(referencia, {...item,idOdontologo:usuario.value.uid})
}

const actualizar = (item) => {
    const referencia = doc(firestore, 'paciente', item.id)
    return updateDoc(referencia, item)
}

const eliminar = (id) => {
    const referencia = doc(firestore, 'paciente', id)
    return deleteDoc(referencia)
}

const registro = ref([])
const obtenerTodos = () => {
    const referencia = collection(firestore, 'paciente')
    const referenciaOrden= query(referencia,where('idOdontologo', '==',usuario.value.uid),orderBy("fechaIngreso", "desc"))
    return onSnapshot(
        referenciaOrden,
        collection => registro.value = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    )
}


const leer = id => {
    const referencia = doc(firestore, 'paciente', id)
    return getDoc(referencia).then(doc => item.value = doc.data())
}

const leerEnRegistro = id => {
    return item.value = registro.value.find(item => item.id == id)
}
const limpiar = () => {
    item.value = {
        tipoDocumento: 'DNI',
        sexo: '',
        fechaNacimiento: new Date().toISOString().slice(0, 10),
        fechaIngreso: new Date().toISOString().slice(0, 10),
        constancia:'N'

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