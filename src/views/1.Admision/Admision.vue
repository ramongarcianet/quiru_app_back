<script setup>
import { useRoute, useRouter} from "vue-router";
import Registro from './Registro.vue';
import Formulario from './Formulario.vue';

const {back, push} = useRouter()
</script>

<template lang="pug">
.row
  .col-10
    h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Admisión
    h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") del paciente
    button.btn.btn-outline-primary.border-0(@click="back()" )
      i.fa-solid.fa-arrow-left-long.fa-xl
  .col-2
  Formulario

</template>
