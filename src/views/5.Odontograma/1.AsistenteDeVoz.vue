<script setup>
import Formulario from "./Formulario.vue";
import { item as itemPas, leer } from "../../store/paciente";
import "../../config/html2canvas";
import { useRoute, useRouter } from "vue-router";
import Cie10 from '../../config/Cie10.json';
import { leerEnRegistro as ObtenerOdontograma, item as itemodontograma } from '../../store/formodontograma';
import jsPDF from 'jsPDF'
import Instrucciones from "./../8.Ayuda/instrucciones.vue";
const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')
const route = useRoute()
const { back, push } = useRouter();
let canvas;
let canvas_image_data;
if (route.params.idPaciente) {
  leer(route.params.idPaciente)
}
if (route.params.idOdontograma) {
  ObtenerOdontograma(route.params.idOdontograma);
}
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
function Cancelar() {
    var alerta = document.getElementById("alerta");
        alerta.style.display = "none";
}
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : n + new Array(width - n.length + 1).join(z);
}
</script>

<template lang="pug">
.row
  .col
    Formulario
    #alerta.alert.alert-danger.alert-dismissible(style='display:none') No hay nada que imprimir
      a.close(@click="Cancelar()" href='#' data-dismiss='alert' aria-label='close') &times;
    .d-flex.mt-5
      button( @click='push({ name: "pacienteVer", params: { idPaciente: route.params.idPaciente } })').btn.btn-primary
        i.fa-solid.fa-circle-chevron-left
      button.ms-auto.btn.btn-primary(type='button' data-bs-toggle='collapse' data-bs-target='#collapseHallazgos' aria-expanded='false' aria-controls='collapseHallazgos')
        | Hallazgos
      button.btn.btn-primary.ms-auto(type='button' data-bs-toggle='modal' data-bs-target='#exampleModal') Ayuda
      #exampleModal.modal.fade(tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true')
        .modal-dialog.modal-lg
          .modal-content
            .modal-header
              button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
            .modal-body
              Instrucciones
      button.ms-auto( @click='push({ name: "adicionales", params: { idOdontograma: route.params.idOdontograma, idPaciente: route.params.idPaciente } })').btn.btn-primary + Datos
      button.ms-auto.btn.btn-primary(@click="printOdontograma()")
        i.fa-solid.fa-print
      

</template>

<style scoped>

</style>