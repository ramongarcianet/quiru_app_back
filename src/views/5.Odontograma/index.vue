<script setup>
import RegistroOdontograma from "./RegistroOdontograma.vue";
import { dialog, obtenerTodos, guardar } from "../../store/formodontograma";
import { leer as leerPaciente } from "../../store/paciente";
import Formulario from "../3.Paciente/Formulario.vue";
import { useRoute, useRouter } from "vue-router";
import { onUnmounted } from "@vue/runtime-core";
const { push } = useRouter();
const route = useRoute();
let obtener;

if (route.params.idPaciente) {
  leerPaciente(route.params.idPaciente);
  obtener = obtenerTodos(route.params.idPaciente);
}

onUnmounted(() => {
  if (obtener) obtener();
});
</script>
<template lang="pug">
h1 Paciente
Formulario
RegistroOdontograma
.d-flex
  button.btn.btn-outline-primary(@click="push({ name: 'paciente', params: {} })") Volver
  button.ms-auto(@click="guardar(route.params.idPaciente, 'Diagnóstico')") Nuevo Diagnóstico
  button(@click="guardar(route.params.idPaciente, 'Tratamiento')") Nuevo Tratamiento
</template>
