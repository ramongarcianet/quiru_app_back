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
.row.align-items-center.mb-3
  .col-12.col-md-6.pb-2
    span.eyebrow Gestión clínica
    h1.page-title Pacientes
    //button.btn.primary-text.fw-bold(v-if="item.rol === 'admin'" @click="push({ name: 'admin', params: { idUsuario: item.id } })")
      i.bi.bi-sliders.pe-2
      | Administrar
  .col-12.col-md-6.pb-2.d-flex.justify-content-md-end
    button.new-patient.btn.btn-primary.d-flex.justify-content-between.align-items-center(type='button' @click="push({name: 'paciente'})")
      div
        p.mb-0 Nuevo paciente
      i.bi.bi-person-plus.fs-3(style="color: white")
.col
  Registro

</template>
<style lang="sass" scoped>
.page-title
  margin: 0.55rem 0 0
  color: var(--brand-navy)
  font-size: clamp(1.75rem, 3vw, 2.25rem)
  font-weight: 800

.new-patient
  min-width: 13.5rem
  gap: 1.5rem
  padding-inline: 1.15rem

@media (max-width: 767px)
  .new-patient
    width: 100%

//@media (min-width: 575px)
  //button
    //margin-top: 150px

</style>
