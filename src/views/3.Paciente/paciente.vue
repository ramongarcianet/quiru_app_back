<script setup>
import { onMounted, onUnmounted, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, limpiar, leerEnRegistro } from "../../store/paciente";
import { isLetter, isNumber } from '../../config/libreria'
const maxDocumento = ref(8);
const guardarOActualizar = () => {
  var alerta = document.getElementById("alerta");
  alerta.style.display = "none"
  if (item.value.id) return actualizar(item.value);
  else return guardar(item.value);
};
const route = useRoute()
const { back, push } = useRouter()
let obtener
if (route.params.idPaciente) {
  leerEnRegistro(route.params.idPaciente)
} else {
  limpiar()
}
onUnmounted(() => {
  //limpiar()
  if (obtener) obtener();
})
onMounted(() => {
  incompleto();
})
function definirMaxLimit(tipoDocumento) {
  item.value.numeroDocumento = '';
  if (tipoDocumento == 'DNI') {
    maxDocumento.value = 8;
  } else {
    maxDocumento.value = 9;
  }
}
watch(
  () => item.value,
  () => {
    incompleto();
  }
);//Holaa
function incompleto() {
  var conErrores = '';
  conErrores = conErrores + ((item.value.numeroDocumento?.length < 8) ? ' Número documento incompleto,' : '');
  conErrores = conErrores + ((item.value.telefono?.length < 9) ? ' Telefono mínimo de 9 dígitos,' : '');
  var alerta = document.getElementById("alerta");
  if (alerta != null) {
    if (conErrores.length > 0) {
      alerta.innerHTML = "Te falta completar datos de: " + conErrores + "";
      alerta.style.display = "block"
      btguardar.disabled = true;
    }
    else {
      alerta.innerHTML = "";
      alerta.style.display = "none"
      btguardar.disabled = false;
    }
  }
  return conErrores;
}
</script>

<template lang="pug">
h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Nuevo
h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") paciente
button.btn.btn-outline-primary.border-0(@click="push({ name: 'pacientes', params: {} })" )
  ion-icon(name="return-down-back-outline" size="large")
Form( :onPromise='() => guardarOActualizar()' :onSuccess='() => back()' :onError='incompleto()')
  .row
    .col-md-6
      label.form-label Nombre del paciente*
      .input-group.mb-2
        input.form-control(placeholder="Nombre", v-model="item.nombre",@keypress="isLetter($event)" ,required,maxlength="30")
        input.form-control(placeholder="Apellido paterno", v-model="item.apellidoPaterno",@keypress="isLetter($event)" ,required,maxlength="30")
        input.form-control(placeholder="Apellido materno", v-model="item.apellidoMaterno",@keypress="isLetter($event)", required,maxlength="30")
      label.form-label Documento de identidad*
      .input-group.mb-2
        select.form-select(placeholder="Ubigeo", v-model="item.tipoDocumento",v-on:change="definirMaxLimit(item.tipoDocumento)")
          option(value="DNI") DNI
          option(value="CE") CARNET DE EXTRANJERIA
        input.form-control(placeholder="Número documento", v-model="item.numeroDocumento", @keypress="isNumber($event)",required,:maxlength="maxDocumento",:minlength="maxDocumento")
      .row.mb-2
        .col
          label.form-label Fecha de nacimiento*
          input.form-control(type="date", v-model="item.fechaNacimiento", max="3000-01-01" onfocus="this.max=new Date().toISOString().split('T')[0]")
        .col
          label.form-label Sexo*
          select.form-select(v-model="item.sexo",required)
            option(value="") SELECCIONE
            option(value="M") MASCULINO
            option(value="F") FEMENINO
    .col-md-6
      .col.mb-2
        label.form-label Dirección*
        .input-group
          input.form-control(placeholder="Departamento", v-model="item.departamento",@keypress="isLetter($event)" ,required,maxlength="30")
          input.form-control(placeholder="Dirección", v-model="item.Direccion",required,maxlength="40")
      .row
          .col.mb-2
            label.form-label Correo electrónico*
            input.form-control(placeholder="Correo Electrónico", v-model="item.email", type="email", required,maxlength="30")
          .col.mb-2
            label.form-label Celular*
            input.form-control(type="tel", placeholder="Teléfono", v-model="item.telefono",@keypress="isNumber($event)" ,required,minlength="9",maxlength="12")
      .row
        .col.mb-2
          label.form-label Constancia de informado*
          select.form-select(placeholder="Constancia informado", v-model="item.constancia")
            option(value="S") SI
            option(value="N") NO
        .col.mb-2
          label.form-label Comentario
          input.form-control(placeholder="Comentario", v-model="item.Comentario",@keypress="isLetter($event)",maxlength="40")
  .col-12.col-md-4.mx-auto.mt-3
    button#btguardar.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.align-items-center(
      type='submit', disabled style="border-radius: 50px"
    )
      span
        small
          strong Guardar
        p.mb-0 Nuevo Paciente
      i.fa-solid.fa-save.fa-lg.ms-5(style=" color: white;")
  .row.mt-2
    #alerta.alert.alert-danger.alert-dismissible(style='display:none')   
      strong Cuidado! te falta completar campos
</template>


