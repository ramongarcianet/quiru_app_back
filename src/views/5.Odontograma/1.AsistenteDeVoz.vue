<script setup>
import Formulario from "./Formulario.vue";
import { registroodonto, guardar as guardarOdontograma, getItemEnRegistro } from "../../store/formodontograma";
import { item as itemPas, leer, actualizar } from "../../store/paciente";
import { useRoute, useRouter } from "vue-router";
import { activarVoz, isSpeech } from "../../store/odontograma";
import Cie10 from '../../config/Cie10.json';
import { leerEnRegistro as ObtenerOdontograma, item as itemodontograma, eliminar } from '../../store/formodontograma';
import jsPDF from 'jsPDF'
import Instrucciones from "./../8.Ayuda/instrucciones.vue";
import { watch, ref, computed } from "vue";
import { item } from "../../store/usuario";
import MicroButtonVue from "../../components/MicroButton.vue";
import autoTable from 'jspdf-autotable'
const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')
const route = useRoute()
const { back, push } = useRouter();
const itemSeleccionado = ref({})
let canvas;
let canvas_image_data;
if (route.params.idPaciente) {
  leer(route.params.idPaciente)
}
//oncreated
if (route.params.idOdontograma) {
  ObtenerOdontograma(route.params.idOdontograma);
}
//onwatch
watch(
  () => route.params.idOdontograma,
  () => ObtenerOdontograma(route.params.idOdontograma),
)

function printOdontograma() {
  var pdf = new jsPDF()
  canvas = document.getElementById('myCanvas');
  canvas_image_data = canvas.toDataURL();
  let posis = 37;
  let posis1 = 0;
  if (itemodontograma.value?.hallazgos != undefined) {


    pdf.html("", {
      callback: function (pdf) {
        pdf.setFontSize(17);
        pdf.setFont(undefined, 'bold')
        pdf.text(30, 20, 'FICHA DE IDENTIFICACIÓN SANITARIA/ FICHA DENTAL');
        pdf.setFont(undefined, 'normal')
        pdf.setFontSize(12);
        pdf.text(10, 30, pad('NOMBRE : ' + itemPas.value.nombre, 80, ' ') + pad('APELLIDOS : ' + itemPas.value.apellidoPaterno + ' ' + itemPas.value.apellidoMaterno, 90, ' '));
        pdf.text(10, 37, pad('FECH. NAC: ' + itemPas.value.fechaNacimiento, 80, ' ') + pad('TIM/DNI : ' + itemPas.value.numeroDocumento, 90, ' '));
        pdf.text(10, 44, pad('DIRECCIÓN : ' + itemPas.value.Direccion, 180, ' '));
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold')
        pdf.text(80, 55, 'ODONTOGRAMA');
        pdf.setFont(undefined, 'normal')
        pdf.setFontSize(12);
        pdf.addImage(canvas_image_data, 'JPEG', 30, 55, 140, 140)
        pdf.insertPage();
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold')
        pdf.text(10, 20, 'DIAGNÓSTICO');
        pdf.setFont(undefined, 'normal')
        pdf.setFontSize(12);
        let _body = [];
        itemodontograma.value.hallazgos.forEach(_item => {
          let alterno = _item.dienteAlterno
          let sigla = _item.sigla
          let ubicacion = _item.ubicacion
          if (alterno) alterno = ' - ' + alterno.toString()
          if (ubicacion) ubicacion = ' - ' + ubicacion;
          if (sigla) sigla = ' (' + sigla + ')';
          _body.push([ _item.diente + alterno, _item.descripcion + ubicacion + sigla])
        })
        var headerOptions = {
          fillColor: '#e8fffa',
          textColor: '#395d56'
        };
        var startX = 10;
        var startY = 25;
        autoTable(pdf, {
          head: [['Pieza(s)', 'Diagnóstico']],
          body: _body,
          startX: startX,
          startY: startY,
          didParseCell: function (data) {
            if (data.section === 'head') {
              data.cell.styles.fillColor = headerOptions.fillColor;
              data.cell.styles.textColor = headerOptions.textColor;
            }
          }
        })
        let _bodyPlant = [];

        itemodontograma.value.planTrata.forEach(_item => {
          let _tratamien = "";
          let fila = 1;
          let filas = _item.Tratamiento.length;
          _item.Tratamiento.forEach(subitem => {
            _tratamien = _tratamien + fila + '.- ' + subitem.Tratamiento.label + ' (' + subitem.Fecha + ')';
            if (fila < filas) {
              _tratamien = _tratamien + '),\n'
            }
            fila = fila + 1;
          })
          _bodyPlant.push([_item.Pieza, _item.Diagnostico, _tratamien])
        })
        startX = 10;
        startY = 40 + (itemodontograma.value.hallazgos.length * 8);
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold')
        pdf.text(10, startY, 'PLAN DE TRATAMIENTO');
        pdf.setFont(undefined, 'normal')
        pdf.setFontSize(12);
        startY = startY + 5;
        autoTable(pdf, {
          head: [['Pieza(s)', 'Diagnóstico', 'Tratamiento(s)']],
          body: _bodyPlant,
          startX: startX,
          startY: startY,
          didParseCell: function (data) {
            if (data.section === 'head') {
              data.cell.styles.fillColor = headerOptions.fillColor;
              data.cell.styles.textColor = headerOptions.textColor;
            }
          }
        })

        var pdfName = itemPas.value.numeroDocumento
        pdf.save(pdfName + '.pdf');
      }
    });
  }
  else {
    var alerta = document.getElementById("alerta");
    alerta.style.display = "block";
  }
}
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : n + new Array(width - n.length + 1).join(z);
}
function CallConfirm2(item) {
  itemSeleccionado.value = item;
  var modal = document.getElementById('id02');
  modal.style.display = 'block';
}
function EliminarOdonto() {
  var alerto = document.getElementById("alerto");
  var modal = document.getElementById('id02');
  if (!itemSeleccionado.value?.hallazgos || itemSeleccionado.value?.hallazgos.length == 0) {
    alerto.style.display = "none";
    modal.style.display = 'none';
    eliminar(itemSeleccionado.value.id)
    push({ name: 'pacienteVer', params: { idPaciente: route.params.idPaciente } })
  }
  else {
    alerto.style.display = "block";
    modal.style.display = 'none';

  }
}
function Cancelar() {
  var alerto = document.getElementById("alerto");
  var alerta = document.getElementById("alerta");
  var modal = document.getElementById('id02');
  alerto.style.display = "none";
  modal.style.display = 'none';
  alerta.style.display = "none";
}
function guardar_(var1, var2, var3, var4) {
  guardarOdontograma(var1, var2, var3, var4).then(idTratamiento => push({ name: 'Detalle', params: { idOdontograma: idTratamiento, idPaciente: route.params.idPaciente, tipoOdonto: 'Tratamiento' } }))
  var hol = document.getElementById("holo");
  hol.style.display = "none";

}

const idRelacionados_ = computed((() => id => getItemEnRegistro(id)?.idRelacionados))
const idDiagnostico_ = itemodontograma?.value.id;

const visto = ref(1)
watch(
  () => itemPas.value,
  () => {
    visto.value = itemPas.value?.visto || 0;
  }
);
const finalizar = () => {
  visto.value = 1
  itemPas.value.id = route.params.idPaciente
  itemPas.value.visto = 1
  actualizar(itemPas.value)
}
const visitaGuiada = [
  { id: '1', topResponsiveCari: '80%', topBurbujaResponsive: '55%', leftResponsiveCari: '20px', leftResponsiveBurbuja: '20%', top: '45%', left: '20px', topBurbuja: '30%', elementoDestacado: 'destacarMicrofono', scroll: '0', data: "Hola, soy Quiru. Puedes activarme diciendo,  “Hola Quiru” o presionando el micrófono" },
  { id: '2', topResponsiveCari: '80%', topBurbujaResponsive: '25%', leftResponsiveCari: '20px', leftResponsiveBurbuja: '20%', top: '77%', left: '20px', topBurbuja: '62%', elementoDestacado: 'destacarOdontograma', scroll: '500', data: "Este es tu nuevo odontograma, se llena de forma automática luego de cada registro dictado por voz." },
  { id: '3', topResponsiveCari: '80%', topBurbujaResponsive: '25%', leftResponsiveCari: '20px', leftResponsiveBurbuja: '20%', top: '30%', left: '20px', topBurbuja: '15%', elementoDestacado: 'destacarImpresion', scroll: '0', data: "Este es el botón de impresión, para tener tu odontograma en formato pdf o mandarlo a imprimir de una vez" },
  { id: "4", topResponsiveCari: '80%', topBurbujaResponsive: '25%', leftResponsiveCari: '20px', leftResponsiveBurbuja: '20%', top: '30%', left: '20px', topBurbuja: '15%', elementoDestacado: 'destacarAyuda', scroll: '0', data: "Aquí puedes ver los distintos comandos de voz de Quiru." },
  { id: "5", topResponsiveCari: '80%', topBurbujaResponsive: '35%', leftResponsiveCari: '20px', leftResponsiveBurbuja: '20%', top: '45%', left: '20px', topBurbuja: '30%', elementoDestacado: '', scroll: '0', data: "Y eso es todo, experimenta la nueva forma de atender a tus pacientes." },
]
const indice = ref(0)
const item2 = ref({ id: '1', topResponsiveCari: '80%', topBurbujaResponsive: '55%', leftResponsiveCari: '20px', leftResponsiveBurbuja: '20%', top: '45%', left: '20px', topBurbuja: '30%', elementoDestacado: 'destacarMicrofono', scroll: '0', data: "Hola, soy Quiru. Puedes activarme diciendo,  “Hola Quiru” o presionando el micrófono" },
)
let position = ref(0)
const moverCarrusel = (adelanteOAtras) => {
  indice.value = indice.value + adelanteOAtras
  let anterior = (indice.value == 0) ? visitaGuiada[0] : visitaGuiada[indice.value - 1]
  let posterior = (indice.value == 3) ? visitaGuiada[3] : visitaGuiada[indice.value + 1]
  item2.value = visitaGuiada[indice.value]
  position.value = window.scrollY
  window.scrollTo({
    top: item2.value.scroll,
    left: 0,
    behavior: 'smooth',
  })
  let noDestacar = document.getElementById(anterior.elementoDestacado)
  noDestacar.classList.add('noElevar')
  let noDestacarPosterior = document.getElementById(posterior.elementoDestacado)
  noDestacarPosterior.classList.add('noElevar')
  let destacar = document.getElementById(item2.value.elementoDestacado)
  destacar.classList.remove('noElevar')
  destacar.classList.add('elevar')

}

function activarAyuda() {
  var verAyuda = document.getElementById("AyudaCard");
  verAyuda.style.display = "flex"
  if (isSpeech.value == false) {
    activarVoz()
  }
}
</script>

<template lang="pug">
.visita_guiada(v-if='visto == 0')
  img.cari(:style="`top: ${item2.top}; left: ${item2.left}; `" src='https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/Elementos%20ui%2FComponent_60_2_.webp?alt=media&token=603036f4-d6aa-45d4-9990-8d486ca38cdd')
  .burbuja(:style="`top: ${item2.topBurbuja}`")
    span {{item2.data}}
    .accionables
      btn.atras(v-if='indice!=0' @click='moverCarrusel(-1)')
        i.fa-solid.fa-circle-chevron-left.fa-xl
      btn.siguiente(v-if='indice != 4 ' @click="moverCarrusel(1)") 
        i.fa-solid.fa-circle-chevron-right.fa-xl
      btn.siguiente(v-else @click='finalizar()')
        i.fa-solid.fa-circle-chevron-right.fa-xl
    a.btn.align-self-start.light(@click='finalizar()') omitir

#id02.modal(style="display:none;")
  .modal-content.modal-sm
    .container
      p(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Eliminar Odontograma
      p ¿Esta seguro que desea eliminar?
      .clearfix
        button.btn.btn-secondary.cancelbtn(@click="Cancelar()") Cancelar
        button.btn.btn-danger.deletebtn(@click="EliminarOdonto(), mostrar = false") Aceptar
.scrollspy-example(data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" tabindex="0")
  h4(id="list-item-1") 
.row
  .col
    .row
      #alerta.alert.alert-danger.alert-dismissible(style='display:none') No hay nada que imprimir
        a.close(@click="Cancelar()" href='#' data-dismiss='alert' aria-label='close') &times;
      #alerto.alert.alert-danger.alert-dismissible(style='display:none') Cuidado! Este Odontograma tiene hallazgos registrados
        a.close(@click="Cancelar()" href='#' data-dismiss='alert') &times;
      .col
        #SeccionPrincipal
        ul.nav.nav-tabs( id="myTab" role="tablist")
          li.nav-item( role="presentation" v-if="itemodontograma?.idRelacionado")
            button.nav-link( 
              @click="push({name: 'Detalle', params: {idOdontograma: itemodontograma?.idRelacionado, idPaciente: route.params.idPaciente,tipoOdonto: 'Diagnóstico'} })"
            ) 
              strong.h2.fw-bold Diagnóstico
          li.nav-item()
            button.nav-link(
              :class='route.params.idOdontograma == itemodontograma?.id ? "active" : "" '
            ) 
              strong.h2.fw-bold {{itemodontograma?.tipo}}

          l1.nav-item( role="presentation" )
            button.nav-link( 
              v-for="idTratamientoHermano of idRelacionados_(itemodontograma?.id)"
              @click="push({name: 'Detalle', params: {idOdontograma: idTratamientoHermano, idPaciente: route.params.idPaciente,tipoOdonto: 'Tratamiento'} })"
            ) 
              strong.h2.fw-bold Tratamiento
    .row
      .col-2
        button.mb-2.btn(@click='push({ name: "pacienteVer", params: { idPaciente: route.params.idPaciente } })')       
          i.fa-solid.fa-arrow-left-long(style="color: var(--color-primary); font-size: 35px" )
      .col-10
        .left
          button.btn(v-if="itemodontograma?.tipo === 'Tratamiento'" title='Borrar'  @click="CallConfirm2(itemodontograma)")
            i.fa-regular.fa-trash-can.fa-xl(style="color: var(--color-primary)")
          button.btn(title='Imprimir' @click="printOdontograma()")
            i.fa-solid.fa-print.fa-xl(style="color: var(--color-primary)")#destacarImpresion
          a.btn(title='Ejemplos' href="#SeccionAyuda" @click='activarAyuda()')
            i.fa-solid.fa-question.fa-xl(style="color: var(--color-primary)")#destacarAyuda

    Formulario
    .col.mt-1.justify-content.desplazable(style="display: none" id="AyudaCard")
      .col.item
        .card.card-body#SeccionAyuda
          Instrucciones

    .row.mb-5
      .col-lg-4.col-md-6.col-sm-6.col-xs-12
        div.opciones
          button.outline-quiru(style="margin-bottom: 1.8rem;" @click='push({ name: "adicionales", params: { idOdontograma: route.params.idOdontograma, idPaciente: route.params.idPaciente, tipoOdonto: itemodontograma.tipo } })' )
            .contenido(style="width: 60%;")
              .title Agregar
              .subtitle Datos adicionales
            i.fa-solid.fa-file-circle-plus.icono
      //.col-lg-4.col-md-6.col-sm-6.col-xs-12
        div.opciones(v-if="itemodontograma?.estado==='2' && itemodontograma?.hallazgos && itemodontograma?.tipo === 'Diagnóstico' && itemodontograma?.tieneTratamiento!='Si'" id="holo")
          a.outline-quiru.solid(style="margin-bottom: 1.8rem;"  class="list-group-item list-group-item-action" href="#list-item-1" @click="guardar_(route.params.idPaciente, 'Tratamiento','No',itemodontograma?.id)")
            .contenido(style="width: 70%;")
              .title.light-quiru Generar
              .subtitle.light-quiru Odontograma de evolución
            i.fa-solid.fa-briefcase-medical.icono.light-quiru
      .col-lg-4.col-md-6.col-sm-6.col-xs-12 
        div.opciones
          button.outline-quiru(style="margin-bottom: 1.8rem;" @click='push({ name: "plantratamiento", params: { idOdontograma: route.params.idOdontograma, idPaciente: route.params.idPaciente, tipoOdonto: itemodontograma.tipo } })' )
            .contenido(style="width: 60%;")
              .title Generar
              .subtitle Plan de Tratamiento
            i.fa-solid.fa-file-circle-plus.icono   
</template>

<style lang="sass" scoped>
:root
  --cariTop: 0%
  --cariLeft: 0%
  --burbujaTop: 0%
  --burbujaLeft: 0%
.elevar
  position: relative
  z-index: 3 !important
.noElevar
  position: relative
  z-index: 0 !important
.visita_guiada
  margin: 0px
  padding: 0px
  display: flex
  position: absolute
  width: 100%
  height: 170%
  background-color: rgba(2, 55, 44, .8)
  z-index: 1
  left: 0 
  top: 0 
  .cari
    height: 140px !important
    display: flex
    opacity: 1
    width: 140px !important
    position: absolute
    z-index:6
    animation: cari 8s ease-in 0s infinite alternate forwards
  .burbuja
    display: flex
    flex-direction: column
    padding: 20px
    top: 40%
    left: 50%
    transform: translateX(-50%)
    width: 300px
    height: 160px
    background-color: var(--color-white)
    position: absolute
    z-index: 6
    border-radius: 20px
    &:before
      content: ""
      position: absolute
      bottom: -49px
      left: 30px
      width: 54px
      height: 50px
      background-color: var(--color-white)
      clip-path: polygon(100% 0, 0 0, 50% 100%)
    .accionables
      display: flex
      flex-direction: row
      justify-content: end
      position: absolute
      bottom: 10px
      right: 20px
      .atras, .siguiente
        color: var(--color-primary)

#id02 
  background-color: rgba(0, 0, 0, 0.6)
.cancelbtn,
.deletebtn 
  float: left 
  width: 50% 
.cancelbtn 
  background-color: rgb(189, 189, 189) 
.deletebtn 
  background-color: #f44336 
.container 
  padding: 16px 
  text-align: center 
.modal
  position: fixed 
  left: 0 
  top: 0 
  width: 100% 
  height: 100% 
  overflow: auto 
  opacity: 1 
  padding-top: 50px 
.modal-content 
  background-color: #fefefe 
  margin: 5% auto 15% auto 
  border: 1px solid #888 
  width: 80%
.clearfix 
  &::after 
    content: "" 
    clear: both 
    display: table 
.left
  display: flex
  justify-content: end
  align-items: center
.opciones
  margin-top: 16px
  margin-left: auto
  margin-right: auto
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
  height: auto
  .outline-quiru
    width: 100%
    height: 75px
    border-radius: 50px
    border: 1px solid var(--color-primary)
    background-color: transparent
    display: flex
    flex-direction: row
    justify-content: space-around
    align-items: center
    &.solid
      background-color: var(--color-primary)
    &.disabled
      border: none
      background-color: gray
      
    .contenido
      display: flex
      flex-direction: column
      align-items: start
      justify-content: start
      width: 150px
      .title
        font-weight: 700
        color: var(--color-primary)

        &.light-quiru
          color: var(--color-white)
          background: transparent
      .subtitle
        font-weight: 400
        color: var(--color-primary)
        &.light-quiru
          color: var(--color-white)
    .icono
      font-size: 26px
      color: var(--color-primary)
      &.light-quiru
        color: var(--color-white)

@media (min-width: 800px)
  .opciones
    margin-top: 16px
    margin-left: auto
    margin-right: auto
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    width: 100%
    height: auto
  .visita_guiada
    margin: 0px
    padding: 0px
    display: flex
    position: absolute
    width: 100%
    height: 100%
    background-color: rgba(2, 55, 44, .8)
    z-index: 1
    left: 0 
    top: 0 
    .cari
      height: 140px !important
      display: flex
      opacity: 1
      width: 140px !important
      position: absolute
      top: 72% !important
      left: 78% !important
      z-index: 6
      animation: cari 8s ease-in 0s infinite alternate forwards
    .burbuja
      display: flex
      flex-direction: column
      padding: 20px
      top: 45% !important
      left: 78% !important
      width: 300px
      height: 160px
      background-color: var(--color-white)
      position: absolute
      z-index: 6
      border-radius: 20px
      &:before
        content: ""
        position: absolute
        bottom: -49px
        left: 190px
        width: 54px
        height: 50px
        background-color: var(--color-white)
        clip-path: polygon(100% 0, 0 0, 50% 100%)
      .accionables
        display: flex
        flex-direction: row
        justify-content: end
        position: absolute
        bottom: 10px
        right: 20px
        .atras, .siguiente
          color: var(--color-primary)
    
@keyframes cari
  0%
    transform: translate(0)

  20%
    transform: translate(-4px, 4px)

  40%
    transform: translate(-4px, -4px)

  60%
    transform: translate(4px, 4px)

  80%
    transform: translate(4px, -4px)

  100%
    transform: translate(0)
</style>