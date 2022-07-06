<script setup>
import { onMounted, onUnmounted, watch } from "vue";
import OdonOficial from "./2.impresion.vue";
import {
  limpiar
} from "../../store/comandosDeVoz";
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
  textoEscuchado,
  listaDeDientes,
  listaDeHallazgos,
  listaDeDientesCombo,
  listaDeTipos,
  Hallazgo,
  item,
  registro_
} from "../../store/odontograma";
import { actualizarDetalle, leerEnRegistro, item as itemodontograma, agregarLista } from '../../store/formodontograma';
import { VerFormato } from "../../store/OdontoJS";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const listaDiccionario = obtenerTodoDiccionario();
const listaPieza = obtenerTodoPieza();
const listaHallazgo = obtenerTodoHallazgo();
const listaCaries = obtenerTodoCaries();
const { push } = useRouter()
leerEnRegistro(route.params.idOdontograma);
escucharInicializarVoz();

let wakeLock = null;
onMounted(() => {
  if ("wakeLock" in navigator) {
    try {
      wakeLock = navigator?.wakeLock.request("screen");
    } catch (err) {

    }
  } else {

  }
})

onUnmounted(() => {
  detenerVoz()
})
watch(
  () => item.value.diente,
  () => {
    item.value.hallazgos = [];
    Hallazgo.value = "";
  }

)
watch(
  () => itemodontograma.value?.hallazgos,
  (registro) => {
    let idOdontograma = route.params.idOdontograma
    if (idOdontograma)
      if (item.diente != undefined)
        if (Hallazgo.value != '')
          actualizarDetalle(idOdontograma, registro)
    VerFormato(itemodontograma.value.hallazgos)
    limpiar()
  },
  { deep: true }
)
const borrar = ({ diente, hallazgo, ubicacion }) => {
  const index = itemodontograma.value.hallazgos.findIndex(i => i.diente == diente && i.hallazgo == hallazgo && i.ubicacion == ubicacion)
  if (index > -1) itemodontograma.value.hallazgos.splice(index, 1)
}

function limpiarHallazgoDiente() {
  limpiar();
}
</script>

<template lang="pug">
.row
  .col
    h2 Odontograma
  .col
.div(style='background-color: #37DFBB;width: 100px;height: 130px;margin-top: -145px;left:80%; position: absolute;z-index: 2;border-radius: 50% 50% 50% 50%;')
  #button-microfono
    MicroButton( style='--size: 4rem; position:absolute; z-index:3;left:18%; margin-top:57%' :class="{ active: isSpeech }" @click="isSpeech ? detenerVoz() : activarVoz()")
  p( style='position:absolute; z-index:4;left:30%; margin-top:110%; color:white;  font-weight: bold; font-size:12px;') QUIRU
  .col
p {{ textoEscuchado }}
.row
  .col
    .row
      .col
        input#tipoReg(type="hidden", value="0")

        .input-group
          span.input-group-text Pieza
          select.form-select#comboPieza(v-model='item.diente')
            option(selected disabled value="00") Pieza
            option(v-for='{ text, value } of listaDeDientesCombo' :value="value") {{ text }}
          span.input-group-text Hallazgo
          select.form-select#comboHallazgo(v-model='Hallazgo')
            option(selected disabled value="") Hallazgo
            option(v-for='{ text, value } of listaDeHallazgos' :value="value") {{ text }}
    .d-flex.justify-content-center
      Diente(:item='item' style='--size: 14rem;').raiz-0
    .row(v-if="!isSpeech")
      .col
      .col
        button.btn.btn-primary(type="submit", @click="limpiarHallazgoDiente()" style="width: 100%;") Limpiar
      .col
    .row(v-if="isSpeech")
      OdonOficial
  .col(v-if="!isSpeech")
    OdonOficial
.row
  .col
    button.btn.btn-primary(type="submit", @click="agregarLista(route.params.idOdontograma, item)") Agregar a la lista
  .col

.row
  .col
    table.table.table-striped.table-light
      thead
        tr
          th Diente
          th Hallazgo
          th Ubicación
          th Sigla
          th
      tbody
        tr(v-for="item of itemodontograma.hallazgos")
          td {{ item.diente }}
          td {{ item.hallazgo }}
          td {{ item.ubicacion }}
          td {{ item.sigla }}
          td
            button(@click="borrar(item)").btn.btn-primary Borrar
</template>
