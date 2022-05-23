<script setup>
import Formulario from "./Formulario.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute()
const { back, push } = useRouter();
</script>
<template lang="pug">
h1 Odontograma
.row
  .col
    Formulario
    .d-flex.mt-5
      button( @click='push({name: "pacienteVer", params: {idOdontograma: route.params.idOdontograma}})').btn.btn-primary Volver
      button.ms-auto( @click='push({name: "adicionales", params: {idOdontograma: route.params.idOdontograma}})').btn.btn-primary Agregar datos adicionales
      button.ms-auto( @click='push({name: "impresion", params: {idOdontograma: route.params.idOdontograma}})').btn.btn-primary Imprimir odontograma
</template>
