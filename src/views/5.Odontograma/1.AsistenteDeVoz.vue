<script setup>
import Formulario from "./Formulario.vue";
import { item as itemPas, leer } from "../../store/paciente";
import "../../config/html2canvas";
import { useRoute, useRouter } from "vue-router";
import Cie10 from '../../config/Cie10.json';
import { leerEnRegistro as ObtenerOdontograma, item as itemodontograma } from '../../store/formodontograma';
//import _pdfMake from 'pdfmake';
//import pdfFonts from 'pdfmake/build/vfs_fonts';
//mport htmlToPdfmake from 'html-to-pdfmake';
import jsPDF from 'jsPDF'
import Instrucciones from "./../8.Ayuda/instrucciones.vue";
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
  canvas = document.getElementById('myCanvas');
  canvas_image_data = canvas.toDataURL();
  var trtable = "";
  var trtableTrata = "";
  if (itemodontograma != undefined) {
    Cie10.CIE10.forEach(element => {
      let ubicacionnes = itemodontograma.value?.hallazgos.filter((elem) => elem.hallazgo.toUpperCase() == element.HALLAZGO);
      let Piezas = "";
      let PiezasTrata = "";
      if (ubicacionnes != undefined && ubicacionnes?.length > 0) {
        ubicacionnes.forEach(dient => {
          if (!Piezas.includes(dient.diente)) {
            Piezas = Piezas + dient.diente + '; ';
          }
        });
        trtable = trtable + "<tr><td style='text-align:left'>" + element.DECRICIE10 + " : " + Piezas + "</td><td style='text-align:right'>" + element.CIE10 + "</td></tr>";
        if (element.TRATAMIENTO != "") {
          trtableTrata = trtableTrata + "<tr><td colspan='2' style='width:100%;text-align:left'>" + element.TRATAMIENTO + " : " + Piezas + "</td></tr>";
        }
      }
    });
  }
  let htmldiv = '';
  htmldiv = htmldiv + '<div style="width:50%;text-align:left;font-weight: bold;">FICHA DE IDENTIFICACIÓN SANITARIA</div>';
  htmldiv = htmldiv + '<div style="width:30%;text-align:right;font-weight: bold; float:right ">FICHA DENTAL</div>';
  htmldiv = htmldiv + '<div style="width:100%;text-align:center">';
  htmldiv = htmldiv + '  <table>';
  htmldiv = htmldiv + '     <tbody>';
  htmldiv = htmldiv + '         <tr><td style="text-align:left">NOMBRE : ' + itemPas.value.nombre + '</td><td style="text-align:left">APELLIDOS : ' + itemPas.value.apellidoPaterno + ' ' + itemPas.value.apellidoMaterno + '</td></tr>';
  htmldiv = htmldiv + '         <tr><td style="text-align:left">FECHA DE NACIMIENTO : ' + itemPas.value.fechaNacimiento + '</td><td style="text-align:left">TIM/DNI : ' + itemPas.value.numeroDocumento + '</td></tr>';
  htmldiv = htmldiv + '         <tr><td colspan="2" style="text-align:left">DIRECCIÓN : ' + itemPas.value.Direccion + '</td></tr>';
  htmldiv = htmldiv + '       </tbody>';
  htmldiv = htmldiv + '   </table>';
  htmldiv = htmldiv + '</div>';
  htmldiv = htmldiv + '<div style="width:100%;text-align:center;font-weight: bold;">ODONTOGRAMA</div>';
  htmldiv = htmldiv + '<div style="width:100%;text-align:center">';
  htmldiv = htmldiv + '   <img src="' + canvas_image_data + '" style="border: 0;" width="400" height="400"/> ';
  htmldiv = htmldiv + '</div>';
  htmldiv = htmldiv + '<br>';
  htmldiv = htmldiv + '   <table style="width:100%;">';
  htmldiv = htmldiv + '      <tbody style="border-style: none;">';
  htmldiv = htmldiv + '         <tr><td colspan="2" style="text-align:left"><div style="width:100%;text-align:left; font-weight: bold;">DIAGNOSTICO </div></td></tr>';
  htmldiv = htmldiv + trtable;
  htmldiv = htmldiv + '         <tr><td colspan="2" style="text-align:left"><div style="width:100%;text-align:left; font-weight: bold;">TRATAMIENTO </div></td></tr>';
  htmldiv = htmldiv + trtableTrata;
  htmldiv = htmldiv + '       </tbody>';
  htmldiv = htmldiv + '   </table>';

  let pdfName = 'test';
  var doc = new jsPDF('p', 'pt', 'letter');
  doc.html(htmldiv, {
    callback: function (doc) {
      doc.save(pdfName + '.pdf');
    }
  });
}

</script>

<template lang="pug">
.row
  .col
    Formulario
    .d-flex.mt-5
      button( @click='push({ name: "pacienteVer", params: { idPaciente: route.params.idPaciente } })').btn.btn-primary Volver
      button.ms-auto.btn.btn-primary(type='button' data-bs-toggle='collapse' data-bs-target='#collapseHallazgos' aria-expanded='false' aria-controls='collapseHallazgos')
        | Hallazgos
      button.ms-auto.btn.btn-primary(type='button' data-bs-toggle='collapse' data-bs-target='#collapseAyuda' aria-expanded='false' aria-controls='collapseAyuda')
        | Ayuda
      button.ms-auto( @click='push({ name: "adicionales", params: { idOdontograma: route.params.idOdontograma, idPaciente: route.params.idPaciente } })').btn.btn-primary + Datos
      button.ms-auto.btn.btn-primary(@click="printOdontograma()") Imprimir
    #collapseAyuda.collapse.mt-2
      Instrucciones
      button.btn.btn-primary(type='button' data-bs-toggle='collapse' data-bs-target='#collapseAyuda' aria-expanded='false' aria-controls='collapseAyuda')
        | Cerrar
      
</template>