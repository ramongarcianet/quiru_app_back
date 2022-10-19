<script setup>
import Formulario from "./Formulario.vue";
import {registroodonto, guardar as guardarOdontograma, getItemEnRegistro} from "../../store/formodontograma";
import { item as itemPas, leer } from "../../store/paciente";
import "../../config/html2canvas";
import { useRoute, useRouter } from "vue-router";
import Cie10 from '../../config/Cie10.json';
import { leerEnRegistro as ObtenerOdontograma, item as itemodontograma, eliminar } from '../../store/formodontograma';
import jsPDF from 'jsPDF'
import Instrucciones from "./../8.Ayuda/instrucciones.vue";
import { watch, ref, computed } from "vue";
import MicroButtonVue from "../../components/MicroButton.vue";
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
  ()=> route.params.idOdontograma,
  ()=> ObtenerOdontograma(route.params.idOdontograma)
)

function printOdontograma() {

  var pdf = new jsPDF()
  canvas = document.getElementById('myCanvas');
  canvas_image_data = canvas.toDataURL();
  let posis = 212;
  let posis1 = 0;
  if (itemodontograma.value?.hallazgos != undefined) {
    pdf.setFontSize(12);
    Cie10.CIE10.forEach(element => {
      let ubicacionnes = itemodontograma.value?.hallazgos.filter((elem) => elem.hallazgo.toUpperCase() == element.HALLAZGO);
      let Piezas = "";
      if (ubicacionnes != undefined && ubicacionnes?.length > 0) {
        ubicacionnes.forEach(dient => {
          if (!Piezas.includes(dient.diente)) {
            Piezas = Piezas + dient.diente + '; ';
          }
        });
        pdf.text(10, posis, element.DECRICIE10 + " / Piezas : " + Piezas + " / " + element.CIE10);
        posis = posis + 7;
      }
      
    });
    posis1 = posis + 10;
    pdf.setFontSize(12);
    Cie10.CIE10.forEach(element => {
      let ubicacionnes = itemodontograma.value?.hallazgos.filter((elem) => elem.hallazgo.toUpperCase() == element.HALLAZGO);
      let Piezas = "";
      if (ubicacionnes != undefined && ubicacionnes?.length > 0) {
        ubicacionnes.forEach(dient => {
          if (!Piezas.includes(dient.diente)) {
            Piezas = Piezas + dient.diente + '; ';
          }
        });
        if (element.TRATAMIENTO != "") {
          pdf.text(10, posis1, element.TRATAMIENTO + " / Piezas : " + Piezas);
          posis1 = posis1 + 7;
        }
      }
    });
    pdf.html("", {
      callback: function (pdf) {
        pdf.setFontSize(17);
        pdf.text(30, 20, 'FICHA DE IDENTIFICACIÓN SANITARIA/ FICHA DENTAL');
        pdf.setFontSize(12);
        pdf.text(10, 30, pad('NOMBRE : ' + itemPas.value.nombre, 80, ' ') + pad('APELLIDOS : ' + itemPas.value.apellidoPaterno + ' ' + itemPas.value.apellidoMaterno, 90, ' '));
        pdf.text(10, 37, pad('FECHA DE NACIMIENTO : ' + itemPas.value.fechaNacimiento, 80, ' ') + pad('TIM/DNI : ' + itemPas.value.numeroDocumento, 90, ' '));
        pdf.text(10, 44, pad('DIRECCIÓN : ' + itemPas.value.Direccion, 180, ' '));
        pdf.setFontSize(17);
        pdf.text(80, 55, 'ODONTOGRAMA');
        pdf.setFontSize(12);
        pdf.addImage(canvas_image_data, 'JPEG', 30, 55, 140, 140)
        pdf.setFontSize(17);
        pdf.text(10, 205, 'DIAGNOSTICO');
        pdf.setFontSize(17);
        pdf.text(10, posis + 2, 'TRATAMIENTO');
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
function guardar_() {
  var hol = document.getElementById("holo");
    hol.style.display = "none";

}

const idRelacionados_ = computed((()=> id =>  getItemEnRegistro(id)?.idRelacionados))
const idDiagnostico_ = itemodontograma?.value.id;

</script>

<template lang="pug">
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
        h2.my-0.mx-3 Panel de
        ul.nav.nav-tabs( id="myTab" role="tablist")
          li.nav-item( role="presentation" v-if="itemodontograma?.idRelacionado")
            button.nav-link( 
              @click="push({name: 'Detalle', params: {idOdontograma: itemodontograma?.idRelacionado, idPaciente: route.params.idPaciente} })"
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
              @click="push({name: 'Detalle', params: {idOdontograma: idTratamientoHermano, idPaciente: route.params.idPaciente} })"
            ) 
              strong.h2.fw-bold Tratamiento
    .row
      .col-2
        button.mb-2.btn(@click='push({ name: "pacienteVer", params: { idPaciente: route.params.idPaciente } })')
          ion-icon(name="return-down-back-outline" style="color: var(--color-primary); font-size: 40px" )
      .col-10
        .left
          button.btn(v-if="itemodontograma?.tipo === 'Tratamiento'" title='Borrar'  @click="CallConfirm2(itemodontograma)")
            ion-icon(name="trash-outline" style="color: var(--color-primary); font-size: 26px;")
          button.btn(title='Imprimir' @click="printOdontograma()")
            ion-icon(name="print-outline" style="color: var(--color-primary); font-size: 26px;")
          button.btn(title='Ayuda' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal')
            ion-icon(name="help-outline" style="color: var(--color-primary); font-size: 26px;" )
          #exampleModal.modal.fade(tabindex='-1')
            .modal-dialog.modal-lg
              .modal-content
                .modal-header
                  button.btn-close(type='button' data-bs-dismiss='modal')
                .modal-body
                  Instrucciones
    Formulario

    div.mt-5.opciones
      button.outline-quiru( @click='push({ name: "adicionales", params: { idOdontograma: route.params.idOdontograma, idPaciente: route.params.idPaciente, tipoOdonto: itemodontograma.tipo } })' )
        .contenido
          .title Agregar
          .subtitle Datos adicionales
        ion-icon(name="document-outline").icono
    div.opciones(v-if="itemodontograma?.estado==='2' && itemodontograma?.hallazgos && itemodontograma?.tipo === 'Diagnóstico' && itemodontograma?.tieneTratamiento!='Si'" id="holo")
      a.outline-quiru.solid(class="list-group-item list-group-item-action" href="#list-item-1" @click="guardarOdontograma(route.params.idPaciente, 'Tratamiento','No',itemodontograma?.id ), guardar_()")
        .contenido
          .title.light-quiru Crear
          .subtitle.light-quiru Tratamiento
        ion-icon(name="medkit-outline").icono.light-quiru
</template>

<style lang="sass" scoped>


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
    width: 40%
    height: auto

</style>