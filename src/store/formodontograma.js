import { ref } from 'vue';

import {addDoc, collection, onSnapshot, getDoc, getFirestore, doc, updateDoc, deleteDoc, query, where} from 'firebase/firestore'
import {firestore} from '../config/firebase'
import { miUsuario } from './sesion';
import {limpiar as limpiarHallazgo,actualizarItem} from './comandosDeVoz';
import {listaDeHallazgos} from './odontograma'
const dialog = ref( false )
const regpasciente = ref([])

const item = ref ({
    tipo:'',
    especificaciones:'',
    observaciones:'',
    receta:'',
    fechaRegistro:new Date().toISOString().slice(0,10),
    userId: miUsuario()?.uid,
    hallazgos:[]
})


const guardar = (idPaciente, tipo,esUltimo,id) => {
    for (const item of registroodonto.value ){
        if (item.esultimo==='2')
            actualizarEsUltimo(item.id,'1');
        if (item.esultimo==='1')
            actualizarEsUltimo(item.id,'0');
    }
    const  fila = {
        tipo: tipo,
        especificaciones:'',
        observaciones:'',
        receta:'',
        fechaRegistro: new Date().toISOString().slice(0,10),
        idPaciente,
        userId: miUsuario()?.uid,
        esultimo: esUltimo,
        order: registroodonto.value.length + 1
    }
    if(id !='0')
    {
        let _hallazgos=registroodonto.value.find(item=>item.id===id)?.hallazgos;
        fila.especificaciones=registroodonto.value.find(item=>item.id===id)?.especificaciones;
        fila.observaciones=registroodonto.value.find(item=>item.id===id)?.observaciones;
        fila.receta=registroodonto.value.find(item=>item.id===id)?.receta;
        if(_hallazgos){
            fila.hallazgos=_hallazgos;
        }
    }
    const referencia = collection(firestore, 'odontograma')
    return addDoc(referencia, fila)
}
export const actualizarEsUltimo = (id,esUltimo) => {
    var itemUpd = {
          id:id,
          esultimo:esUltimo
      }
      const referencia = doc(firestore, 'odontograma', itemUpd.id)
      return updateDoc(referencia, itemUpd)
  }
export const actualizar = (id) => {
  var itemUpd = {
        id:id,
        especificaciones:inputDescription.value,
        observaciones:inputObservacion.value,
        receta:inputReceta.value
    }
    const referencia = doc(firestore, 'odontograma', itemUpd.id)
    return updateDoc(referencia, itemUpd)
}
function existeDiente(param){
    let result = false;
    let lista = item.value.hallazgos;
    for (let item of lista ){
        if (param.hallazgos[0].hallazgo == 'caries' || param.hallazgos[0].hallazgo == 'restauración'){
            if(item.diente==param.diente && item.hallazgo==param.hallazgos[0].hallazgo && item.ubicacion==param.hallazgos[0].ubicacion ){
                result = true;
                break;
            }
        } else {
            if (param.hallazgos[0].hallazgo == 'hipoplasia' || param.hallazgos[0].hallazgo == 'hipomineralizacion'||
            param.hallazgos[0].hallazgo == 'opacidad' || param.hallazgos[0].hallazgo == 'decoloración' || param.hallazgos[0].hallazgo == 'fluorosis')
            {
                if(item.diente==param.diente ){
                    let listaSigla = listaDeHallazgos.filter((elem)=>elem.value==item.hallazgo)
                    if(listaSigla.length>0){
                        if(listaSigla[0].sigla==''){
                            if(item.diente==param.diente && item.hallazgo==param.hallazgos[0].hallazgo){
                                result = true;
                                break;
                            }
                        } else {
                            result = true;
                            break;
                        }
                    }
                }
            } else {
                if(item.diente==param.diente && item.hallazgo==param.hallazgos[0].hallazgo){
                    result = true;
                    break;
                }
            }
        }
    }
    return result;
}
export function agregarLista(id,param,hallazgos) {
    if (param.hallazgos.length>0){
        if (!existeDiente(param)){
            const hallazgo = param.hallazgos[0].hallazgo
            if (hallazgo == 'caries' || hallazgo == 'restauración' ){
                param.hallazgos.forEach(element => {
                    let fila ={
                        diente:param.diente,
                        hallazgo:element.hallazgo,
                        ubicacion:element.ubicacion,
                        sigla:element.sigla,
                        posicion:element.posicion,
                        }
                        hallazgos?hallazgos.push(fila):hallazgos=[fila]
                });

            } else {
                param.hallazgos.forEach(element => {
                    let fila ={
                        diente:param.diente,
                        hallazgo:element.hallazgo,
                        ubicacion:'',
                        sigla:element.sigla,
                        posicion:element.posicion,
                        }
                        hallazgos?hallazgos.push(fila):hallazgos=[fila]
                });
            }
        }
        limpiarHallazgo();
    }
 }

export const actualizarDetalle = (id,Hallazgos) => {
    var itemUpd = {
          id:id,
          hallazgos:Hallazgos
      }
      const referencia = doc(firestore, 'odontograma', itemUpd.id)
      return updateDoc(referencia, itemUpd)
  }
const eliminar = (id) => {
    const ordenUltimo= registroodonto.value.length-1;
    if(ordenUltimo >0){
       const idOdontograma = registroodonto.value.find(item=>item.order===ordenUltimo)?.id;
       actualizarEsUltimo(idOdontograma,'2')
     }
     const ordenPenuultimo= registroodonto.value.length-2;
     if(ordenPenuultimo >0){
       const idOdontograma = registroodonto.value.find(item=>item.order===ordenPenuultimo)?.id;
       actualizarEsUltimo(idOdontograma,'1')
     }
     const referencia = doc(firestore, 'odontograma', id)
     return deleteDoc(referencia)
}

const registroodonto = ref([])

const obtenerTodos = (idPaciente) => {
    const referencia = collection(firestore, 'odontograma')
    const busqueda = query( referencia, where( "idPaciente", "==", idPaciente) )
    return onSnapshot(
        busqueda,
        collection => {
            registroodonto.value = collection.docs.map( doc => ({...doc.data(), id: doc.id }))
        }
    )
}

const leer = id => {
    const referencia = doc(firestore, 'odontograma', id)
    return getDoc( referencia ).then( doc => item.value = doc.data())
}

export const leerOdonto = id => {
    const referencia = doc(firestore, 'odontograma', id)
    const registro = getDoc( referencia ).then( doc => item.value = doc.data())
    if (registro.value != undefined)
        item.value = registro.value
}

const leerEnRegistro = id => {
    return item.value = registroodonto.value.find( item  => item.id == id )
}

const limpiar = ()=> {
    item.value = {
        tipo:'',
        especificaciones:'',
        observaciones:'',
        receta:'',
        fechaRegistro:new Date().toISOString().slice(0,10),
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