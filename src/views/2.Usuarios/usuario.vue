<script setup>
import {onUnmounted, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {item, guardar, actualizar,limpiar, leerEnRegistro}  from '../../store/usuario'
import {isLetter,isNumber} from '../../config/libreria'
const maxDocumento = ref(8);
const route = useRoute()
const {back} = useRouter()
const guardarOActualizar = () => {
    if (item.value.id) return actualizar(item.value)
    else return guardar( item.value)
}

if(route.params.idUsuario) leerEnRegistro(route.params.idUsuario)

onUnmounted(()=>{
    limpiar()
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


Form( :onPromise=" () => guardarOActualizar()" :onSuccess='()=>back()')
    label.form-label() Documento
    .input-group
        select.form-select(placeholder="Tipo Documento" v-model="item.tipoDocumento" required,v-on:change="definirMaxLimit(item.tipoDocumento)")
            option(value="DNI") DNI
            option(value="CE") CARNET DE EXTRANJERIA
        input.form-control(placeholder="Número Documento" v-model="item.numeroDocumento" ,v-on:keypress="isNumber($event)",required,:maxlength="maxDocumento",:minlength="maxDocumento")
    .input-group
        input.form-control(placeholder="Nombre", v-model="item.nombre",v-on:keypress="isLetter($event)", required,maxlength="30")
        input.form-control(placeholder="Apellido Paterno", v-model="item.apellidoPaterno",v-on:keypress="isLetter($event)" required,maxlength="30")
        input.form-control(placeholder="Apellido Materno", v-model="item.apellidoMaterno",v-on:keypress="isLetter($event)" ,required,maxlength="30")
    .row

        .col
            input.form-control(type="date", v-model="item.fechaNacimiento", required)
        .col
            select.form-select(placeholder="Sexo", v-model="item.sexo", required)
                option(value="") SELECCIONE
                option(value="M") MASCULINO
                option(value="F") FEMENINO

    .row
        .col
            input.form-control(placeholder="Correo Electrónico", v-model="item.email", type="email", required,maxlength="30")
    .row
        .col
            input.form-control(placeholder="Dirección", v-model="item.direccion", required,maxlength="60")
    .d-flex
        button.btn.btn-outline-primary(type="button", @click="back() ") Cancelar
        button.btn.btn-primary.ms-auto( type='submit' ) Guardar

</template>

