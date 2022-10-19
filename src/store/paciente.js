import { ref } from 'vue';
import {addDoc, collection, onSnapshot, getDoc, doc, updateDoc, deleteDoc,orderBy,query,where } from 'firebase/firestore'
import {firestore } from '../config/firebase'
import {usuario} from '../store/sesion'

const dialog = ref(false)

let item = ref({
    tipoDocumento: 'DNI',
    sexo: '',
    fechaNacimiento: new Date().toISOString().slice(0, 10),
    fechaIngreso: new Date().toISOString().slice(0, 10),
    constancia:'N',
    estado: true
})

const guardar = item => {
    const referencia = collection(firestore, 'paciente')
    return addDoc(referencia, {...item,idOdontologo:usuario.value.uid,
        estado: true})
}

const actualizar = (item) => {
    const referencia = doc(firestore, 'paciente', item.id)
    return updateDoc(referencia, item)
}

const updateEstado = (item) => {
    const referencia = doc(firestore, 'paciente', item.id)
    return updateDoc(referencia, {estado: false})
}

const eliminar = (id) => {
    const referencia = doc(firestore, 'paciente', id)
    return deleteDoc(referencia)
}

const registro = ref([])
const verEliminados = ref(false)
const obtenerTodos = () => {
    const referencia = collection(firestore, 'paciente')
    const referenciaOrden = !verEliminados.value
        ? query(referencia, where('idOdontologo', '==',usuario.value.uid), where('estado', '==', true))
        : query(referencia, where('idOdontologo', '==',usuario.value.uid), orderBy("fechaIngreso", "desc"))
    return onSnapshot(
        referenciaOrden,
        collection => {
            registro.value = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        }
    )
}
const obtenerTodosDni = () => {
    const referencia = collection(firestore, 'paciente')
    const referenciaOrden = !verEliminados.value
        ? query(referencia, where('idOdontologo', '==',usuario.value.uid), where('estado', '==', true))
        : query(referencia, where('idOdontologo', '==',usuario.value.uid), orderBy("fechaIngreso", "desc"))
    return onSnapshot(
        referenciaOrden,
        collection => {
            registro.value = collection.docs.map(doc => ({ ...doc.data(), dni: doc.dni }))
        }
    )
}

const leer = id => {
    const referencia = doc(firestore, 'paciente', id)
    return getDoc(referencia).then(doc => item.value = doc.data())
}

const leerEnRegistro = id => {
    return item.value = registro.value.find(item => item.id == id)
}
const leerDniRegistro = dni => {
    return item = registro.value.find(item => item.dni == dni)
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
    obtenerTodosDni,
    leerDniRegistro,
    actualizar,
    eliminar,
    limpiar,
    updateEstado,
    dialog,
    verEliminados,
}