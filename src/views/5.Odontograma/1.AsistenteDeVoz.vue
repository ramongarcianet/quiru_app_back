<script setup>
import Formulario from "./Formulario.vue";
import { item as itemPas, leer } from "../../store/paciente";
import "../../config/html2canvas";
import { useRoute, useRouter } from "vue-router";
import Cie10 from '../../config/Cie10.json';
import { leerEnRegistro as ObtenerOdontograma, item as itemodontograma } from '../../store/formodontograma';
const route = useRoute()
const { back, push } = useRouter();
let w;
let canvas;
let canvas_image_data;
if (route.params.idPaciente) {
  leer(route.params.idPaciente)
}
if (route.params.idOdontograma) {
  ObtenerOdontograma(route.params.idOdontograma);
}
function printOdontograma() {
  w = window.open("", "Download Image", "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=500, height=500");
  canvas = document.getElementById('myCanvas');
  canvas_image_data = canvas.toDataURL();
  w.document.open();
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
        trtable = trtable + "<tr><td style='width:70%;text-align:left'><li>" + element.DECRICIE10 + " : " + Piezas + "</li></td><td style='width:30%;text-align:right'>" + element.CIE10 + "</td></tr>";
        if (element.TRATAMIENTO != "") {
          trtableTrata = trtableTrata + "<tr><td style='width:100%;text-align:left'><li>" + element.TRATAMIENTO + " : " + Piezas + "</li></td></tr>";
        }
      }
    });
  }
  let html = '<div style="width:100%"><table style="width:100%;"><tbody style="border:solid 1px #DDEEEE;">'
    + '  <tr><td style="text-align:left">FICHA DE IDENTIFICACIÓN SANITARIA</td>'
    + '  <td style="text-align:right">FICHA DENTAL</td></tr>'
    + '</tbody></table></div>'
    + '<div style="width:100%"><table style="width:100%;"><tbody style="border:solid 1px #DDEEEE;">'
    + '  <tr><td style="text-align:left">NOMBRE : ' + itemPas.value.nombre + '</td>'
    + '  <td style="text-align:left">APELLIDOS : ' + itemPas.value.apellidoPaterno + ' ' + itemPas.value.apellidoMaterno + '</td></tr>'
    + '  <tr><td style="text-align:left">FECHA DE NACIMIENTO : ' + itemPas.value.fechaNacimiento + '</td>'
    + '  <td style="text-align:left">TIM/DNI : ' + itemPas.value.numeroDocumento + '</td></tr>'
    + '  <tr><td colspan="2" style="text-align:left">DIRECCIÓN : ' + itemPas.value.Direccion + '</td>'
    + '</tbody></table></div>'
    + '<div style="width:100%;text-align:center;font-weight: bold;">ODONTOGRAMA</div>'
    + '<div style="width:100%;text-align:center">'
    + '<img src="' + canvas_image_data + '" style="border: 0;" width="300" height="300"/> </div>'
    + '<br><div style="width:100%;text-align:left; font-weight: bold;">DIAGNOSTICO</div>'
    + '<div style="width:100%;text-align:center"><ul style= "list-style-type: square;"><table style="width:100%;"><tbody style="border:solid 1px #DDEEEE;">'
    + trtable
    + '</tbody></table></ul><br></div>'
    + '<br><div style="width:100%;text-align:left; font-weight: bold;">TRATAMIENTO</div>'
    + '<div style="width:100%;text-align:center"><ul style= "list-style-type: square;"><table style="width:100%;"><tbody style="border:solid 1px #DDEEEE;">'
    + trtableTrata
    + '</tbody></table></ul><br></div>'
  w.document.write(html);
  w.document.addEventListener('load', function () {
    w.focus();
    w.print();
    w.document.close();
    w.close();
  }, true);

}
</script>


<template lang="pug">
.row
  .col
    Formulario
    .d-flex.mt-5
      button( @click='push({ name: "pacienteVer", params: { idPaciente: route.params.idPaciente } })').btn.btn-primary Volver
      button.ms-auto( @click='push({ name: "adicionales", params: { idOdontograma: route.params.idOdontograma, idPaciente: route.params.idPaciente } })').btn.btn-primary Agregar datos adicionales
      button.ms-auto.btn.btn-primary(@click="printOdontograma()") Imprimir odontograma
</template>
