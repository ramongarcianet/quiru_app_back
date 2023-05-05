import { ref } from 'vue';
import { addDoc, collection, onSnapshot, getDoc, doc, updateDoc, deleteDoc, orderBy, query, where, getDocs } from 'firebase/firestore'
import { firestore } from '../config/firebase'
import { usuario } from '../store/sesion'

const dialog = ref(false)

const item = ref({
    tipoDocumento: 'DNI',
    sexo: '',
    fechaNacimiento: new Date().toISOString().slice(0, 10),
    fechaIngreso: new Date().toISOString().slice(0, 10),
    constancia: 'N',
    estado: true,
    askHCG1: 'N',
    askHCG2: 'N',
    askHCG3: 'N',
    askHCG4: 'N',
    askHCG5: 'N',
    askHCG6: 'N',
    askHCG7: 'N',
    askHCG8: 'N',
    askHCG9: 'N',
    visto: 0
})
const revisarDNI = (item) => new Promise((resolve) => {
    try {
        return getDocs(
            query(
                collection(firestore, "paciente"),
                where("numeroDocumento", "==", item.numeroDocumento)
            )
        )
            .then(resultado => {
                if (resultado.empty) resolve(true)
                else resolve(false)
            })
    }
    catch (e) {
        console.log(e)
    }
})

const guardar = item => new Promise((resolve) => {
    const referencia = collection(firestore, 'paciente')

    return addDoc(referencia, {
        ...item, idOdontologo: usuario.value.uid,
        estado: true, visto: 0
    }).then(doc => resolve(doc.id))
})

const actualizar = (item) => {
    const referencia = doc(firestore, 'paciente', item.id)
    return updateDoc(referencia, item)
}

const updateEstado = (item) => {
    const referencia = doc(firestore, 'paciente', item.id)
    return updateDoc(referencia, { estado: false })
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
        ? query(referencia, where('idOdontologo', '==', usuario.value.uid), where('estado', '==', true))
        : query(referencia, where('idOdontologo', '==', usuario.value.uid), orderBy("fechaIngreso", "desc"))
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
        ? query(referencia, where('idOdontologo', '==', usuario.value.uid), where('estado', '==', true))
        : query(referencia, where('idOdontologo', '==', usuario.value.uid), orderBy("fechaIngreso", "desc"))
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
    try {
        item.value = registro.value.find(item => item.numeroDocumento == dni)
    }
    catch (e) {
        item.value = {
            tipoDocumento: 'DNI',
            sexo: '',
            fechaNacimiento: new Date().toISOString().slice(0, 10),
            fechaIngreso: new Date().toISOString().slice(0, 10),
            constancia: 'N',
            estado: true,
            visto: 0,
            numeroDocumento: dni
        }
    }
    if(item.value==undefined){
        item.value = {
            tipoDocumento: 'DNI',
            sexo: '',
            fechaNacimiento: new Date().toISOString().slice(0, 10),
            fechaIngreso: new Date().toISOString().slice(0, 10),
            constancia: 'N',
            estado: true,
            visto: 0,
            numeroDocumento: dni
        }
        alert("El DNI ingresado no existe, seleccione el check para registrar un nuevo paciente")
    }
    return
}
const limpiar = () => {
    item.value = {
        tipoDocumento: 'DNI',
        sexo: '',
        fechaNacimiento: new Date().toISOString().slice(0, 10),
        fechaIngreso: new Date().toISOString().slice(0, 10),
        constancia: 'N',
        askHCG1: 'N',
        askHCG2: 'N',
        askHCG3: 'N',
        askHCG4: 'N',
        askHCG5: 'N',
        askHCG6: 'N',
        askHCG7: 'N',
        askHCG8: 'N',
        askHCG9: 'N',
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
    revisarDNI,
}