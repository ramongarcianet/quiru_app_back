<script setup>
import Formulario from "./Formulario.vue";
import { item as itemPas, leerEnRegistro } from "../../store/paciente";
import "../../config/html2canvas";
import { useRoute, useRouter } from "vue-router";
const route = useRoute()
const { back, push } = useRouter();
let w;
let canvas;
let canvas_image_data;
if (route.params.idPaciente) {
  leerEnRegistro(route.params.idPaciente)
}
function printOdontograma() {
  w = window.open("", "Download Image", "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=500, height=500");
  canvas = document.getElementById('myCanvas');
  canvas_image_data = canvas.toDataURL();
  w.document.open();
  let html='<div style="width:100%">'
    + '  <div style="width:40%;text-align:left">FICHA DE IDENTIFICACIÓN SANITARIA</div>'
    + '  <div style="width:40%;text-align:right">FICHA DENTAL</div>'
    + '</div>'
    + '<div style="width:100%">'
    + '  <div style="width:40%;text-align:left">NOMBRE</div>'
    + '  <div style="width:40%;text-align:right">APELLIDO</div>'
    + '  <br>'
    + '  <div style="width:40%;text-align:left">NOMBRE</div>'
    + '  <div style="width:40%;text-align:right">APELLIDO</div>'
    + '  <br>'
    + '  <div style="width:40%;text-align:left">EMP</div>'
    + '  <div style="width:40%;text-align:right">UNIDAD</div>'
    + '</div>'
    + '<div style="width:40%;text-align:right">ODONTOGRAMA</div>'
    + '<div style="width:40%;text-align:center">' 
    + '<img src="' + canvas_image_data +  '" style="border: 0;" width="300" height="300"/> </div>'
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
