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
leerEnRegistro(route.params.idOdontograma);
onMounted(()=> {

  if(itemodontograma.value.hallazgos) VerFormato(itemodontograma.value.hallazgos);

  watch(
    () => itemodontograma.value.hallazgos,
    () => {
      VerFormato(itemodontograma.value.hallazgos);
    }
  );

})

 function printOdontograma() {
            var divContents = document.getElementById("imprimir").innerHTML;
           // var printContents = this.myCanvas.innerHTML();

          const canvas = document.getElementById('myCanvas')
          const img    = canvas.toDataURL('image/png')

            var a = window.open('', '', 'height=500, width=500');
            a.document.write('<html>');
            a.document.write('<body >');
            a.document.write(divContents);
            a.document.write('<img src="'+img+'"/>');
            //ventana.document.write(elemento.innerHTML);
            a.document.write('</body></html>');
            a.document.close();
            a.print();
            a.close();
 }


    function printThis() {
      console.log("printing..");
      const el = "imprimir";

      const options = {
        type: "dataURL"
      };
      const printCanvas = html2canvas(el, options);

      const link = document.createElement("a");
      link.setAttribute("download", "download.png");
      link.setAttribute(
        "href",
        printCanvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();

      console.log("done");
    }


</script>
<template lang="pug">
h1 Odontograma
.row
  .col
  .col#imprimir
    h4 Odontograma
    h4 Fecha: ...........
    canvas#myCanvas( width="500" height="400" style="border: 0; left:0px; top:0px;")
  .col
  .d-flex.mt-5
    button( @click='push({name: "Detalle", params: {idOdontograma: route.params.idOdontograma,idPaciente: route.params.idPaciente}})').btn.btn-primary Volver
    button.ms-auto.btn.btn-primary(@click="printThis()") Print!
    button.ms-auto.btn.btn-primary(@click="printOdontograma()") Imprimir
</template>

<style lang="sass" scoped>

#myCanvas
  border: 1px solid #9c9898

  

</style>