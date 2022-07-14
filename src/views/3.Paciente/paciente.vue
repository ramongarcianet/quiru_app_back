<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, limpiar, leerEnRegistro } from "../../store/paciente";
import {isLetter,isNumber} from '../../config/libreria'
const maxDocumento = ref(8);
const guardarOActualizar = () => {

  if (item.value.id) return actualizar(item.value);
  else return guardar(item.value);
};
const route = useRoute()
const {back, push} = useRouter()
let obtener
if (route.params.idPaciente) {
  leerEnRegistro(route.params.idPaciente)
}
onUnmounted(()=> {
  limpiar()
  if (obtener) obtener();
})
function definirMaxLimit(tipoDocumento){
  item.value.numeroDocumento = '';
  if (tipoDocumento=='DNI'){
      maxDocumento.value = 8;
  } else {
      maxDocumento.value = 9;
  }
}

</script>

<template lang="pug">
Form( :onPromise='()=>guardarOActualizar()' :onSuccess='()=>back()')
  label.form-label Documento de identidad
  .input-group
    select.form-select(placeholder="Ubigeo", v-model="item.tipoDocumento",v-on:change="definirMaxLimit(item.tipoDocumento)")
      option(value="DNI") DNI
      option(value="CE") CARNET DE EXTRANJERIA
    input.form-control(placeholder="Número documento", v-model="item.numeroDocumento", @keypress="isNumber($event)",required,:maxlength="maxDocumento",:minlength="maxDocumento")
  label.form-label Nombre del paciente
  .input-group
    input.form-control(placeholder="Nombre", v-model="item.nombre",@keypress="isLetter($event)" ,required,maxlength="30")
    input.form-control(placeholder="Apellido paterno", v-model="item.apellidoPaterno",@keypress="isLetter($event)" ,required,maxlength="30")
    input.form-control(placeholder="Apellido materno", v-model="item.apellidoMaterno",@keypress="isLetter($event)", required,maxlength="30")
  .row
    .col
      label.form-label Fecha de nacimiento
      input.form-control(type="date", v-model="item.fechaNacimiento")
    .col
      label.form-label Sexo
      select.form-select(placeholder="Ubigeo", v-model="item.sexo",required)
        option(value="") SELECCIONE
        option(value="M") MASCULINO
        option(value="F") FEMENINO
  label.form-label Dirección
  .input-group
    input.form-control(placeholder="Departamento", v-model="item.departamento",@keypress="isLetter($event)" ,required,maxlength="30")
    input.form-control(placeholder="Dirección", v-model="item.Direccion",required,maxlength="40")
  .row
    .col
      label.form-label Correo electrónico
      input.form-control(placeholder="Correo Electrónico", v-model="item.email", type="email", required,maxlength="30")
    .col
      label.form-label Teléfono
      input.form-control(type="tel", placeholder="Teléfono", v-model="item.telefono",@keypress="isNumber($event)" ,required,maxlength="15")
  .row
    .col
      label.form-label Constancia de informado
      select.form-select(placeholder="Constancia informado", v-model="item.constancia")
        option(value="S") SI
        option(value="N") NO
    .col
      label.form-label Comentario
      input.form-control(placeholder="Comentario", v-model="item.Comentario",@keypress="isLetter($event)",maxlength="40")
  .d-flex.mt-3
    button.btn.btn-primary(@click="push({ name: 'pacientes', params: {} })") Volver
    button.ms-auto.btn.btn-primary(type='submit') Guardar

</template>
