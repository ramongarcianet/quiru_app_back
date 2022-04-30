<script setup>
import Formulario from "./Formulario.vue";
import Registro from "./Registro.vue";
import { dialog } from "../../store/paciente";
</script>
<template lang="pug">

.d-flex.justify-content-between
  h1 Pacientes
  Button( @click="dialog=true") Nuevo
Dialog( v-model='dialog' )
  template(#title)
    h3.m-0 Usuario
  template(#body)
    Formulario
Registro

</template>
