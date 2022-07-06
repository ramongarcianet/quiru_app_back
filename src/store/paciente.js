import { ref } from 'vue';

import { addDoc, collection, onSnapshot, getDoc, getFirestore, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { firestore } from '../config/firebase'

const dialog = ref(false)

const item = ref({
    tipoDocumento: 'DNI',
    sexo: 'M',
    fechaNacimiento: new Date().toISOString().slice(0, 10)
})

const guardar = item => {
    const referencia = collection(firestore, 'paciente')
    return addDoc(referencia, item)
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
export let registro_ = ref([])
const obtenerTodos = () => {
    const referencia = collection(firestore, 'paciente')
    return onSnapshot(
        referencia,
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
        sexo: 'M',
        fechaNacimiento: new Date().toISOString().slice(0, 10)

    }
}


const pageSize = 2;
let curPage = 1;

export function renderTable() {
    let result = '';
    registro_.value = registro.value.filter((row, index) => {
        let start = (curPage - 1) * pageSize;
        let end = curPage * pageSize;
        if (index >= start && index < end) return true;
    });
}
export function previousPage() {
    if (curPage > 1) curPage--;
    renderTable();
}

export function nextPage() {
    if ((curPage * pageSize) < registro.value.length) curPage++;
    renderTable();
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