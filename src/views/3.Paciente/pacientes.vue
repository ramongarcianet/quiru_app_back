<script setup>
import Registro from "./Registro.vue";
import { dialog } from "../../store/paciente";
import { useRouter } from "vue-router";

const {push} = useRouter()
</script>
<template lang="pug">

.d-flex.justify-content-between
  i.fa.fa-list-ul(style="color: #37DFBB; font-weight:bold; font-family: var(--font-family); font-size: 1.5em;")
    |  Pacientes
  br
Registro
.div(style="text-align: right;")
  button.btn.btn-primary(style="border-radius: 50%;" @click="push({name: 'paciente'})")
    i.fa.fa-plus(aria-hidden='true' style="font-size: 2em; font-weight: bold; color: white;")
</template>
