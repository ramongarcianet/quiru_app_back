<script setup>
import { onMounted, onUnmounted, watch, ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import {cita, guardarCita, actualizar } from "../../store/citas";
import { obtenerTodos,item, guardar,obtenerTodosDni } from "../../store/paciente";
import { isLetter, isNumber } from '../../config/libreria'
const maxDocumento = ref(8);
const route = useRoute()
const {back, push} = useRouter()
const datos = ref({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono:'N'
})

const guardarOActualizar = () => {
  var alerta = document.getElementById("alerta");
  alerta.style.display = "none"
  if (cita.value.id) return actualizar(cita.value);
  else return guardarCita(cita.value)
};
const guardarPaciente = () => {
  var alerta = document.getElementById("alerta");
  alerta.style.display = "none"
  return guardar(item.value)
};
function fechaDeComponente (val){
    cita.value.fechaDeCita = val
}
function definirMaxLimit(tipoDocumento) {
  item.value.numeroDocumento = '';
  if (tipoDocumento == 'DNI') {
    maxDocumento.value = 8;
  } else {
    maxDocumento.value = 9;
  }
}
function buscarDni(numeroDocumento) {
  item.nombre= '';
  item.apellidoPaterno= '';
  item.apellidoMaterno= '';
  item.email= '';
  item.telefono= '';
  obtenerTodosDni()
}

onMounted(() => {
  incompletoPaciente();
  incompleto();
})

watch(
  () => cita.value,
  () => {
    incompletoPaciente();
    incompleto();
  }
);

function incompleto() {
  var conErrores = '';
  conErrores = conErrores + ((cita.value.celular?.length < 9) ? ' Telefono mínimo de 9 dígitos,' : '');
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
function incompletoPaciente() {
  var conErrores = '';
  conErrores = conErrores + ((item.value.numeroDocumento?.length < 8) ? ' Número documento incompleto,' : '');
  conErrores = conErrores + ((item.value.celular?.length < 9) ? ' Telefono mínimo de 9 dígitos,' : '');
   var alerta = document.getElementById("alerta");
  if (alerta != null) {
    if (conErrores.length > 0) {
      alerta.innerHTML = "Te falta completar datos de: " + conErrores + "";
      alerta.style.display = "block"
      btguardarPaciente.disabled = true;
    }
    else {
      alerta.innerHTML = "";
      alerta.style.display = "none"
      btguardarPaciente.disabled = false;
    }
  }
  return conErrores;
}



</script>

<template lang="pug">
.row
  .col-6.pb-2.col-md-9
    button.mb-3.btn(@click="push({name: 'citas'})")
      ion-icon(name="return-down-back-outline" style="color: var(--color-primary); font-size: 40px" )
    h1.my-0(style="color: #395D56; font-size: 1.8em; font-family: var(--font-family)") Creación
    h1(style="color: #37DFBB; font-weight:bold; font-size: 1.8em; font-family: var(--font-family)") de cita
Form(:onPromise='() => guardarPaciente()' :onSuccess='() => back()' :onError='incompletoPaciente()' )
  .row.mb-3
    .col-md-63
    label.form-label Documento de identidad*
      .input-group.mb-2
        select.form-select(placeholder="Ubigeo", v-model="item.tipoDocumento",v-on:change="definirMaxLimit(cita.tipoDocumento)")
          option(value="DNI") DNI
          option(value="CE") CARNET DE EXTRANJERIA
        input.form-control(placeholder="Número documento", v-model="item.numeroDocumento", @keypress="isNumber($event)",required,:maxlength="maxDocumento",:minlength="maxDocumento")
        button#btBuscarDni.w-50.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-1.mt-1.align-items-center(
         type='button',  style="border-radius: 10px"  ,@click="buscarDni(item.numeroDocumento)"
        )
          span
            small
              strong Buscar
            p.mb-0 Paciente
      label.form-label Nombre del paciente*
      .input-group.mb-2
        input.form-control(placeholder="Nombre",          v-model="item.nombre" required, maxlength="30", @keypress="isLetter($event)")
        input.form-control(placeholder="Apellido paterno",v-model="item.apellidoPaterno", required,maxlength="30", @keypress="isLetter($event)")
        input.form-control(placeholder="Apellido materno",v-model="item.apellidoMaterno", required,maxlength="30", @keypress="isLetter($event)")
      label.form-label Datos de contacto*
      .input-group.mb-2
        input.form-control(placeholder="Correo Electrónico",v-model="item.email", type="email", required,maxlength="30")
        input.form-control(type="tel", placeholder="Teléfono", v-model="item.telefono", required,minlength="9",maxlength="12", ,@keypress="isNumber($event)" )
    .col.mb-4.md-6.horario
  button#btguardarPaciente.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.mt-4.align-items-center(
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
      Form(:onPromise='() => guardarOActualizar()' :onSuccess='() => push({name: "citas"})' :onError='incompleto()' )
  .row.mb-3
    .col.mb-4.md-6.horario
      label.form-label Detalles de cita*
      .input-group
        input.form-control.mb-4(placeholder="Asunto de cita",required,v-model="cita.nombreDeCita", maxlength="30", @keypress="isLetter($event)")
        input#appt.hora.form-control.mb-4(type="time" name="appt-time" min="07:00" max="22:00" v-model="cita.horaDeCita", required pattern="[0-9]{2}:[0-9]{2}" )
        Calendario(mostrar="big", @fecha="fechaDeComponente" )

  button#btguardar.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.mt-4.align-items-center(
    type='submit', disabled style="border-radius: 50px" 
  )
    span
      small
        strong Guardar
      p.mb-0 Nueva Cita
    i.fa-solid.fa-save.fa-lg.ms-5(style=" color: white;")
  .row.mt-2
    #alerta.alert.alert-danger.alert-dismissible(style='display:none')   
      strong Cuidado! te falta completar campos

</template>
<style lang="sass" scoped>
.horario
  display: flex
  width: 100%
  flex-direction: column
  input[type="time"]
    background-color: var(--color-white)
    width: 40px !important
    height: 38px
    border-radius: 30px
    border: none
    padding-left: 30px
    padding-right: 30px
    font-size: 1rem
    color: var(--color-dark)
    text-align: center
    font-family: var(--font-family)
    justify-content: center
    align-items: center
    display: flex
    background-clip: padding-box
    border: 1px solid #ced4da
    appearance: none
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out
  input[type="time"]::-webkit-calendar-picker-indicator
    width: 16px
    height: 16px
    color: var(--color-primary)
</style>
