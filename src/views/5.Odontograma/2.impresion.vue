<script setup>
import Formulario from "./Formulario.vue";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { VerFormato } from "../../store/OdontoJS";
import { registro,} from "../../store/odonto";
import { onMounted } from "@vue/runtime-core";
const { push } = useRouter();
const route = useRoute()
onMounted(()=> {

  if(registro.value) VerFormato(registro.value);

  watch(
    () => registro.value,
    () => {
      VerFormato(registro.value);
    }
  );

})

 function printOdontograma() {
            var divContents = document.getElementById("imprimir").innerHTML;
            var a = window.open('', '', 'height=500, width=500');
            a.document.write('<html>');
            a.document.write('<body >');
            a.document.write(divContents);
            a.document.write('</body></html>');
            a.document.close();
            a.print();
            a.close();
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

    button.ms-auto.btn.btn-primary(@click="printOdontograma()") Imprimir
</template>

<style lang="sass" scoped>

#myCanvas
  border: 1px solid #9c9898

</style>