<script setup>
import { onMounted, onUnmounted, watch, computed } from "vue";
import OdonOficial from "./2.impresion.vue";
import { limpiarSinVoz } from "../../store/comandosDeVoz";
import { obtenerTodoDiccionario, obtenerTodoPieza, obtenerTodoHallazgo, obtenerTodoCaries, } from "../../store/odonto";
import { detenerVoz, activarVoz, isSpeech, escucharInicializarVoz, Hallazgo, item, paginaOdontograma, textoEscuchado, resizeWindow, } from "../../store/odontograma";
import { actualizarDetalle, leerEnRegistro, item as itemodontograma, agregarLista, mensajeExistePieza, getItemEnRegistro, validaDoble } from '../../store/formodontograma';
import { VerFormato } from "../../store/Canvas";
import { useRoute, useRouter } from "vue-router";
import { previousPage, nextPage, setList, registro_ as _hallazgos, setListDelete, SetPage } from "../../config/Paginator";
import { listaDeDientesCombo, listaDeHallazgos as _Hallazgos } from '../../config/Parametros';
import '../../assets/annyang.min'

const route = useRoute();
const listaDiccionario = obtenerTodoDiccionario();
const listaPieza = obtenerTodoPieza();
const listaHallazgo = obtenerTodoHallazgo();
const listaCaries = obtenerTodoCaries();
const { push } = useRouter()
leerEnRegistro(route.params.idOdontograma);
escucharInicializarVoz();
let temList = [];
let wakeLock = null;
console.log(route.params)
const listaDeHallazgos = computed ( ()=> {
  return _Hallazgos.filter(i => i.tipo == route.params.tipoOdonto).map(({ text, value }) => ({ text, value }))
})
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
    VerFormato((itemodontograma.value?.hallazgos?.length > 0) ? itemodontograma.value?.hallazgos : [])
    setList((itemodontograma.value?.hallazgos?.length > 0) ? itemodontograma.value?.hallazgos : [], 1);
    limpiarSinVoz()
  },
  { deep: true }
)
watch(
  () => {
    if (mensajeExistePieza.value != '') {
      let mensaje = document.getElementById('mensaje');
      mensaje.innerText = mensajeExistePieza.value;
      mensaje.style.display = "block"
    }
  }
)
const borrar = ({ diente, hallazgo, ubicacion }) => {
  const index = itemodontograma.value?.hallazgos?.findIndex(i => i.diente == diente && i.hallazgo == hallazgo && i.ubicacion == ubicacion)
  if (index > -1) {
    itemodontograma.value?.hallazgos.splice(index, 1)
    actualizarDetalle(itemodontograma.value.id, (itemodontograma.value?.hallazgos.length > 0) ? itemodontograma.value?.hallazgos : [])
    setListDelete((itemodontograma.value?.hallazgos.length > 0) ? itemodontograma?.value?.hallazgos : []);
  }
}
function changeHallazgoDiente() {
  let mensaje = document.getElementById('mensaje');
  mensaje.innerText = '';
  mensaje.style.display = "none"
}
function limpiarHallazgoDiente() {
  let mensaje = document.getElementById('mensaje');
  mensaje.innerText = '';
  mensaje.style.display = "none"
  limpiarSinVoz();
}
function ordenarAsc(listado, p_key) {
  listado.sort(function (a, b) {
    return b[p_key] - a[p_key];
  });
}
function ordenarDesc(listado, p_key) {
  ordenarAsc(listado, p_key);
  return listado.reverse();
}
watch(
  () => annyang.isListening(),
  () => {
    annyang.start({ autoRestart: true });
  }

)
watch(
  () => {
    resizeWindow.value = window.innerWidth
    window.addEventListener('resize', function () {
      resizeWindow.value = window.innerWidth
    });
  }
)
function AgregarHallazgo() {
  if (comboHallazgo.value != '' && comboPieza.value != '') {
    const hzgoMatriz = _Hallazgos.filter((elem) => elem.text == comboHallazgo.value);
    if (hzgoMatriz.length > 0) {
      if (hzgoMatriz[0]?.esDirecto == "SI" && hzgoMatriz[0]?.Replicable_Intermedio != "RE") {
        let fila = {
          diente: comboPieza.value,
          hallazgo: hzgoMatriz[0]?.value, ubicacion: "",
          sigla: hzgoMatriz[0]?.sigla, posicion: "",
          dienteAlterno: comboPiezaAl.value
        }
        if (!validaDoble(fila)) {
          mensajeExistePieza.value = 'No se puede registrar este hallazgo para más de 2 dientes'
          return false
        }
        item.value.hallazgos.push({
          diente: comboPieza.value,
          hallazgo: hzgoMatriz[0]?.value,
          ubicacion: "", sigla: hzgoMatriz[0]?.sigla, posicion: "", dienteAlterno: comboPiezaAl.value,
          descripcion: hzgoMatriz[0]?.text
        })
      };
      if (hzgoMatriz[0]?.esDirecto == "SI" && hzgoMatriz[0]?.EsMultiple == "SI" && hzgoMatriz[0]?.Replicable_Intermedio == "RE") {
        const _dienteSelect = listaDeDientesCombo.filter((elem) => elem.value == comboPieza.value);
        let dienteAlterno = listaDeDientesCombo.filter((elem) => elem.value == comboPiezaAl.value);
        let dientesReplicables = listaDeDientesCombo.filter((elem) => elem.grupo == _dienteSelect[0]?.grupo && elem.indice >= _dienteSelect[0]?.indice && elem.indice <= dienteAlterno[0]?.indice);
        dientesReplicables.forEach(element => {
          item.value.hallazgos.push({
            diente: element.value,
            hallazgo: hzgoMatriz[0]?.value,
            ubicacion: "",
            sigla: hzgoMatriz[0]?.sigla,
            posicion: "",
            dienteAlterno: "",
            descripcion: hzgoMatriz[0]?.text
          })
        })
      }
    }
  }
  var VistaDiente = document.getElementById("VistaDiente");
  var PiezaAl = document.getElementById("comboPiezaAl");
  var spanPiezaAl = document.getElementById("spanPiezaAl");
  VistaDiente.style.display = "none"
  PiezaAl.style.display = "none"
  spanPiezaAl.style.display = "none"

  agregarLista(route.params.idOdontograma, item.value);
}
function ListaAlterna(seleccionado) {
  let grupo = listaDeDientesCombo.filter((elem) => elem.value == seleccionado);
  if (grupo.length == 0) return false;
  let ListaDientesAlternos = listaDeDientesCombo.filter((elem) => elem.grupo == grupo[0].grupo);
  let str = "";
  ListaDientesAlternos.forEach(element => {
    if (element.indice > grupo[0].indice) {
      str += '<option value="' + element.value + '" />';
    }
  });
  var my_list = document.getElementById("listaDeDientesAl");
  my_list.innerHTML = str;
}
function VisibleDiente() {
  const hzgoMatriz = _Hallazgos.filter((elem) => elem.value == comboHallazgo.value);
  var VistaDiente = document.getElementById("VistaDiente");
  var PiezaAl = document.getElementById("comboPiezaAl");
  var spanPiezaAl = document.getElementById("spanPiezaAl");
  if (hzgoMatriz.length > 0) {
    if (hzgoMatriz[0]?.esDirecto == "SI") {
      VistaDiente.style.display = "none"
      if (hzgoMatriz[0]?.EsMultiple == "SI") {
        PiezaAl.style.display = "block";
        spanPiezaAl.style.display = "block"
      }
      else {
        PiezaAl.style.display = "none";
        spanPiezaAl.style.display = "none"
      }
    }
    else {
      VistaDiente.style.display = "block"
    }
  }
  else {
    PiezaAl.style.display = "none";
    spanPiezaAl.style.display = "none"
  }
}
const idRelacionados_ = computed((() => id => getItemEnRegistro(id)?.idRelacionados))
</script>

<template lang="pug">
.row(:hidden="itemodontograma?.estado === '1'")
  p {{ textoEscuchado }}
.contenedor(:hidden="itemodontograma?.estado === '1' ")
  .anim(v-if='isSpeech')
  .microfono( @click="isSpeech ? detenerVoz() : activarVoz()" )
    ion-icon.icono(name="mic" )

//-Input sin micrófono
.row.mt-3
  .col(:hidden="itemodontograma?.estado === '1'")
    .row
      .col.d-flex(v-if="!isSpeech").inputs-manual
        input#tipoReg(type="hidden", value="0")
        span.input-group-text.m-1(style="padding: .01rem .01rem .01rem .6rem;") Pieza :
          input.form-control#comboPieza(list='listaDeDientes', name='comboPieza', v-model='item.diente', v-on:change="ListaAlterna(item.diente)")
          datalist#listaDeDientes
            option(v-for='{ value } of listaDeDientesCombo' :value="value")
          span#spanPiezaAl(style="display: none;") a la pieza :
          input.form-control#comboPiezaAl(style="display: none;",list='listaDeDientesAl', name='comboPieza', v-model='item.dienteAlterno')
          datalist#listaDeDientesAl
        span.input-group-text.m-1(style="padding: .01rem .01rem .01rem .6rem;") Hallazgo :
          input.form-control#comboHallazgo(list='listaDeHallazgos', name='comboHallazgo', v-model='Hallazgo', v-on:change="VisibleDiente()")
          datalist#listaDeHallazgos
            option(v-for='{ text } of listaDeHallazgos' :value="text")

    .row#VistaDiente(style="display: none;")
      .col.d-flex.justify-content-center
        Diente(:item='item' style='--size: 12rem;').raiz-0
    .row.mt-2(v-if="!isSpeech")
      .col.d-flex.justify-content-center
        button.btn.btn-primary.m-1(type="submit", @click="AgregarHallazgo" style="width: 7rem;") Agregar
        button.btn.btn-primary.m-1(type="submit", @click="limpiarHallazgoDiente()" style="width: 7rem;") Limpiar
    .row.mt-2(v-if="!isSpeech")
    #mensaje.alert.alert-danger(style='display:none')
.col.mt-2.d-flex.justify-content.desplazable
  .col.d-flex.justify-content-center.item
    OdonOficial
  .col.item
    .card.card-body
      .div(style="background-color: white; border-radius: 2%;")
        table.table.table-hover
          thead
            tr
              th N°
              th Pieza
              th Hallazgo
              th Sigla
              th
          tbody
            tr(v-for="item of _hallazgos")
              td {{ item.fila }}
              td {{ item.diente }} {{ item.dienteAlterno !=""? " - " + item.dienteAlterno : ""}}
              td {{ item.descripcion }} {{ item.ubicacion }}
              td {{ item.sigla }}
              td
                BotonSeguro.mt-0( :onSuccess= '() => borrar(item)' :hidden="itemodontograma?.estado === '1' && !itemodontograma.idRelacionado")
                  i.fa.fa-trash-o(aria-hidden='true')
        .div(v-if="itemodontograma?.hallazgos?.length > 8",style="text-align: center;")
          nav.d-flex.justify-content-center(aria-label='Page navigation example')
            ul.pagination
              li.page-item
                a.page-link(href='#', aria-label='Previous', @click="previousPage(itemodontograma.hallazgos)")
                  span(aria-hidden='true',style="font-size: 1rem; font-weight: bold;") &laquo;
              li.page-item(v-for="n in (Math.trunc(itemodontograma?.hallazgos?.length / 8) + (((itemodontograma?.hallazgos?.length % 8) > 0) ? 1 : 0))")
                a.page-link(href='#', @click='SetPage(itemodontograma.hallazgos, n)') {{ n }}
              li.page-item
                a.page-link(href='#', aria-label='Next', @click="nextPage(itemodontograma?.hallazgos)")
                  span(aria-hidden='true', style="font-size: 1rem; font-weight: bold;") &raquo;

</template>
<style lang="sass" scoped>
.desplazable
  display: flex
  flex-direction: row
  height: auto
  width: auto
  overflow: auto
  
  scroll-snap-type: x mandatory
  padding: 10px
  gap: 12px
  scroll-padding: 10px


  justify-content: start
  align-items: center
  padding-bottom: 40px
  &::-webkit-scrollbar-track 
    border-radius: 50px 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1) 
  &::-webkit-scrollbar-thumb 
    background-color: var(--color-primary) 
    outline: 1px solid var(--color-primary)
    border-radius: 50px 
  &::-webkit-scrollbar 
    width: 1em
    height: 10px
.item
  flex: 0 0 100%
  scroll-snap-align: start
  scroll-snap-stop: always
.contenedor
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  margin-top: 40px
  margin-bottom: 40px
  position: relative
  .microfono
    height: 110px
    width: 110px
    background-color: var(--color-primary)
    border-radius: 100%
    display: flex
    justify-content: center
    align-items: center
    position: relative
    z-index: 1
    .icono
      font-size: 60px
      color: var(--color-white)
  .anim
    content: ""
    height: 140px
    width: 140px
    background-color: var(--color-primary)
    opacity: .3
    position: absolute
    border-radius: 100%
    animation: palpitar 2s  infinite
    z-index: 0
  
@keyframes palpitar
  0%
    transform: scale(1)  
  50%  
    transform: scale(1.2)  
  100%
    transform: scale(1)  

@media (min-width: 800px)
  .desplazable
    display: flex
    flex-direction: row
    height: auto
    width: 100%
    overflow: hidden
    .item
      flex: 0 0 50%
      scroll-snap-align: start
      scroll-snap-stop: always
  .inputs-manual
    display: flex
    justify-content: center
    align-items: center
</style>