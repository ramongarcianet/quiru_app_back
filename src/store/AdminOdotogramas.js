import { ref, computed } from 'vue';
import route from './../config/router'
import { addDoc, collection, onSnapshot, getDoc, getDocs, doc, updateDoc, deleteDoc, query, where, arrayUnion, orderBy } from 'firebase/firestore'
import { firestore } from '../config/firebase'
import { miUsuario } from './sesion';
//import { listaDeHallazgos, listaDeDientesCombo } from '../config/Parametros'
import { isSpeech, speak } from './odontograma'
//import escenarios from '../config/Escenarios.json';
const dialog = ref(false)
const refpaciente = ref([])
const item = ref({
    fechaRegistro: new Date(),
    fechaCorta: new Date().toISOString().slice(0, 10),
    userId: miUsuario()?.uid,
    hallazgos: [],
    nombre:'',
    numeroDocumento: '',
    tipoDocumento: 'DNI'
})

const guardar = () => new Promise((resolve, reject) => {
    const fila = {
        fechaRegistro: new Date(),
        fechaCorta: new Date().toISOString().slice(0, 10),
        userId: miUsuario()?.uid,
        numeroDocumento: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        tipoDocumento: 'DNI',
    }
    const referencia = collection(firestore, 'odontograma')
    return addDoc(referencia, fila).then((docRef) => {
        return resolve(docRef.id)
    })
})
export const actualizarId = (id) => {
    const referencia = doc(firestore, 'odontograma', id)
    return updateDoc(referencia, { id: id })
}
export const actualizar = (id) => {
    const referencia = doc(firestore, 'odontograma', id)
    return updateDoc(referencia, item.value)
}
export const actualizarDatosOdonto = (item) => {
    const referencia = doc(firestore, 'odontograma', item.id)
    return updateDoc(referencia, item)
}

export const actualizarDetalle = (id, Hallazgos) => {
    let hallazgosOrder = Hallazgos.sort(function (a, b) {
        return b.fechaHallazgo - a.fechaHallazgo
    })
    var itemUpd = {
        id: id,
        hallazgos: hallazgosOrder
    }
    const referencia = doc(firestore, 'odontograma', itemUpd.id)
    return updateDoc(referencia, itemUpd)
}

const borrarDeLaColeccion = () => {
    item.archivos.splice(i, 0)
}
const eliminar = (id) => {
    const referencia = doc(firestore, 'odontograma', id)
    return deleteDoc(referencia)
}

const registroodonto = ref([])

export const registro_ = computed(() => registroodonto.value)

const obtenerTodos = (userId) => {
    const referencia = query(
        collection(firestore, 'odontograma'),
        orderBy("fechaRegistro", "desc")
    )
    return onSnapshot(
        referencia,
        collection => {
            registroodonto.value = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        }
    )
}
export const leer = id => {
    const referencia = doc(firestore, 'odontograma', id)
    return getDoc(referencia).then(doc => item.value = doc.data())
}

export const leerOdonto = id => {
    const referencia = doc(firestore, 'odontograma', id)
    const registro = getDoc(referencia).then(doc => item.value = doc.data())
    if (registro.value != undefined)
        item.value = registro.value
}

export const leerEnRegistro = id => {
    return item.value = registroodonto.value.find(item => item.id == id)
}
export const getItemEnRegistro = id => registroodonto.value.find(item => item.id == id)

export const obtenerOdontoNroDoc = (numeroDocumento, userId) => new Promise( resolve => {
    const referencia = query(collection(firestore, 'odontograma'), where("numeroDocumento", "==", numeroDocumento), orderBy("fechaRegistro", "desc"))
    return getDocs( referencia ).then( coll => resolve(coll.docs.map(item => ({...item.data(), id: item.id}))) )
} )

const limpiar = () => {
    item.value = {
        tipo: '',
        especificaciones: '',
        observaciones: '',
        receta: '',
        fechaRegistro: new Date().toISOString().slice(0, 10),
        userId: miUsuario()?.uid
    }
}

export {
    registroodonto,
    item,
    guardar,
    dialog,
    obtenerTodos,
    eliminar,
    refpaciente
}