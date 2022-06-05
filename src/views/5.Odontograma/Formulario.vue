<script setup>
import { onMounted,onUnmounted,watch } from "vue";
import {
  DienteCaries,
  ChangeHallazgo,
} from "../../store/OdontoJS";
import {
  obtenerTodoDiccionario,
  obtenerTodoPieza,
  obtenerTodoHallazgo,
  obtenerTodoCaries,
} from "../../store/odonto";
import {
  detenerVoz,
  activarVoz,
  isSpeech,
  escucharInicializarVoz,
  detenerInicializarVoz,
  item,
  textoEscuchado,
  listaDeDientes,
  listaDeHallazgos,
  listaDeDientesCombo,
  listaDeTipos,
  Hallazgo,
  registro_
} from "../../store/odontograma";
import {actualizarDetalle,leerEnRegistro,item as itemodontograma,agregarLista} from '../../store/formodontograma';

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const listaDiccionario = obtenerTodoDiccionario();
const listaPieza = obtenerTodoPieza();
const listaHallazgo = obtenerTodoHallazgo();
const listaCaries = obtenerTodoCaries();
const {push} = useRouter()
leerEnRegistro(route.params.idOdontograma);
escucharInicializarVoz();

let wakeLock = null;
onMounted(()=> {
  if ("wakeLock" in navigator) {
    try {
      wakeLock = navigator?.wakeLock.request("screen");
    } catch (err) {
      console.log(`${err.name}, ${err.message}`);
    }
  } else {
    console.log('wakeLock'+ false);
  }
})

onUnmounted(()=> {
  detenerVoz()
})
watch(
  ()=> item.value.diente,
  ()=>  {
    item.value.hallazgos=[]
    Hallazgo.value=""
  }
  
)
watch(
  ()=> itemodontograma.value.hallazgos,
  (registro)=>  {
    let idOdontograma= route.params.idOdontograma
    if(idOdontograma) actualizarDetalle(idOdontograma, registro)
  },
  { deep: true }
)
const borrar = ({diente, hallazgo, ubicacion}) => {
  const index = itemodontograma.value.hallazgos.findIndex(i => i.diente == diente && i.hallazgo == hallazgo && i.ubicacion == ubicacion)
  if( index > -1) itemodontograma.value.hallazgos.splice(index, 1)
}
console.log(registro_)
</script>

<template lang="pug">
p {{textoEscuchado}}
#button-microfono             
    MicroButton( style='--size: 4rem; text-align: center;' :class="{active: isSpeech}" @click="isSpeech ? detenerVoz() : activarVoz()")
    h1.ms-1.mt-2.light-text Quiru 
.row
  .col
    .row
        .col
            input#tipoReg(type="hidden", value="0")

            .input-group
                span.input-group-text Pieza 
                select.form-select#comboPieza(v-model='item.diente')
                    option(selected disabled value="00") Pieza
                    option(v-for='{text, value} of listaDeDientesCombo' :value="value") {{text}}
                span.input-group-text Hallazgo
                select.form-select#comboHallazgo(v-model='Hallazgo')
                    option(selected disabled value="") Hallazgo
                    option(v-for='{text, value} of listaDeHallazgos' :value="value") {{text}}                  
    .d-flex.justify-content-center
        Diente(:item='item').raiz-0 
  .col
    Odontograma( :registro='registro_')
.row
    .col
      button.btn.btn-primary(type="submit", @click="agregarLista(route.params.idOdontograma,item,itemodontograma.hallazgos)") Agregar a la lista
.row
  .col
    table.table.table-striped.table-light
      thead 
        tr 
          th Diente
          th Hallazgo
          th Ubicación
          th
      tbody
        tr(v-for="item of itemodontograma.hallazgos")
          td {{item.diente}}
          td {{item.hallazgo}}
          td {{item.ubicacion}}
          td 
            button(@click="borrar(item)").btn.btn-primary Borrar
</template>
