import { ref } from 'vue';
import {setDoc,addDoc, collection, onSnapshot, getDoc, doc, updateDoc, deleteDoc,orderBy,query,where, Firestore } from 'firebase/firestore'
import {firestore } from '../config/firebase'
import {usuario} from '../store/sesion'
import moment from 'moment'
moment.locale('es-ES');

const dialog = ref(false)

const cita = ref({
  numeroDocumento: '',
  tipoDocumento: 'DNI',
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  email:'',
  telefono: '',
  nombreDeCita: '',
  horaDeCita: '',
  fechaDeCita: '',
  fechaDeCreacion: new Date().toISOString().slice(0, 10),

})

const guardarCita = item => {
  const mesActual = moment().format('MMMM')
  const referencia = collection(firestore, 'citas')
  return addDoc(referencia, {...item, idOdontologo: usuario.value.uid, estado: true})
}

const actualizar = (item) => {
  const referencia = doc(firestore, 'citas', item.id)
  return updateDoc(referencia, item)
}

//Aun falta imprimir


const updateEstado = (item) => {
  const referencia = doc(firestore, 'citas', item.id)
  return updateDoc(referencia, {estado: false})
}

const eliminar = (id) => {
  const referencia = doc(firestore, 'citas', id)
  return deleteDoc(referencia)
}




const registro = ref([])
const verEliminados = ref(false)
const obtenerTodos = () => {
    const referencia = collection(firestore, 'citas')
    const referenciaOrden = !verEliminados.value
        ? query(referencia, where('idOdontologo', '==',usuario.value.uid), where('estado', '==', true))
        : query(referencia, where('idOdontologo', '==',usuario.value.uid), orderBy("fechaDeCita", "desc"))
    return onSnapshot(
        referenciaOrden,
        collection => {
            registro.value = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        }
    )
}

const leer = id => {
    const referencia = doc(firestore, 'citas', id)
    return getDoc(referencia).then(doc => cita.value = doc.data())
}

const leerEnRegistro = id => {
    return cita.value = registro.value.find(item => cita.id == id)
}
const limpiar = () => {
    cita.value = {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      email:'',
      telefono: '',
      nombreDeCita: '',
      horaDeCita: '',
      fechaDeCita: '',
      fechaDeCreacion: new Date().toISOString().slice(0, 10),
    }
}


export {
  cita,
  actualizar, 
  guardarCita,
  obtenerTodos,
  updateEstado,
  registro,
  leer,
  leerEnRegistro,
  limpiar,
}