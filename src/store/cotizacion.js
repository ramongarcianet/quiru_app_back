import { ref } from 'vue';
import {addDoc, collection, onSnapshot, getDoc, getFirestore, doc, updateDoc, deleteDoc,orderBy,query,where } from 'firebase/firestore'
import {firestore} from '../config/firebase'
import {usuario} from '../store/sesion'
const dialog = ref( false )

const item = ref ({
    concepto: "",
    idOdontograma: "",
    precio: 0,
    estado: "Pendiente"
})

const guardar = item => {
    const referencia = collection(firestore, 'presupuesto')
    return addDoc(referencia, {
        ...item,
    })
}

const actualizar = (item) => {
    const referencia = doc(firestore, 'presupuesto', item.id)
    return updateDoc(referencia, item)
}

const eliminar = (id) => {
    const referencia = doc(firestore, 'presupuesto', id)
    return deleteDoc(referencia)
}

const registro = ref([])
const obtenerTodos = (idOdontograma) => {
    const referencia = collection(firestore, 'presupuesto')
    
    const referenciaOrden = query(referencia,where('idOdontograma', '==', idOdontograma)) //,orderBy("tipo", "asc")
    
    return onSnapshot(
        referenciaOrden,
        collection => registro.value = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    )
}

const leer = id => {
    const referencia = doc(firestore, 'presupuesto', id)
    return getDoc( referencia ).then( doc => item.value = doc.data())
}

const leerEnRegistro = id => {
    return item.value = registro.value.find( item  => item.id == id ) || {}
    
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