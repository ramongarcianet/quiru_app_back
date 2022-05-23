<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, limpiar, leerEnRegistro } from "../../store/paciente";
import RegistroOdontograma from "../5.Odontograma/RegistroOdontograma.vue";
import { guardar as guardarOdontograma } from "../../store/formodontograma";
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
</script>

<template lang="pug">
Form( :onPromise='()=>guardarOActualizar()' :onSuccess='()=>back()')
  label.form-label Documento de identidad
  .input-group
    select.form-select(placeholder="Ubigeo", v-model="item.tipoDocumento")
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
      select.form-select(placeholder="Ubigeo", v-model="item.sexo")
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

    button.ms-auto.btn.btn-primary(type='submit') Guardar

RegistroOdontograma
.d-flex
  button.btn.btn-primary(@click="push({ name: 'pacientes', params: {} })") Volver
  button.ms-auto.btn.btn-primary(@click="guardarOdontograma(route.params.idPaciente, 'Diagnóstico','2')") Nuevo Diagnóstico
</template>
