import { ref, computed, onUnmounted } from 'vue';
import route from './../config/router'
import { addDoc, collection, onSnapshot, getDoc, getDocs, doc, updateDoc, deleteDoc, query, where, arrayUnion, orderBy } from 'firebase/firestore'
import { firestore } from '../config/firebase'
import { miUsuario } from './sesion';
import { listaDeHallazgos, listaDeDientesCombo } from '../config/Parametros'
import { isSpeech, speak } from './odontograma'
//import escenarios from '../config/Escenarios.json';
import {item as itemUsuario} from '../store/usuario'
const dialog = ref(false)
const regpasciente = ref([])
export const mensajeExistePieza = ref('')
const item = ref({
    tipo: '',
    especificaciones: '',
    observaciones: '',
    receta: '',
    fechaRegistro: new Date().toISOString().slice(0, 10),
    userId: miUsuario()?.uid,
    hallazgos: [],
    planDeTratamiento: [],
    idRelacionado: '',
})
export const funcionPlan = (item, id) => {
    const referencia = doc(firestore, 'odontograma', id);
    return updateDoc(referencia, {
        planDeTratamiento: arrayUnion({
            ...item
        })
    });
}

const guardar = (idPaciente, tipo, tieneTratamiento, idRelacionado) => new Promise((resolve, reject) => {
    for (const item of registroodonto.value) {
        if (item.tieneTratamiento === 'No')
            actualizarTratamiento(item.id, 'Si');
    }
    const fila = {
        tipo: tipo,
        especificaciones: '',
        observaciones: '',
        receta: '',
        fechaRegistro: new Date(),
        idPaciente,
        userId: miUsuario()?.uid,
        tieneTratamiento: tieneTratamiento,
        order: registroodonto.value.length + 1,
    }

    if (idRelacionado) {
        fila.idRelacionado = idRelacionado
        let _hallazgos = registroodonto.value.find(item => item.id === idRelacionado)?.hallazgos;
        fila.especificaciones = registroodonto.value.find(item => item.id === idRelacionado)?.especificaciones;
        fila.observaciones = registroodonto.value.find(item => item.id === idRelacionado)?.observaciones;
        fila.receta = registroodonto.value.find(item => item.id === idRelacionado)?.receta;
        if (_hallazgos) {
            fila.hallazgos = _hallazgos;
        }
    }
    const referencia = collection(firestore, 'odontograma')
    return addDoc(referencia, fila).then((docRef) => {
        item?.value.idRelacionados
            ? item.value.idRelacionados.push(docRef.id)
            : item.value.idRelacionados = [docRef.id]
        return resolve(docRef.id)
    })

})

export const guardarEnDiccionario = (e) => {
    var palabras = {
        e,
        fecha: new Date().toISOString().slice(0, 10),
        userId: miUsuario()?.uid,
        odontograma: route.currentRoute.value.params.idOdontograma,
        nombre: itemUsuario.value.nombre + ' ' + itemUsuario.value.apellidoPaterno + ' ' + itemUsuario.value.apellidoMaterno
    }
    const referencia = collection(firestore, 'diccionario')
    return addDoc(referencia, palabras)
}

//export const actualizarestado = (id, estado) => updateDoc(doc(firestore, 'odontograma', id), {estado})

export const actualizarTratamiento = (id, tieneTratamiento) => {
    var itemUpd = {
        id: id,
        tieneTratamiento: tieneTratamiento
    }
    const referencia = doc(firestore, 'odontograma', id)
    return updateDoc(referencia, itemUpd)
}
export const actualizar = (id) => {
    const referencia = doc(firestore, 'odontograma', id)
    return updateDoc(referencia, item.value)
}
function dienteConSiglas(lista, diente) {
    const filtro = lista.filter(item => item.diente == diente && item.sigla != '')
    return filtro.length;
}
export function existeDiente(diente, fila) {
    let result = false;
    let lista = (item.value.hallazgos != undefined) ? item.value.hallazgos : [];
    for (let item of lista) {
        const hzgoMatriz = listaDeHallazgos.filter((elem) => elem.value == fila.hallazgo);
        if (hzgoMatriz.length > 0) {
            if (hzgoMatriz[0]?.esDirecto == "SI") {
                if (item.diente == diente && item.hallazgo == fila.hallazgo && item.sigla == fila.sigla) {
                    if (isSpeech.value)
                        speak('pieza ' + diente + ' ya existe en el odontograma, no se puede registrar como Hallazgo: ' + fila.descripcion)
                    else
                        mensajeExistePieza.value = 'Pieza: ' + diente + ', ya existe en el odontograma, no se puede registrar como Hallazgo: ' + fila.descripcion
                    result = true;
                    break;
                }
                else if (item.diente == diente && item.hallazgo == fila.hallazgo) {
                    if (isSpeech.value)
                        speak('pieza ' + diente + ' ya existe en el odontograma, no se puede registrar como Hallazgo: ' + fila.descripcion)
                    else
                        mensajeExistePieza.value = 'Pieza: ' + diente + ', ya existe en el odontograma, no se puede registrar como Hallazgo: ' + fila.descripcion
                    result = true;
                    break;
                }
            }
            else {
                if (item.diente == diente && item.hallazgo == fila.hallazgo && item.ubicacion == fila.ubicacion && item.posicion == fila.posicion) {
                    if (isSpeech.value)
                        speak('pieza ' + diente + ' hallazgo ' + fila.descripcion + ' y ubicación ' + fila.ubicacion + ' ya existe en el odontograma')
                    else
                        mensajeExistePieza.value = 'Pieza: ' + diente + ', Hallazgo: ' + fila.descripcion + ', Ubicación: ' + fila.ubicacion + ', ya existe en el odontograma'
                    result = true;
                    break;
                }
                else if (item.diente == diente && item.hallazgo == fila.hallazgo && item.ubicacion == fila.ubicacion) {
                    if (isSpeech.value)
                        speak('pieza ' + diente + ' ya existe en el odontograma, no se puede registrar como Hallazgo: ' + fila.descripcion)
                    else
                        mensajeExistePieza.value = 'Pieza: ' + diente + ', ya existe en el odontograma, no se puede registrar como Hallazgo: ' + fila.descripcion
                    result = true;
                    break;
                }
            }
        }
    }
    return result;
}

export function agregarLista(id, param) {
    mensajeExistePieza.value = '';
    if (param.hallazgos.length > 0) {
        param.hallazgos.forEach(element => {
            const existeHallazgo = listaDeHallazgos.filter((elem) => elem.value == element.hallazgo)[0];
            if (existeHallazgo != undefined) {
                let fila = {
                    diente: element.diente,
                    hallazgo: element.hallazgo,
                    ubicacion: element.ubicacion,
                    sigla: element.sigla,
                    posicion: element.posicion,
                    fechaHallazgo: new Date(),
                    dienteAlterno: element.dienteAlterno,
                    descripcion: element.descripcion
                }
                if (param.diente != '') {
                    if (existeHallazgo?.Combinado == "SI") {
                        item.value.hallazgos ? item.value.hallazgos.push(fila) : item.value.hallazgos = [fila];
                    }
                    else {
                        if (!existeDiente(element.diente, fila)) {
                            item.value.hallazgos ? item.value.hallazgos.push(fila) : item.value.hallazgos = [fila];
                        }
                    }
                }
            }
        });
        actualizarDetalle(id, item.value.hallazgos)

    }
}

export const validaDoble = (item) => {
    const hzgoMatriz = listaDeHallazgos.filter((elem) => elem.value == item.hallazgo);
    if (hzgoMatriz.length > 0) {
        if (hzgoMatriz[0]?.esDirecto == "SI" && hzgoMatriz[0]?.EsMultiple == "SI" && hzgoMatriz[0]?.DobleD == "DD") {
            let _dienteSelect1 = listaDeDientesCombo.filter((elem) => elem.value == item.diente);
            let _dienteSelect2 = listaDeDientesCombo.filter((elem) => elem.value == item.dienteAlterno);
            if (_dienteSelect1.length > 0 && _dienteSelect2.length > 0) {
                let indice1 = (_dienteSelect1[0]?.indice > _dienteSelect2[0]?.indice) ? _dienteSelect2[0]?.indice : _dienteSelect1[0]?.indice;
                let indice2 = (_dienteSelect2[0]?.indice > _dienteSelect1[0]?.indice) ? _dienteSelect2[0]?.indice : _dienteSelect1[0]?.indice;
                let diferencia = indice2 - indice1
                if (diferencia > 1) {
                    return false
                }
            }
        }
    }
    return true
}
export const actualizarDetalle = (id, Hallazgos) => {
    let hallazgosOrder = Hallazgos.sort(function (a, b) {
        //console.log(b.fechaHallazgo-a.fechaHallazgo)
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
    const diagnosticos = registroodonto.value.filter((elem) => elem.tipo == "Diagnóstico" && elem.id != id);
    let maxValueOfOrder = Math.max(...diagnosticos.map(o => o.order));
    //for (const item of diagnosticos) {
    //if (maxValueOfOrder === item.order) {
    //    actualizarestado(item.id, '2');
    //}
    //}

    const referencia = doc(firestore, 'odontograma', id)
    return deleteDoc(referencia)
}

const registroodonto = ref([])

const registro_ = computed(() => registroodonto.value)
const obtenerTodos = (idPaciente) => {
    const referencia = query(
        collection(firestore, 'odontograma'),
        where("idPaciente", "==", idPaciente),
        orderBy("fechaRegistro", "desc")
    )
    return onSnapshot(
        referencia,
        collection => {
            let r = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            r = r.map((item, index) => {
                return ({
                    ...item,
                    idRelacionados: r.filter(item_ => {
                        return item_.idRelacionado == item.id
                    })?.map(_item => _item.id) || [],
                    estado: index == 0 || (index == 1 && item.tipo == "Diagnóstico" && r[0].tipo == "Tratamiento") ? '2' : '1'
                })
            })
            registroodonto.value = r
        }
    )
}
export const registroodontoTodo = ref([]);

export const obtenerTodosOdo = (userId) => {
    const referencia = query(
      collection(firestore, "odontograma"),
      where("userId", "==", userId)
    );
    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(referencia, (snapshot) => {
        const odontogramas = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        registroodontoTodo.value = odontogramas
        resolve(registroodontoTodo.value)
      }, reject)
      onUnmounted(unsubscribe)
    });
};  

const leer = id => {
    const referencia = doc(firestore, 'odontograma', id)
    return getDoc(referencia).then(doc => item.value = doc.data())
}

export const leerOdonto = id => {
    const referencia = doc(firestore, 'odontograma', id)
    const registro = getDoc(referencia).then(doc => item.value = doc.data())
    if (registro.value != undefined)
        item.value = registro.value
}

const leerEnRegistro = id => {
    return item.value = registroodonto.value.find(item => item.id == id)
}
export const getItemEnRegistro = id => registroodonto.value.find(item => item.id == id)

export const obtenerPacienteOdontograma = (idPaciente, idOdontologo) => new Promise(resolve => {
    const referencia = collection(firestore, 'odontograma')
    return getDocs(query(referencia, where("idPaciente", "==", idPaciente), where("userId", "==", idOdontologo), where("tipo", "==", "Diagnóstico")))
        .then(coleccion => resolve(coleccion.docs.map(doc => doc.data())))
})

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
    leerEnRegistro,
    regpasciente
}
