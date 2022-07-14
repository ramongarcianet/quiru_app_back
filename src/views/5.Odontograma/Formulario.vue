<script setup>
import { onMounted, onUnmounted, watch } from "vue";
import OdonOficial from "./2.impresion.vue";
import {
  limpiarSinVoz
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
  registro_,
  paginaOdontograma,
} from "../../store/odontograma";
import { actualizarDetalle, leerEnRegistro, item as itemodontograma, agregarLista } from '../../store/formodontograma';
import { VerFormato } from "../../store/OdontoJS";
import { useRoute, useRouter } from "vue-router";
import {
  previousPage,
  nextPage,
  setList,
  registro_ as _hallazgos
} from "../../config/Paginator";
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
  paginaOdontograma.value =true;
  if ("wakeLock" in navigator) {
    try {
      wakeLock = navigator?.wakeLock.request("screen");
    } catch (err) {

    }
  } else {

  }
  setList(itemodontograma.value.hallazgos);
})

onUnmounted(() => {
  detenerVoz();
  paginaOdontograma.value = false;

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
    VerFormato((itemodontograma.value?.hallazgos.length > 0) ? itemodontograma.value?.hallazgos : [])
    setList((itemodontograma.value?.hallazgos.length > 0) ? itemodontograma.value?.hallazgos : []);
    limpiarSinVoz()
  },
  { deep: true }
)
const borrar = ({ diente, hallazgo, ubicacion }) => {
  const index = itemodontograma.value?.hallazgos?.findIndex(i => i.diente == diente && i.hallazgo == hallazgo && i.ubicacion == ubicacion)
  if (index > -1) {
    itemodontograma.value.hallazgos.splice(index, 1)
    actualizarDetalle(itemodontograma.value.id, (itemodontograma.value?.hallazgos.length > 0) ? itemodontograma.value?.hallazgos : [])
  }
}

function limpiarHallazgoDiente() {
  limpiarSinVoz();
}
</script>

<template lang="pug">
.row
  .col
    .d-flex.align-content-start.flex-wrap
      i.fa.fa-tooth.me-2(style="color: #37DFBB; font-weight:bold; font-size: 1.5em;")
      h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Odontograma

.div(style='background-color: #37DFBB;width: 100px;height: 130px;margin-top: -145px;left:80%; position: absolute;z-index: 2;border-radius: 50% 50% 50% 50%;')
  #button-microfono
    MicroButton( style='--size: 4rem; position:absolute; z-index:3;left:18%; margin-top:57%' :class="{ active: isSpeech }" @click="isSpeech ? detenerVoz() : activarVoz()")
  .col
<!--p {{ textoEscuchado }}-->
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
  .col.mt-4
    button.btn.btn-primary(type="submit", @click="agregarLista(route.params.idOdontograma, item)") Agregar a la lista
  .col

.row
  .col
    .div(style="background-color: white; border-radius: 2%;")
      table.table.table-hover
        thead
          tr
            th Diente
            th Hallazgo
            th Ubicación
            th Sigla
            th
        tbody
          tr(v-for="item of _hallazgos")
            td {{ item.diente }}
            td {{ item.hallazgo }}
            td {{ item.ubicacion }}
            td {{ item.sigla }}
            td.dropdown
                    button.ms-auto.btn(@click="confirmar == false ? confirmar = true : borrar(item)") {{ confirmar ? '¿Está seguro?' : '' }}
                        i.fa.fa-trash-o(aria-hidden='true' style="color: black;")
      .div(style="text-align: center;")
        button#prevButton.btn.btn-primary(@click="previousPage(itemodontograma.hallazgos)")
          i.fa.fa-angle-double-left(aria-hidden='true' style="font-size: 1em; font-weight: bold; color: white;")
        button#nextButton.btn.btn-primary(@click="nextPage(itemodontograma.hallazgos)")
          i.fa.fa-angle-double-right(aria-hidden='true' style="font-size: 1em; font-weight: bold; color: white;")
</template>
