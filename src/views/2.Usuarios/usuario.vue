<script setup>
import { onUnmounted, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { item, guardar, actualizar, limpiar, leer, registro, leerEnRegistro } from '../../store/usuario'
import { esLetra, esNumero } from '../../config/libreria'
import { cerrarSesion, miUsuario } from '../../store/sesion'
const maxDocumento = ref(8);
const route = useRoute()
const { back } = useRouter()
const guardarOActualizar = () => {
  if (item.value.id) return actualizar(item.value)
  else return guardar(item.value)
}
onMounted(() => {
  leer(miUsuario().uid);
});
onUnmounted(() => {
  limpiar()
});
function definirMaxLimit(tipoDocumento) {
  item.value.numeroDocumento = '';
  if (tipoDocumento == 'DNI') {
    maxDocumento.value = 8;
  } else {
    maxDocumento.value = 9;
  }
}
watch(
    () => registro.value,
    () => {
        let valores= registro.value.find(item => item.idUsuario == miUsuario().uid)
        if(valores !=undefined) {
            leerEnRegistro(miUsuario().uid);
        }
    }
);
const adios = ()=> {
  location.replace('https://quiru.app/')
  }
const refresh = ()=> {
  location.reload()
}

const mayoriaEdad = () => {
  let currentDay = new Date().getTime()
  let minDay = currentDay - 568036800000
  let otroDia = new Date(minDay).toISOString().slice(0, 10)
  return otroDia
}
</script>

<template lang="pug">
.row.mb-3
  .col-10
    h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Vista de
    h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Configuración
    button.btn.btn-outline-primary.border-0(@click="refresh()" )
      i.fa-solid.fa-arrow-left-long.fa-xl
  .col-2
    //button.btn.btn-outline-primary.border-0.pb-md-0(title='Cerrar Sesion' @click="cerrarSesion(), adios()")
      i.fa-solid.fa-power-off( style="color: var(--color-primary); font-size: 35px" )

Form( :onPromise="() => guardarOActualizar()" :onSuccess='() => refresh()')
  .row
    .col-12
      label.form-label() Nombre(s) y Apellidos*
      .input-group
        input.form-control(placeholder="Nombre", v-model="item.nombre", required,maxlength="30")
        input.form-control(placeholder="Apellido Paterno", v-model="item.apellidoPaterno", required,maxlength="30")
        input.form-control(placeholder="Apellido Materno", v-model="item.apellidoMaterno" ,required,maxlength="30")
  .row
    .col-12.col-md-6
      label.form-label() Documento de identidad*
      .input-group
        select.form-select(placeholder="Tipo Documento" v-model="item.tipoDocumento" required,v-on:change="definirMaxLimit(item.tipoDocumento)")
          option(:value="undefined" disabled) SELECCIONE
          option(value="DNI") DNI
          option(value="CE") CARNET DE EXTRANJERÍA
        input.form-control(placeholder="Número Documento" v-model="item.numeroDocumento" ,required,:maxlength="maxDocumento",:minlength="maxDocumento")
    .col-12.col-md-6
      .row
        .col
          label.form-label() Fecha Nac.*
          .input-group
            input.form-control(type="date" :max="mayoriaEdad()" , v-model="item.fechaNacimiento", required)
        .col
          label.form-label() Sexo*
          .input-group
            select.form-select(placeholder="Sexo", v-model="item.sexo", required)
              option(:value="undefined" disabled) SELECCIONE
              option(value="M") MASCULINO
              option(value="F") FEMENINO 
  .row
    .col
      label.form-label() Email*
      .input-group
        input.form-control(placeholder="Correo Electrónico", v-model="item.email", type="email", required,maxlength="30")
    .col
      label.form-label() Teléfono*
      .input-group
      input.form-control(placeholder="Número Celular" v-model="item.numeroTlf" ,required,:maxlength="9",:minlength="9")
  .row
    .col-12.col-md-6
      label.form-label() Tipo de organización*
      .input-group
        select.form-select(placeholder="Tipo", v-model="item.tipoConsultorio", required)
              option(:value="undefined" disabled) SELECCIONAR 
              option(value="Clinica") CLÍNICA
              option(value="Hospital") HOSPITAL
              option(value="Independiente") CONSULTORIO INDEPENDIENTE
        input.form-control(placeholder="Nombre consultorio", v-model="item.nombreconsultorio" required,maxlength="30")
    .col-12.col-md-6
      label.form-label() Dirección
      .input-group
        input.form-control(placeholder="Ingrese dirección", v-model="item.direccion",maxlength="60")
  .row
    .col-12.col-md-4.mx-auto.mt-4
      button#btguardar.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.align-items-center( 
        type='submit', style="border-radius: 50px"
        )
        span
          small
          strong Guardar
          p.mb-0 Mis Datos
        i.fa-solid.fa-save.fa-lg.ms-5(style=" color: white;")
</template>

