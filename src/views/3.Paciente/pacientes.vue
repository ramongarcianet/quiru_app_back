<script setup>
import Registro from "./Registro.vue";
import { dialog, verEliminados } from "../../store/paciente";
import { useRouter } from "vue-router";
import { item } from '../../store/usuario'

const {push} = useRouter()
</script>
<template lang="pug">
.row
  .col-12.col-md-4.pb-2
    h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Lista de
    h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") pacientes
    button.btn.primary-text.fw-bold(v-if="item.rol === 'admin'" @click="push({ name: 'admin', params: { idUsuario: item.id } })")
      i.fa-solid.fa-gears.pe-2
      | Administrar
  .col-md-4
  .col-12.col-md-4.pb-2
    button.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.py-2.align-items-center(style="border-radius: 50px; " @click="push({name: 'paciente'})")
      div
        strong(style="color: white") Añadir
        p.mb-0(style="color: white") Nuevo Paciente
      i.fa-solid.fa-user-plus.fa-xl(style="color: white")
.col
  Registro

</template>
<style lang="sass" scoped>

//@media (min-width: 575px)
  //button
    //margin-top: 150px

</style>
