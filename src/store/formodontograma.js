import { ref, computed } from 'vue';

import { addDoc, collection, onSnapshot, getDoc,getDocs, doc, updateDoc, deleteDoc, query, where, arrayUnion, orderBy } from 'firebase/firestore'
import { firestore } from '../config/firebase'
import { miUsuario } from './sesion';
import { listaDeHallazgos } from '../config/Parametros'
import { isSpeech, speak } from './odontograma'
import escenarios from '../config/Escenarios.json';
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
    idRelacionado: '',
})


const guardar = (idPaciente, tipo, papa, idRelacionado) => new Promise((resolve, reject) => {
    for (const item of registroodonto.value) {
        if (item.papa === 'No')
            actualizarPapa(item.id, 'Si');
    }
    for (const item of registroodonto.value) {
        if (tipo === 'Diagnóstico') {
            actualizarestado(item.id, '1');
        }
    }
    const fila = {
        tipo: tipo,
        especificaciones: '',
        observaciones: '',
        receta: '',
        fechaRegistro: new Date(),
        idPaciente,
        userId: miUsuario()?.uid,
        estado: (tipo == "Diagnóstico") ? "2" : "1",
        papa: papa,
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
        item.value.idRelacionados
            ? item.value.idRelacionados.push(docRef.id)
            : item.value.idRelacionados = [docRef.id]
        return resolve()
    })

})

export const actualizarestado = (id, estado) => {
    var itemUpd = {
        id: id,
        estado: estado
    }
    const referencia = doc(firestore, 'odontograma', id)
    return updateDoc(referencia, itemUpd)
}
export const actualizarPapa = (id, papa) => {
    var itemUpd = {
        id: id,
        papa: papa
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
                        speak('pieza ' + diente + ' ya existe en el odontograma, no se puede registrar como Hallazgo: ' + fila.hallazgo)
                    else
                        mensajeExistePieza.value = 'Pieza: ' + diente + ', ya existe en el odontograma, no se puede registrar como Hallazgo: ' + fila.hallazgo
                    result = true;
                    break;
                }
                else if (item.diente == diente && item.hallazgo != fila.hallazgo) {
                    if (isSpeech.value)
                        speak('pieza ' + diente + ' ya existe en el odontograma, no se puede registrar como Hallazgo: ' + fila.hallazgo)
                    else
                        mensajeExistePieza.value = 'Pieza: ' + diente + ', ya existe en el odontograma, no se puede registrar como Hallazgo: ' + fila.hallazgo
                    result = true;
                    break;
                }
            }
            else {
                if (item.diente == diente && item.hallazgo == fila.hallazgo && item.ubicacion == fila.ubicacion && item.posicion == fila.posicion) {
                    if (isSpeech.value)
                        speak('pieza ' + diente + ' hallazgo ' + fila.hallazgo + ' y ubicación ' + fila.ubicacion + ' ya existe en el odontograma')
                    else
                        mensajeExistePieza.value = 'Pieza: ' + diente + ', Hallazgo: ' + fila.hallazgo + ', Ubicación: ' + fila.ubicacion + ', ya existe en el odontograma'
                    result = true;
                    break;
                }
                else if (item.diente == diente && item.hallazgo != fila.hallazgo) {
                    if (isSpeech.value)
                        speak('pieza ' + diente + ' ya existe en el odontograma, no se puede registrar como Hallazgo: ' + fila.hallazgo)
                    else
                        mensajeExistePieza.value = 'Pieza: ' + diente + ', ya existe en el odontograma, no se puede registrar como Hallazgo: ' + fila.hallazgo
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
                }
                if (param.diente != '') {
                    if (!existeDiente(element.diente, fila)) {
                        item.value.hallazgos ? item.value.hallazgos.push(fila) : item.value.hallazgos = [fila];
                    }
                }
            }
        });
        actualizarDetalle(id, item.value.hallazgos)
    }
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
   const diagnosticos =registroodonto.value.filter((elem) => elem.tipo == "Diagnóstico" && elem.id !=id);
    let maxValueOfOrder = Math.max(...diagnosticos.map(o => o.order));
    for (const item of diagnosticos) {
        if (maxValueOfOrder === item.order) {
            actualizarestado(item.id, '2');
        }
    }

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
            r = r.map(item => {
                return ({
                    ...item, idRelacionados: r.filter(item_ => {
                        return item_.idRelacionado == item.id
                    })?.map(_item => _item.id) || []
                })
            })
            registroodonto.value = r
        }
    )
}

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

export const obtenerPacienteOdontograma = (idPaciente) => new Promise(resolve =>  {
    const referencia = collection(firestore, 'odontograma')
    return getDocs(query(referencia, where("idPaciente", "==", idPaciente),where("tipo", "==", "Tratamiento"),where("estado", "==", "2")))
    .then(coleccion => resolve(coleccion.docs.map( doc => doc.data())))
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