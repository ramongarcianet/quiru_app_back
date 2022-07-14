<script setup>
import Registro from "./Registro.vue";
import { dialog } from "../../store/paciente";
import { useRouter } from "vue-router";

const {push} = useRouter()
</script>
<template lang="pug">

.d-flex.align-content-start.flex-wrap
  i.fa-solid.fa-address-card.me-2(style="color: #37DFBB; font-weight:bold; font-size: 1.5em;")
  h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Pacientes
.container.fluid
  container
  Registro
  .div(style="text-align: right;")
    button.btn.btn-primary(style="border-radius: 50%;" @click="push({name: 'paciente'})")
      i.fa.fa-plus(aria-hidden='true' style="font-size: 2em; font-weight: bold; color: white;")
      
</template>
