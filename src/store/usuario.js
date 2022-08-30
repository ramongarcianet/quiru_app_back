import { ref } from 'vue';

import { addDoc, collection, onSnapshot, getDoc, doc, updateDoc, deleteDoc, setDoc, orderBy, query } from 'firebase/firestore'
import { firestore } from '../config/firebase'
import { usuario } from '../store/sesion'
const registro = ref([])
const item = ref({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    email: '',
    numeroTlf: '',
    sexo: '',
    fechaNacimiento: new Date().toISOString().slice(0, 10),
    fechaIngreso: new Date().toISOString().slice(0, 10),
    tipoConsultorio: '',
    nombreconsultorio: '',
    direccion: ''
})
const item1 = ref({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    email: '',
    numeroTlf: '',
    sexo: '',
    fechaNacimiento: new Date().toISOString().slice(0, 10),
    fechaIngreso: new Date().toISOString().slice(0, 10),
    tipoConsultorio: '',
    nombreconsultorio: '',
    direccion: ''
})
export const crearUsuarioConId = item => {
    const referencia = doc(firestore, 'usuario', item.id)
    return setDoc(referencia, item)
}

//por lo que al guardar el usuario, debemos usar la llave del usuario (uid)
//const referencia = doc(firestore, 'usuario', uid)
//return setDoc(referencia, {...} )
//con esta forma obtenemos el uid de la sesion para buscar

const guardar = item => {
    const referencia = collection(firestore, 'usuario')
    return addDoc(referencia, {
        ...item, idUsuario: usuario.value.uid,
        estado: true
    })
}

const actualizar = (item) => {
    const referencia = doc(firestore, 'usuario', item.id)
    return updateDoc(referencia, item)
}

const eliminar = (id) => {
    const referencia = doc(firestore, 'usuario', id)
    return deleteDoc(referencia)
}



const obtenerTodos = () => {
    const referencia = collection(firestore, 'usuario')
    //const referenciaOrden = query(referencia, orderBy("fechaIngreso", "desc"))
    return onSnapshot(
        referencia,
        collection => registro.value = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    )
}

//esta función lee en la base de datos por idUsuario del inicio de sesión (uid)
const leer = idUsuario => {
    const referencia = doc(firestore, 'usuario', idUsuario)
    return getDoc(referencia).then(doc => item.value = doc.exists() ? doc.data() : item1)
}

const leerEnRegistro = id => {
    return item.value = registro.value.find(item => item.idUsuario == id)
}
const limpiar = () => {
    item.value = {
        tipoDocumento: 'DNI',
        sexo: '',
        fechaNacimiento: new Date().toISOString().slice(0, 10),
        fechaIngreso: new Date().toISOString().slice(0, 10)

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
}

