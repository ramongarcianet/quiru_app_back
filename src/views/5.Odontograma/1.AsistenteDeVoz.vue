<script setup>
import Formulario from "./Formulario.vue";
import { item as itemPas, leerEnRegistro } from "../../store/paciente";
import { useRoute, useRouter } from "vue-router";
const route = useRoute()
const { back, push } = useRouter();
if (route.params.idPaciente) {
  leerEnRegistro(route.params.idPaciente)
}
</script>
<template lang="pug">
.row
  .col
    Formulario
    .d-flex.mt-5
      button( @click='push({name: "pacienteVer", params: {idPaciente: route.params.idPaciente}})').btn.btn-primary Volver
      button.ms-auto( @click='push({name: "adicionales", params: {idOdontograma: route.params.idOdontograma,idPaciente: route.params.idPaciente}})').btn.btn-primary Agregar datos adicionales
      button.ms-auto( @click='push({name: "impresion", params: {idOdontograma: route.params.idOdontograma,idPaciente: route.params.idPaciente}})').btn.btn-primary Imprimir odontograma
</template>
