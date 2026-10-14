<script setup>
import Registro from "./Registro.vue";
import { dialog, verEliminados,guardar } from "../../store/paciente";
import { useRouter } from "vue-router";
import { item } from '../../store/usuario'
//import PacientesRach from '../../config/RACHEL.json';
//import { item, guardar, actualizar, limpiar, leerEnRegistro, revisarDNI, registro, obtenerTodos } from "../../store/paciente";
const {push} = useRouter()

//PacientesRach.forEach(fila => {
  //return guardar(fila)
  //console.log(item);
//})
</script>
<template lang="pug">
.row
  .col-12.col-md-4.pb-2
    h1 Pacientes
    //button.btn.primary-text.fw-bold(v-if="item.rol === 'admin'" @click="push({ name: 'admin', params: { idUsuario: item.id } })")
      i.bi.bi-sliders.pe-2
      | Administrar
  .col-md-4
  .col-12.col-md-4.pb-2
    button.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.py-2.align-items-center(style="border-radius: 50px; " @click="push({name: 'paciente'})")
      div
        p.mb-0(style="color: white") Nuevo Paciente
      i.bi.bi-person-plus.fs-3(style="color: white")
.col
  Registro

</template>
<style lang="sass" scoped>

//@media (min-width: 575px)
  //button
    //margin-top: 150px

</style>
