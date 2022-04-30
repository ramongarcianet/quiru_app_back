<script setup>
import { ref } from "vue";
import { item, guardar, actualizar, limpiar, dialog } from "../../store/paciente";

const guardarOActualizar = () => {
  if (item.value.id) actualizar(item.value).then(() => limpiar());
  else guardar(item.value).then(() => limpiar());
};
</script>

<template lang="pug">

form(@submit.prevent="(e) => guardarOActualizar()")
  label.form-label Documento de identidad
  .input-group
    select.form-control(placeholder="Ubigeo", v-model="item.tipoDocumento")
      option(value="DNI") DNI
      option(value="CE") CARNET DE EXTRANJERIA
    input.form-control(placeholder="Número documento", v-model="item.numeroDocumento", required)
  label.form-label Nombre del paciente
  .input-group
    input.form-control(placeholder="Nombre", v-model="item.nombre", required)
    input.form-control(placeholder="Apellido paterno", v-model="item.apellidoPaterno", required)
    input.form-control(placeholder="Apellido materno", v-model="item.apellidoMaterno", required)
  .row
    .col
      label.form-label Fecha de nacimiento
      input.form-control(type="date", v-model="item.fechaNacimiento")
    .col
      label.form-label Sexo
      select.form-control(placeholder="Ubigeo", v-model="item.sexo")
        option(value="M") MASCULINO
        option(value="F") FEMENINO
  label.form-label Dirección
  .input-group
    input.form-control(placeholder="Departamento", v-model="item.departamento", required)
    input.form-control(placeholder="Dirección", v-model="item.Direccion", required)
  .row
    .col
      label.form-label Correo electrónico
      input.form-control(placeholder="Correo Electrónico", v-model="item.email", type="email", required)
    .col
      label.form-label Teléfono
      input.form-control(type="tel", placeholder="Teléfono", v-model="item.telefono", required)
  .row
    .col
      label.form-label Constancia de informado
      input.form-control(placeholder="Constancia informado", v-model="item.constancia", required)
    .col
      label.form-label Comentario
      input.form-control(placeholder="Comentario", v-model="item.Comentario")
  
  .d-flex
    button.btn.btn-outline-primary(type="button", @click="dialog = false; limpiar(); ") Atrás
    button.ms-auto.btn.btn-primary Guardar 
</template>
