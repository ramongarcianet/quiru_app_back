<script setup>
import Formulario from "./Formulario.vue";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { VerFormato } from "../../store/OdontoJS";

import {leerEnRegistro,item as itemodontograma} from '../../store/formodontograma';
import "../../config/html2canvas";
import { onMounted } from "@vue/runtime-core";
const { push } = useRouter();
const route = useRoute()
let w;
let canvas ;
let canvas_image_data ;
leerEnRegistro(route.params.idOdontograma);
onMounted(()=> {

  if(itemodontograma.value.hallazgos) VerFormato(itemodontograma.value.hallazgos);

  watch(
    () => itemodontograma.value.hallazgos,
    () => {
      VerFormato(itemodontograma.value.hallazgos);
    }
  );

w = window;
})

function printOdontograma() {
  w = window.open("", "Download Image", "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=500, height=500");
  canvas = document.getElementById('myCanvas');
  canvas_image_data = canvas.toDataURL();
  w.document.open();
  w.document.write('<img src="'+canvas_image_data+'" style="border: 0;" width="300" height="300"/>');
  w.document.addEventListener('load', function() {
    w.focus();
    w.print();
    w.document.close();
    w.close();
}, true);

}


</script>
<template lang="pug">
.row
  .col#imprimir
    canvas#myCanvas( width="500" height="400" style="border: 0; left:0px; top:0px;")
</template>
<style lang="sass" scoped>
#myCanvas
  border: 1px solid #9c9898
</style>