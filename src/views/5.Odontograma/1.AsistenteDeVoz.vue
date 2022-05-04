<script setup>
import Formulario from "./Formulario.vue";
import { useRoute, useRouter } from "vue-router";
import Registro from "./Registro.vue";
const route = useRoute()
const { back, push } = useRouter();
</script>
<template lang="pug">
h1 Odontograma
.row 
  .col
    Formulario
    Registro
    
    .row
      label.form-label Especficaciones
      textarea.form-control#inputDescription( rows="4" ) 
    .row
      label.form-label Observaciones
      textarea#inputObservacion.form-control( rows="4" ) 
    .row
      label.form-label Receta
      textarea#inputReceta.form-control( rows="4") 
    .d-flex.mt-5
      button( @click='push({name: "paciente", params: {idOdontograma: route.params.idOdontograma}})') Regresar a paciente
      button.ms-auto( @click='push({name: "impresion", params: {idOdontograma: route.params.idOdontograma}})') Imprimir odontograma
</template>
