<script setup>
import Registro from "./Registro.vue";
import { dialog } from "../../store/paciente";
import { useRouter } from "vue-router";

const {push} = useRouter()
</script>
<template lang="pug">

.d-flex.justify-content-between
  h1 Pacientes
  button.btn.btn-primary( @click="push({name: 'paciente'})") Nuevo

Registro

</template>
