<script setup>
import { onMounted,onUnmounted } from "vue";
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
  agregarLista,
  isSpeech,
  escucharInicializarVoz,
  detenerInicializarVoz,
  item,
  textoEscuchado,
  listaDeDientes,
  listaDeHallazgos,
  listaDeDientesCombo,
  listaDeTipos
} from "../../store/odontograma";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const listaDiccionario = obtenerTodoDiccionario();
const listaPieza = obtenerTodoPieza();
const listaHallazgo = obtenerTodoHallazgo();
const listaCaries = obtenerTodoCaries();
const {push} = useRouter()

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

/*
 select.form-select#comboTipoHallazgo
                            option(selected disabled) Tipo hallazgo
                            option(v-for='{text, value} of listaDeTipos' :value="value") {{text}}
               
*/
</script>

<template lang="pug">
p {{textoEscuchado}}
#button-microfono             
    MicroButton( style='--size: 4rem; text-align: center;' :class="{active: isSpeech}" @click="isSpeech ? detenerVoz() : activarVoz()")
     h1.ms-1.mt-2.light-text Quiru 
.row
    .col
        input#tipoReg(type="hidden", value="0")
        .input-group
            select.form-select#comboHallazgo( v-model='')
                option(selected disabled) Hallazgo
                option(v-for='{text, value} of listaDeHallazgos' :value="value") {{text}}
          
            select.form-select#comboPieza
                option(selected disabled) Pieza
                option(v-for='{text, value} of listaDeDientesCombo' :value="value") {{text}}           
.row
  .col
  .col
  .col
    Diente(:item='item' style='') 
  .col
  .col
  .col
.row
    .col
        button.btn.btn-primary(type="submit", @click="agregarLista(route.params.idOdontograma)") Agregar a la lista

</template>
