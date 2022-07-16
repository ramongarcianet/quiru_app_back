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
  registro_ as _hallazgos, setListDelete, SetPage
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
  paginaOdontograma.value = true;
  if ("wakeLock" in navigator) {
    try {
      wakeLock = navigator?.wakeLock.request("screen");
    } catch (err) {

    }
  } else {

  }
  setList(itemodontograma.value.hallazgos, 1);
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
    setList((itemodontograma.value?.hallazgos.length > 0) ? itemodontograma.value?.hallazgos : [], 1);
    limpiarSinVoz()
  },
  { deep: true }
)
const borrar = ({ diente, hallazgo, ubicacion }) => {
  const index = itemodontograma.value?.hallazgos?.findIndex(i => i.diente == diente && i.hallazgo == hallazgo && i.ubicacion == ubicacion)
  if (index > -1) {
    itemodontograma.value?.hallazgos.splice(index, 1)
    actualizarDetalle(itemodontograma.value.id, (itemodontograma.value?.hallazgos.length > 0) ? itemodontograma.value?.hallazgos : [])
    setListDelete((itemodontograma.value?.hallazgos.length > 0) ? itemodontograma.value?.hallazgos : []);
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
.row.mt-3
  .col
    .row
      .col.d-flex.justify-content-left(v-if="!isSpeech")
        input#tipoReg(type="hidden", value="0")
        span.input-group-text(style="padding: 0.01rem 0.01rem 0.01rem 1.01rem;") Pieza :
          input.form-control#comboPieza(list='listaDeDientes', name='comboPieza', v-model='item.diente')
          datalist#listaDeDientes
            option(selected disabled value="") Pieza
            option(v-for='{ text, value } of listaDeDientesCombo' :value="value")
        span.input-group-text(style="padding: 0.01rem 0.01rem 0.01rem 1.01rem;") Hallazgo :
          input.form-control#comboHallazgo(list='ListaHallazgos', name='comboHallazgo', v-model='Hallazgo')
          datalist#ListaHallazgos
            option(selected disabled value="") Hallazgo
            option(v-for='{ text, value } of listaDeHallazgos' :value="value")
    .row(v-if="!isSpeech")
      .col.d-flex.justify-content-center
        Diente(:item='item' style='--size: 10rem;').raiz-0
    .row.mt-2(v-if="!isSpeech")
      .col.d-flex.justify-content-center
        button.btn.btn-primary(type="submit", @click="agregarLista(route.params.idOdontograma, item)" style="width: 7rem;") Agregar
        button.btn.btn-primary(type="submit", @click="limpiarHallazgoDiente()" style="width: 7rem;") Limpiar
  .col.d-flex.justify-content-left(v-if="!isSpeech")
    OdonOficial
.row(v-if="isSpeech")
  .col.d-flex.justify-content-center
    OdonOficial
  .col
    .div(style="background-color: white; border-radius: 2%;")
      table.table.table-hover
        thead
          tr
            th Fila
            th Diente
            th Hallazgo
            th Ubicación
            th Sigla
            th
        tbody
          tr(v-for="item of _hallazgos")
            td {{ item.fila }}
            td {{ item.diente }}
            td {{ item.hallazgo }}
            td {{ item.ubicacion }}
            td {{ item.sigla }}
            td(width="25%")
              BotonSeguro( :onSuccess= '() => borrar(item)' )
                i.fa.fa-trash-o(aria-hidden='true')
      .div(v-if="itemodontograma.hallazgos?.length > 8",style="text-align: center;")
        nav.d-flex.justify-content-center(aria-label='Page navigation example')
          ul.pagination
            li.page-item
              a.page-link(href='#', aria-label='Previous', @click="previousPage(itemodontograma.hallazgos)")
                span(aria-hidden='true',style="font-size: 1rem; font-weight: bold;") &laquo;
            li.page-item(v-for="n in (Math.trunc(itemodontograma.hallazgos.length / 8) + (((itemodontograma.hallazgos.length % 8) > 0) ? 1 : 0))")
              a.page-link(href='#', @click='SetPage(itemodontograma.hallazgos, n)') {{ n }}
            li.page-item
              a.page-link(href='#', aria-label='Next', @click="nextPage(itemodontograma.hallazgos)")
                span(aria-hidden='true', style="font-size: 1rem; font-weight: bold;") &raquo;

.row.mt-2(v-if="!isSpeech")
  .col
    .div(style="background-color: white; border-radius: 2%;")
      table.table.table-hover
        thead
          tr
            th Fila
            th Diente
            th Hallazgo
            th Ubicación
            th Sigla
            th
        tbody
          tr(v-for="item of _hallazgos")
            td {{ item.fila }}
            td {{ item.diente }}
            td {{ item.hallazgo }}
            td {{ item.ubicacion }}
            td {{ item.sigla }}
            td(width="25%")
              BotonSeguro( :onSuccess= '() => borrar(item)' )
                i.fa.fa-trash-o(aria-hidden='true')
      .div(v-if="itemodontograma.hallazgos?.length > 8",style="text-align: center;")
        nav.d-flex.justify-content-center(aria-label='Page navigation example')
          ul.pagination
            li.page-item
              a.page-link(href='#', aria-label='Previous', @click="previousPage(itemodontograma.hallazgos)")
                span(aria-hidden='true',style="font-size: 1rem; font-weight: bold;") &laquo;
            li.page-item(v-for="n in (Math.trunc(itemodontograma.hallazgos.length / 8) + (((itemodontograma.hallazgos.length % 8) > 0) ? 1 : 0))")
              a.page-link(href='#', @click='SetPage(itemodontograma.hallazgos, n)') {{ n }}
            li.page-item
              a.page-link(href='#', aria-label='Next', @click="nextPage(itemodontograma.hallazgos)")
                span(aria-hidden='true', style="font-size: 1rem; font-weight: bold;") &raquo;

</template>
