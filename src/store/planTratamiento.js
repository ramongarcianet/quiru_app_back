import { computed, ref } from 'vue';
import { addDoc, collection, onSnapshot, getDocs, doc, updateDoc, deleteDoc, query, where} from 'firebase/firestore'
import { firestore } from '../config/firebase'
import { miUsuario } from './sesion';
import {useRouter} from 'vue-router'
export const dialog = ref( false )
export const registro = ref([])
export const item = ref({
    descripDiagnostico: '',
    descripPlan: '',
    idDiagnostico: '',
    idTratamiento: '',
    detallePlan: [],
    id: '',
})

export const guardar = (item) => {
    const referencia = collection(firestore, 'planes')
    return addDoc(referencia, item)
}

export const actualizar = (item) => {
    const referencia = doc(firestore, 'planes', item.id)
    return updateDoc(referencia, item)
}

export const eliminar = (id) => {
    const referencia = doc(firestore, 'planes', id)
    return deleteDoc(referencia)
}

/*export const obtenerTodos = idPaciente => {
    const referencia = query(collection(firestore, 'planes'), where( 'idPaciente', '==', idPaciente))
    return onSnapshot( referencia , coll =>{
        if (coll.empty) return item.value = {}
        item.value = coll.docs.map(item => ({...item.data(), id: item.id})) [0]
        console.log(item.value)
    } )
}*/

export const obtenerTodos = () => {
    const referencia = collection(firestore, 'planes')
    return onSnapshot(
        referencia,
        collection => {
            registro.value = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        }
    )
}
export const leerEnRegistro = computed( ()=> idPaciente => {
    return item.value = registro.value.find(item => item.idPaciente == idPaciente) || {}
} )


export const limpiar = () => {
    item.value = {
        descripDiagnostico: '',
        descripPlan: '',
        idDiagnostico: '',
        idTratamiento: '',
        id: '',
    }
}
