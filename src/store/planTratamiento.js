import { computed, ref } from 'vue';
import { addDoc, collection, onSnapshot, getDocs, doc, updateDoc, deleteDoc, query, where, arrayUnion} from 'firebase/firestore'
import { firestore } from '../config/firebase'
export const registro = ref([])
const item = ref({
    descripDiagnostico: '',
    descripPlan: '',
    idPac: '',
    detallePlan: [],
    id: '',
})
export const guardar = (item) => new Promise((resolve, reject) => {
    const referencia = collection(firestore, 'planes')
    addDoc(referencia, item).then((docRef) => {
        resolve(docRef.id)
        const referencia2 = doc(firestore, 'planes', docRef.id)
        return updateDoc(referencia2, { ...item, id: docRef.id })
    })
})
export const actualizar = (item) => {
    const referencia = doc(firestore, 'planes', item.id)
    return updateDoc(referencia, item)
}
export const eliminar = (id) => {
    const referencia = doc(firestore, 'planes', id)
    return deleteDoc(referencia)
}
export const obtenerTodos = () => {
    const referencia = collection(firestore, 'planes')
    return onSnapshot(
        referencia,
        collection => {
            registro.value = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        }
    )
}
export const leerEnRegistro = id => {
    return item.value = registro.value.find(item => item.id == id)
}
