<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, limpiar, leerEnRegistro } from "../../store/paciente";
import RegistroOdontograma from "../5.Odontograma/RegistroOdontograma.vue";
import { guardar as guardarOdontograma } from "../../store/formodontograma";

const route = useRoute()
const {back, push} = useRouter()
let obtener
if (route.params.idPaciente) {
  leerEnRegistro(route.params.idPaciente)
}
onUnmounted(()=> {
  limpiar()
  if (obtener) obtener();
})
</script>

<template lang="pug">
Form
  label.form-label Documento de identidad
  .input-group
    select.form-select(placeholder="Ubigeo", v-model="item.tipoDocumento", disabled)
      option(value="DNI") DNI
      option(value="CE") CARNET DE EXTRANJERIA
    input.form-control(placeholder="Número documento", v-model="item.numeroDocumento", required,disabled)
  label.form-label Nombre del paciente
  .input-group
    input.form-control(placeholder="Nombre", v-model="item.nombre", required, disabled)
    input.form-control(placeholder="Apellido paterno", v-model="item.apellidoPaterno", required,disabled)
    input.form-control(placeholder="Apellido materno", v-model="item.apellidoMaterno", required,disabled)
  br
  .d-flex.justify-content-between
    i.fa.fa-list-ul(style="color: #37DFBB; font-weight:bold; font-family: var(--font-family); font-size: 1.5em;")
      |  Odontogramas 
    br
  br
  RegistroOdontograma
  .d-flex
    button.btn.btn-primary(@click="push({ name: 'pacientes', params: {} })") Volver
    button.ms-auto.btn.btn-primary(@click="guardarOdontograma(route.params.idPaciente, 'Diagnóstico','2','0')") Nuevo Diagnóstico
</template>
