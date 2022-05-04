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

</script>
<template lang="pug">
h1 Odontograma
.row 
  .col
    h4 Odontogramas
    h4 Fecha: ...........
    canvas#myCanvas( width="500" height="400" style="border: 0; left:0px; top:0px;")
  .d-flex.mt-5
    button( @click='push({name: "Detalle", params: {idOdontograma: route.params.idOdontograma}})') Regresar a odontograma
    button.ms-auto( @click='push({name: "impresion", params: {idOdontograma: route.params.idOdontograma}})') Imprimir odontograma
</template>

<style lang="sass" scoped>

#myCanvas 
  border: 1px solid #9c9898

</style>